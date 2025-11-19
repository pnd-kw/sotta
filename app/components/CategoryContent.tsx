"use client";

import { getPublishedGalleryImagesByCategoryIds } from "@/app/api/gallery/getGalleryImagesByCategoryIds";
import { Button } from "@/components/ui/button";
import { useGalleryStore } from "@/store/galleryStore";
import Spinner from "@/utils/Spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Image {
  imageUrl: string;
  public_id: string;
  alt: string;
  mimeType: string;
  size: number;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

type GalleryImage = {
  id: string;
  name: string;
  published: boolean | number;
  thumbnailUrl: string;
  images: Image[];
  caption: string;
  tags: string[];
  categories: Category[];
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
};

export default function CategoryContent({ id }: { id: string }) {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<{
    current_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
    total: number;
  }>({
    current_page: 1,
    next_page_url: null,
    prev_page_url: null,
    last_page: 1,
    total: 0,
  });
  const [imagePerPage] = useState(8);
  const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(false);
  const { successApiResponse, setSuccessApiResponse } = useGalleryStore();

  const fetchGalleryByCategoryIds = async (
    published = true,
    category_ids: number[] = [],
    page = 1,
    per_page = imagePerPage
  ) => {
    try {
      setIsLoadingGallery(true);
      const data = await getPublishedGalleryImagesByCategoryIds({
        published,
        category_ids,
        page,
        per_page,
      });

      setGalleryImages(data.data);
      setPaginationInfo({
        current_page: data.current_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        last_page: data.last_page,
        total: data.total,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch gallery images by category ids", error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGalleryByCategoryIds(true, [Number(id)], 1, imagePerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, imagePerPage]);

  useEffect(() => {
    if (successApiResponse) {
      fetchGalleryByCategoryIds(true, [Number(id)], 1, imagePerPage);
      setSuccessApiResponse(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successApiResponse, id, imagePerPage]);

  const handleLoadMore = () => {
    const nextPage = paginationInfo.current_page + 1;
    if (nextPage <= paginationInfo.last_page) {
      fetchGalleryByCategoryIds(true, [Number(id)], nextPage, imagePerPage);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center p-4 bg-white overflow-auto">
      {isLoadingGallery ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col w-full h-full p-4">
            <div className="flex items-center justify-start min-h-[5vh]">
              <h1 className="text-xl font-bold">
                {
                  galleryImages[0]?.categories?.find((e) => e.id === Number(id))
                    ?.name
                }
              </h1>
            </div>
            <hr className="border border-t border-stone-300 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 w-full min-h-[40vh] gap-0">
              {galleryImages?.map((item) => (
                <div key={item.id} className="flex w-full h-full">
                  <div className="flex flex-col w-full h-full border border-stone-200">
                    <div className="relative w-full h-full">
                      <Button
                        type="button"
                        variant="transparent"
                        onClick={() => router.push(`/gallery/${item.id}`)}
                        className="relative w-full h-full cursor-pointer"
                      >
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.images[0].alt}
                          fill
                          className="object-cover w-full h-full mb-1"
                        />
                      </Button>
                    </div>
                    <div className="px-1 pt-1">
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {paginationInfo.current_page < paginationInfo.last_page && (
              <div className="flex items-center w-full justify-center text-center">
                <span className="py-4">
                  <Button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingGallery}
                  >
                    {isLoadingGallery ? "Loading" : "More"}
                  </Button>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
