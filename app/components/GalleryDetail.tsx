"use client";

import Image from "next/image";
import { format } from "date-fns";

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

type Props = {
  data: GalleryImage;
};

export default function GalleryDetail({ data }: Props) {
  return (
    <div className="max-w-[80vw] mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 capitalize font-mono">
        {data.name}
      </h1>

      <div className="flex gap-2">
        <div className="relative w-full h-125 mb-4">
          <Image
            src={data.imageUrl}
            alt={data.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain rounded"
            priority
          />
        </div>

        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">{data.caption}</p>

          <div className="text-sm text-gray-500 mb-4">
            <p>
              <strong>Ukuran:</strong> {(data.size / 1024).toFixed(2)} KB
            </p>
            <p>
              <strong>Tipe:</strong> {data.mimeType}
            </p>
            <p>
              <strong>Dibuat:</strong>{" "}
              {format(new Date(data.created_at), "dd MMMM yyyy")}
            </p>
            <p>
              <strong>Diperbarui:</strong>{" "}
              {format(new Date(data.updated_at), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="mt-4">
            <strong>Tag:</strong>{" "}
            {data.tags.map((tag) => (
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
  );
}
