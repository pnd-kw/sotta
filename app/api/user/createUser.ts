import axiosInstance from "../axiosInstance";

interface UserData {
  name: string;
  email: string;
  gender: string;
  avatar: File;
  phone_number: string;
  role_id: number;
  password: string;
  password_confirmation: string;
}

export const createUser = async (userData: UserData) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("gender", userData.gender);
  formData.append("avatar", userData.avatar);
  formData.append("phone_number", userData.phone_number);
  formData.append("role_id", userData.role_id.toString());
  formData.append("password", userData.password);
  formData.append("password_confirmation", userData.password_confirmation);

  try {
    const response = await axiosInstance.post("/api/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "User register failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
