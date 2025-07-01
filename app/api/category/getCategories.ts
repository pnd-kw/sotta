import axiosInstance from "../axiosInstance";

interface Category {
  id: number;
  name: string;
  parent_id?: number | null;
  children?: Category[];
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>("/api/categories");
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get categories";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error");
    }
  }
};
