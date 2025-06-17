import axiosInstance from "../axiosInstance";

interface CloudinaryUsageResponse {
  plan: string;
  last_updated: string;
  date_requested: string;
  storage: {
    usage: number;
    credits_usage: number;
  };
  credits: {
    usage: number;
    limit: number;
    used_percent: number;
  }
  objects: {
    usage: number;
  };
  bandwith?: {
    usage: number;
  };
  transformation?: {
    usage: number;
    credits_usage: number;
    breakdown: Record<string, number>;
  };
  requests: number;
  resources: number;
}

export const getCloudinaryUsage =
  async (): Promise<CloudinaryUsageResponse> => {
    try {
      const response = await axiosInstance.get<CloudinaryUsageResponse>(
        "/api/cloudinary/usage"
      );

      console.log(response.data);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Get cloudinary usage failed";
        throw new Error(errorMessage);
      } else {
        throw new Error("Network error");
      }
    }
  };
