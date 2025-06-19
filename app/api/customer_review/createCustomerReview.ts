import axiosInstance from "../axiosInstance";

interface CustomerReviewPayload {
  name: string;
  message: string;
  instansi?: string;
  gender: string;
  token: string;
  avatar?: File;
}

export const createCustomerReview = async (
  customerReviewPayload: CustomerReviewPayload
) => {
  const formData = new FormData();
  formData.append("name", customerReviewPayload.name);
  formData.append("message", customerReviewPayload.message);
  formData.append("gender", customerReviewPayload.gender);
  formData.append("token", customerReviewPayload.token);

  if (customerReviewPayload.instansi) {
    formData.append("instansi", customerReviewPayload.instansi);
  }

  if (customerReviewPayload.avatar) {
    formData.append("avatar", customerReviewPayload.avatar);
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
