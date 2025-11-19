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

interface PublishedGalleryItem {
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

interface PublishedGalleryByCategoryIdsResponse {
  current_page: number;
  data: PublishedGalleryItem[];
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

export const getPublishedGalleryImagesByCategoryIds = async ({
  page = 1,
  per_page = 8,
//   search = "",
  published = true,
  category_ids = [],
}: {
  page?: number;
  per_page?: number;
  search?: string;
  published?: boolean | number;
  category_ids?: number[];
}): Promise<PublishedGalleryByCategoryIdsResponse> => {
  try {
    const response = await axios.get<PublishedGalleryByCategoryIdsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`,
      {
        params: {
          page,
          per_page,
        //   search,
          published,
          category_ids: category_ids.join(","),
        },
      }
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        "Get gallery image by category ids failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
