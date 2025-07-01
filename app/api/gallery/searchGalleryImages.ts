import axiosInstance from "../axiosInstance";

interface ImageObject {
  imageUrl: string;
  public_id: string;
  alt: string;
  mimeType: string;
  size: number;
}

interface GalleryImage {
  id: string;
  name: string;
  published: boolean | number;
  thumbnailUrl: string;
  caption: string;
  tags: string[];
  images: ImageObject[];
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
}

interface SearchGalleryImagesResponse {
  current_page: number;
  data: GalleryImage[];
  total: number;
  per_page: number;
  last_page: number;
}

interface SearchParams {
  search?: string;
  per_page?: number;
  page?: number;
}

export const searchGalleryImages = async ({
  params,
}: {
  params: SearchParams;
}): Promise<SearchGalleryImagesResponse> => {
  try {
    const response = await axiosInstance.get<SearchGalleryImagesResponse>(
      "/api/gallery",
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Search gallery images failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
