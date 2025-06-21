import axiosInstance from "../axiosInstance";

interface CustomerReviewResponse {
  id: string;
  name: string;
  message: string;
  instansi: string;
  gender: string;
  avatar?: string;
  created_at: string;
  can_edit: boolean;
  can_delete: boolean;
}

interface PaginatedCustomerReviewResponse {
  current_page: number;
  data: CustomerReviewResponse[];
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

export const getCustomerReviews = async ({
  page = 1,
  per_page = 10,
  search = "",
}: {
  page?: number;
  per_page?: number;
  search?: string;
} = {}): Promise<PaginatedCustomerReviewResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedCustomerReviewResponse>(
      "/api/customer-reviews",
      {
        params: {
          page,
          per_page,
          search,
        },
      }
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get customer reviews failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
