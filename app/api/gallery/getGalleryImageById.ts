import axios from "axios";

interface GalleryImage {
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

interface GalleryByIdResponse {
  id: string;
  name: string;
  published: boolean | number;
  thumbnailUrl: string;
  images: GalleryImage[];
  caption: string;
  tags: string[];
  categories: Category[];
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
}

export const getGalleryImagesById = async (params: {
  id: string;
}): Promise<GalleryByIdResponse> => {
  try {
    const response = await axios.get<GalleryByIdResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${params.id}`
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get gallery image by id failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
