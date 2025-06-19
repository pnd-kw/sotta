import axiosInstance from "../axiosInstance";

interface UserData {
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

interface SearchUserDataResponse {
  current_page: number;
  data: UserData[];
  total: number;
  per_page: number;
  last_page: number;
}

interface SearchParams {
  search?: string;
  per_page?: number;
  page?: number;
}

export const searchUserData = async ({
  params,
}: {
  params: SearchParams;
}): Promise<SearchUserDataResponse> => {
  try {
    const response = await axiosInstance.get<SearchUserDataResponse>(
      "/api/users",
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
