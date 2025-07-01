import axiosInstance from "../axiosInstance";

interface ExistingImage {
  imageUrl: string;
  public_id: string;
  alt: string;
  mimeType: string;
  size: number;
}

interface ImageDataUpdate {
  name: string;
  published: boolean | number;
  caption: string;
  tags: string[];
  categories?: string[];
  updatedBy: string;
  newImages: File[];
  existingImages: ExistingImage[];
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
  formData.append("caption", imageDataUpdate.caption);
  formData.append("updatedBy", imageDataUpdate.updatedBy);

  imageDataUpdate.tags.forEach((tag) => {
    formData.append("tags[]", tag);
  });

  imageDataUpdate.categories?.forEach((id) => {
    formData.append("categories[]", id);
  });

  formData.append("images_data", JSON.stringify(imageDataUpdate.existingImages));

  imageDataUpdate.newImages.forEach((file) => {
    formData.append("images[]", file);
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
