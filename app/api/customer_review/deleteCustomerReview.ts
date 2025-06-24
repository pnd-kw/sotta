import axiosInstance from "../axiosInstance";

export const deleteCustomerReview = async (id: string, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/customer-reviews/${id}`, {
        data: { token },
    });
    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Delete gallery image failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
