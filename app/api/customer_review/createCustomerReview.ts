import axiosInstance from "../axiosInstance";

interface CustomerReviewData {
  name: string;
  message: string;
  instansi?: string;
  gender: string;
  token: string;
  avatar?: File;
}

export const createCustomerReview = async (
  customerReviewData: CustomerReviewData
) => {
  const formData = new FormData();
  formData.append("name", customerReviewData.name);
  formData.append("message", customerReviewData.message);
  formData.append("gender", customerReviewData.gender);
  formData.append("token", customerReviewData.token);

  if (customerReviewData.instansi) {
    formData.append("instansi", customerReviewData.instansi);
  }

  if (customerReviewData.avatar) {
    formData.append("avatar", customerReviewData.avatar);
  }

  try {
    const response = await axiosInstance.post(
      "/api/customer-reviews",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Create customer review failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
