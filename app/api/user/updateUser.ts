import axiosInstance from "../axiosInstance";

interface UserDataUpdate {
  name: string;
  email: string;
  gender: string;
  avatar: File | null;
  phone_number: string;
  role_id: number;
  password: string;
  password_confirmation: string;
}

export const updateUser = async (
  userDataUpdate: UserDataUpdate,
  { params }: { params: { id: string }}
) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("name", userDataUpdate.name);
  formData.append("email", userDataUpdate.email);
  formData.append("gender", userDataUpdate.gender);
  formData.append("phone_number", userDataUpdate.phone_number);
  formData.append("role_id", userDataUpdate.role_id.toString());
  formData.append("password", userDataUpdate.password);
  formData.append("pass_confirm", userDataUpdate.password_confirmation);

  if (userDataUpdate.avatar) {
    formData.append("avatar", userDataUpdate.avatar);
  }

  try {
    const response = await axiosInstance.post(
      `/api/user/${params.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Update image gallery failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
