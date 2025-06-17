import axiosInstance from "../axiosInstance";

export const deleteGalleryImage = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/gallery/${id}`);
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
