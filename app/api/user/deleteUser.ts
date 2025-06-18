import axiosInstance from "../axiosInstance"

export const deleteUser = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/api/user/${id}`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Delete user failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
}