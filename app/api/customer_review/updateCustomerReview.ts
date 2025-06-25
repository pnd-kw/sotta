import axiosInstance from "../axiosInstance";

interface CustomerReviewUpdate {
  name: string;
  message: string;
  instansi?: string;
  gender: string;
  token: string;
  avatar?: File;
}

export const updateCustomerReview = async (
  customerReviewUpdate: CustomerReviewUpdate,
  { params }: { params: { id: string } }
) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("name", customerReviewUpdate.name);
  formData.append("message", customerReviewUpdate.message);
  formData.append("gender", customerReviewUpdate.gender);
  formData.append("token", customerReviewUpdate.token);

  if (customerReviewUpdate.instansi) {
    formData.append("instansi", customerReviewUpdate.instansi);
  }

  if (customerReviewUpdate.avatar) {
    formData.append("avatar", customerReviewUpdate.avatar);
  }

  try {
    const response = await axiosInstance.post(
      `/api/customer-reviews/${params.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
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
