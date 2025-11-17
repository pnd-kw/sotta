import axios from "axios";
import axiosInstance from "../axiosInstance";

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

interface GalleryResponse {
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

interface GalleryQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category_ids?: number[] | string[];
  published?: boolean;
}

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const getGalleryImages = async ({
  page = 1,
  per_page = 8,
  search = "",
  category_ids,
  published,
}: GalleryQueryParams = {}): Promise<PaginatedGalleryResponse> => {
  try {
    const params: Record<string, string | number | boolean> = {
      page,
      per_page,
    };

    if (search.trim() !== "") {
      params.search = search;
    }

    if (category_ids && category_ids.length > 0) {
      params.category_ids = category_ids.join(",");
    }

    if (published !== undefined) {
      params.published = published ? "true" : "false";
    }

    const response = await axiosInstance.get<PaginatedGalleryResponse>(
      "/api/gallery",
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosErrorResponse;
    const msg = err.response?.data?.message ?? "Get gallery images failed";
    throw new Error(msg);
  }
};

export const getPublishedGalleryImages = async ({
  page = 1,
  per_page = 8,
  search = "",
  published = true,
}: GalleryQueryParams = {}): Promise<PaginatedGalleryResponse> => {
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
  } catch (error) {
    const err = error as AxiosErrorResponse;
    const msg = err.response?.data?.message ?? "Get gallery images failed";
    throw new Error(msg);
  }
};

export const getGalleryByUrl = async (
  url: string
): Promise<PaginatedGalleryResponse> => {
  try {
    const response = await axios.get<PaginatedGalleryResponse>(url);

    return response.data;
  } catch (error) {
    const err = error as AxiosErrorResponse;
    const msg = err.response?.data?.message ?? "Get gallery next page failed";
    throw new Error(msg);
  }
};
