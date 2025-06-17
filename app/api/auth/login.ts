import axiosInstance from "../axiosInstance";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  id_user: string;
  name: string;
  email: string;
  role_id: number;
  role_name: string;
  gender: string;
  avatar: string | null;
  phone_number: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
  message?: string;
}

export const loginUser = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/login",
      credentials
    );

    sessionStorage.setItem("token", response.data.access_token);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Login failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
