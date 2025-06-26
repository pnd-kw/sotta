import axiosInstance from "../axiosInstance";

interface ImageDataUpdate {
  name: string;
  published: boolean | number;
  alt: string;
  caption: string;
  tags: string[];
  image: File | null;
  updatedBy: string;
}

interface ImagePublishDataUpdate {
  published: boolean | number;
  updatedBy: string | undefined;
}

export const updateGalleryImage = async (
  imageDataUpdate: ImageDataUpdate,
  { params }: { params: { id: string } }
) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("name", imageDataUpdate.name);
  formData.append("published", imageDataUpdate.published ? "1" : "0");
  formData.append("alt", imageDataUpdate.alt);
  formData.append("caption", imageDataUpdate.caption);
  formData.append("updatedBy", imageDataUpdate.updatedBy);

  if (imageDataUpdate.image) {
    formData.append("image", imageDataUpdate.image);
  }

    imageDataUpdate.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

  try {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await axiosInstance.post(
      `/api/gallery/${params.id}`,
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

export const updatePublishGalleryImage = async (
  imagePublishDataUpdate: ImagePublishDataUpdate,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/gallery/${params.id}/published`,
      {
        published: imagePublishDataUpdate.published,
        updatedBy: imagePublishDataUpdate.updatedBy,
      }
    );

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response?.data?.message || "Failed to update publish status";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
