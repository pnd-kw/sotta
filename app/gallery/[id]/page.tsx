import { getGalleryImagesById } from "@/app/api/gallery/getGalleryImageById";
import GalleryDetail from "@/app/components/GalleryDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata | null> {
  try {
    const image = await getGalleryImagesById({ id: params.id });

    if (!image || !image.published) return null;

    return {
      title: image.name,
      description: image.caption,
      openGraph: {
        title: image.name,
        description: image.caption,
        images: [
          {
            url: image.imageUrl,
            width: 800,
            height: 600,
            alt: image.alt,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: image.name,
        description: image.caption,
        images: [image.imageUrl],
      },
    };
  } catch (error) {
    console.error("Failed to get metadata", error);
    return null;
  }
}

export default async function GalleryDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { preview?: string };
}) {
  const allowPreview = searchParams?.preview?.toLowerCase() === "true";

  try {
    const image = await getGalleryImagesById({ id: params.id });

    if (!image || (!image.published && !allowPreview)) {
      return notFound();
    }

    const transformPublishedType = {
      ...image,
      published: Boolean(image.published),
    };

    return <GalleryDetail data={transformPublishedType} />;
  } catch (error) {
    console.error("Failed to fetch gallery image", error);
    return notFound();
  }
}
