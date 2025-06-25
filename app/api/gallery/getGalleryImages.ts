import axios from "axios";
import axiosInstance from "../axiosInstance";

interface GalleryResponse {
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

interface PaginatedGalleryResponse {
  current_page: number;
  data: GalleryResponse[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export const getGalleryImages = async ({
  page = 1,
  per_page = 8,
  search = "",
  published = true,
}: {
  page?: number;
  per_page?: number;
  search?: string;
  published?: boolean;
} = {}): Promise<PaginatedGalleryResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedGalleryResponse>(
      "/api/gallery",
      {
        params: {
          page,
          per_page,
          search,
          published,
        },
      }
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get gallery images failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};

export const getGalleryByUrl = async (
  url: string
): Promise<PaginatedGalleryResponse> => {
  try {
    const response = await axios.get<PaginatedGalleryResponse>(url);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get gallery next page failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
