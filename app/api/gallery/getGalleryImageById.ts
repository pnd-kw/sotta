import axios from "axios";

interface GalleryByIdResponse {
  id: string;
  name: string;
  published: boolean | number;
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
