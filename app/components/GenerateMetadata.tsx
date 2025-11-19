import { Metadata } from "next";
import { getGalleryImagesById } from "../api/gallery/getGalleryImageById";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const image = await getGalleryImagesById({ id: params.id });

        if (!image) {
            return {
                title: "Product Image",
                description: "Detail gambar tidak ditemukan",
            };
        }
        
        const mainImage = image?.images?.[0]?.imageUrl ?? "";

        return {
            title: image.name ?? "Product Image",
            description: image.caption ?? "Detail gambar produk",
            keywords: image.tags ?? [],
            openGraph: {
                title: image.name,
                description: image.caption,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                images: image.images?.map((img: any) => ({
                    url: img.imageUrl,
                    alt: img.alt,
                })),
            },
            twitter: {
                card: "summary_large_image",
                title: image.name,
                description: image.caption,
                images: [mainImage],
            },
            other: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                categories: image.categories?.map((cat: any) => cat.name)?.join(", ") ?? "",
            },
        };
    } catch (error) {
        console.error("Metadata error: ", error);
        return {
            title: "Product Image",
            description: "Tidak dapat memuat metadata",
        };
    }
}