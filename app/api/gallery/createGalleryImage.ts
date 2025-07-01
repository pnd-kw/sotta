import axiosInstance from "../axiosInstance";

interface ImageData {
  name: string;
  published: boolean | number;
  alt: string;
  caption: string;
  tags: string[];
  categories: string[];
  images: File[];
  createdBy: string;
  updatedBy: string;
}

export const createGalleryImage = async (imageData: ImageData) => {
  const formData = new FormData();
  formData.append("name", imageData.name);
  formData.append("published", imageData.published ? "1" : "0");
  formData.append("caption", imageData.caption);
  formData.append("createdBy", imageData.createdBy);
  formData.append("updatedBy", imageData.updatedBy);

  imageData.tags.forEach((tag) => {
    formData.append("tags[]", tag);
  });

  imageData.categories.forEach((id) => formData.append("categories[]", id));

  imageData.images.forEach((file) => {
    formData.append("images[]", file);
  });

  try {
    const response = await axiosInstance.post("/api/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Create image gallery failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
