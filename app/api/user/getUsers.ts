import axios from "axios";
import axiosInstance from "../axiosInstance";

interface UserResponse {
  id_user: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
  cloudinary_public_id: string;
  phone_number: string;
  password: string;
  role: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

interface PaginatedUserResponse {
  current_page: number;
  data: UserResponse[];
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

export const getUsers = async ({
  page = 1,
  per_page = 8,
  search = "",
}: {
  page?: number;
  per_page?: number;
  search?: string;
} = {}): Promise<PaginatedUserResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedUserResponse>(
      "/api/users",
      {
        params: {
          page,
          per_page,
          search,
        },
      }
    );

    console.log("res", response);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get users failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};

export const getUserByUrl = async (
  url: string
): Promise<PaginatedUserResponse> => {
  try {
    const response = await axios.get<PaginatedUserResponse>(url);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get user next page failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
