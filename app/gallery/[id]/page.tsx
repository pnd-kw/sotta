// import { getGalleryImagesById } from "@/app/api/gallery/getGalleryImageById";
// import GalleryDetail from "@/app/components/GalleryDetail";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";

// type Props = {
//   params: { id: string };
//   searchParams?: { preview?: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata | null> {
//   try {
//     const image = await getGalleryImagesById({ id: params.id });

//     if (!image || !image.published) return null;

//     return {
//       title: image.name,
//       description: image.caption,
//       openGraph: {
//         title: image.name,
//         description: image.caption,
//         images: [
//           {
//             url: `${image.imageUrl}`,
//             width: 800,
//             height: 600,
//             alt: image.alt,
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: image.name,
//         description: image.caption,
//         images: [`${image.imageUrl}`],
//       },
//     };
//   } catch (error) {
//     console.log("Failed to get metadata", error);
//     return {};
//   }
// }

// export default async function GalleryDetailPage({ params, searchParams }: Props) {
//   const allowPreview = searchParams?.preview?.toLowerCase() === "true";

//   try {
//     const image = await getGalleryImagesById({ id: params.id });

    

//     if (!image || (!image.published && !allowPreview)) return notFound();

//     const transformPublishedType = {
//       ...image,
//       published: Boolean(image.published),
//     };

//     return <GalleryDetail data={transformPublishedType} />;
//   } catch (error) {
//     console.error("Failed to fetch gallery image", error);
//     return notFound();
//   }
// }

import { getGalleryImagesById } from "@/app/api/gallery/getGalleryImageById";
import GalleryDetail from "@/app/components/GalleryDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ✅ Next.js expects this signature for metadata functions
export async function generateMetadata(
  props: { params: { id: string } }
): Promise<Metadata | null> {
  try {
    const image = await getGalleryImagesById({ id: props.params.id });

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
    console.error("generateMetadata error", error);
    return null;
  }
}

// ✅ Default page component for dynamic route
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

    return <GalleryDetail data={{ ...image, published: Boolean(image.published) }} />;
  } catch (error) {
    console.error("GalleryDetailPage error", error);
    return notFound();
  }
}
