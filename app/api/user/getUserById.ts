import axiosInstance from "../axiosInstance";

interface UserByIdResponse {
  id_user: string;
  name: string;
  email: string;
  gender: string;
  avatar: string;
  cloudinary_public_id: string;
  phone_number: string;
  password: string;
  role: {
    key: number;
    value: string;
  };
}

export const getUserById = async (params: {
  id: string;
}): Promise<UserByIdResponse> => {
  try {
    const response = await axiosInstance.get<UserByIdResponse>(
      `/api/user/${params.id}`
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Get user by id failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
