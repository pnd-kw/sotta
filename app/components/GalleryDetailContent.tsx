"use client";

import { useEffect, useState } from "react";
import { getGalleryImagesById } from "../api/gallery/getGalleryImageById";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "@/utils/Spinner";

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

export default function GalleryDetailContent({ id }: { id: string }) {
  const [dataGalleryDetail, setDataGalleryDetail] = useState<GalleryImage>({
    id: "",
    name: "",
    published: false,
    thumbnailUrl: "",
    images: [],
    caption: "",
    tags: [],
    categories: [],
    createdBy: "",
    updatedBy: "",
    created_at: "",
    updated_at: "",
  });
  const [mainImage, setMainImage] = useState<Image | null>(null);
  const [isLoadingGalleryDetail, setIsLoadingGalleryDetail] = useState(false);

  const fetchGalleryDetail = async (id = "") => {
    try {
      setIsLoadingGalleryDetail(true);
      const data = await getGalleryImagesById({
        id,
      });

      setDataGalleryDetail(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch product detail", error.message);
    } finally {
      setIsLoadingGalleryDetail(false);
    }
  };

  useEffect(() => {
    fetchGalleryDetail(id);
  }, [id]);

  useEffect(() => {
    if (dataGalleryDetail.images.length > 0) {
      setMainImage(dataGalleryDetail.images[0]);
    }
  }, [dataGalleryDetail]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      {isLoadingGalleryDetail ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full mx-auto p-4 grid grid-cols-1 md:grid-cols-[8fr_2fr] gap-6">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold mb-4 capitalize font-mono">
                {dataGalleryDetail.name}
              </h1>

              <div className="relative w-full md:w-[80%] h-[40vh] md:h-[60vh] rounded-lg flex items-center justify-center overflow-hidden">
                {mainImage && dataGalleryDetail.images.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      const currentIndex = dataGalleryDetail.images.findIndex(
                        (x) => x.imageUrl === mainImage?.imageUrl
                      );
                      const prevIndex =
                        currentIndex === 0
                          ? dataGalleryDetail.images.length - 1
                          : currentIndex - 1;
                      setMainImage(dataGalleryDetail.images[prevIndex]);
                    }}
                    className="w-9 left-3 p-2 rounded-full hover:bg-stone-800"
                  >
                    <ChevronLeft size={28} />
                  </Button>
                )}

                <div className="relative w-full h-full">
                  {mainImage && (
                    <Image
                      src={mainImage?.imageUrl ?? ""}
                      alt={mainImage?.alt ?? "image"}
                      fill
                      className="object-contain rounded"
                    />
                  )}
                </div>

                {dataGalleryDetail.images.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      const currentIndex = dataGalleryDetail.images.findIndex(
                        (x) => x.imageUrl === mainImage?.imageUrl
                      );
                      const nextIndex =
                        currentIndex === dataGalleryDetail.images.length - 1
                          ? 0
                          : currentIndex + 1;

                      setMainImage(dataGalleryDetail.images[nextIndex]);
                    }}
                    className="w-9 right-3 p-2 rounded-full hover:bg-stone-500"
                  >
                    <ChevronRight size={28} />
                  </Button>
                )}
              </div>

              <div className="flex justify-center items-center gap-3 mt-4">
                {dataGalleryDetail.images.map((img, index) => (
                  <Button
                    type="button"
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative bg-transparent hover:bg-transparent overflow-hidden transition-all duration-300 ${
                      mainImage?.imageUrl === img.imageUrl
                        ? "w-24 h-16"
                        : "w-16 h-12"
                    }`}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="text-gray-700 mb-2">
                  {dataGalleryDetail.caption}
                </p>

                <div className="mt-4">
                  <strong className="text-sm">Kategori Produk:</strong>
                  <br />
                  {dataGalleryDetail?.categories?.map((category) => (
                    <span
                      key={category.id}
                      className="inline-block text-white text-xs px-2 py-1 mr-2 rounded-md bg-[#996515]"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <strong className="text-sm">Tag:</strong>{" "}
                  {dataGalleryDetail?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
