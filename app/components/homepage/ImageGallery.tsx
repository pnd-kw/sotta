import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getPublishedGalleryImages } from "@/app/api/gallery/getGalleryImages";
import { useGalleryStore } from "@/store/galleryStore";
import Spinner from "@/utils/Spinner";

type GalleryImage = {
  id: string;
  name: string;
  published: boolean;
  imageUrl: string;
  public_id: string;
  alt: string;
  caption: string;
  tags: string[];
  mimeType: string;
  size: number;
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
};

export default function ImageGallery() {
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

  console.log("gallery", galleryImages);

  const fetchGallery = async (
    published = true,
    page = 1,
    per_page = imagePerPage,
    search = ""
  ) => {
    try {
      setIsLoadingGallery(true);
      const data = await getPublishedGalleryImages({
        published,
        page,
        per_page,
        search,
      });
      console.log("res", data);
      const mappedData = data.data.map(
        (item): GalleryImage => ({
          ...item,
          published: Boolean(item.published),
        })
      );
      setGalleryImages((prev) =>
        page === 1 ? mappedData : [...prev, ...mappedData]
      );
      setPaginationInfo({
        current_page: data.current_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        last_page: data.last_page,
        total: data.total,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch gallery images", error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery(true, 1, imagePerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePerPage]);

  useEffect(() => {
    if (successApiResponse) {
      fetchGallery(true, 1, imagePerPage);
      setSuccessApiResponse(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successApiResponse]);

  const handleLoadMore = () => {
    const nextPage = paginationInfo.current_page + 1;
    if (nextPage <= paginationInfo.last_page) {
      fetchGallery(true, nextPage, imagePerPage);
    }
  };

  return (
    <div className="w-full bg-[#85582c]">
      <section id="gallery" className="text-center py-10">
        <div className="md:max-w-[80vw] mx-auto">
          <h3 className="text-xl md:text-2xl text-[#85582c] font-semibold py-4 bg-white rounded-full w-28 md:w-32 mx-auto mb-6">
            Gallery
          </h3>
          {isLoadingGallery ? (
            <Spinner borderColor="bg-white" />
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-auto">
              {galleryImages.map((item) => (
                <Link key={item.id} href={`/gallery/${item.id}`}>
                  <div className="group relative aspect-square border border-white overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                      <h3 className="h-full flex items-center justify-center text-xl font-bold text-white capitalize text-center px-2">
                        {item.name.toLowerCase()}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {paginationInfo.current_page < paginationInfo.last_page && (
            <div className="w-full flex items-center justify-center text-center">
              <span className="py-4">
                <Button onClick={handleLoadMore} disabled={isLoadingGallery}>
                  {isLoadingGallery ? "Loading" : "More"}
                </Button>
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
