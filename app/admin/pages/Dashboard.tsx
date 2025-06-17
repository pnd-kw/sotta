import { getCloudinaryUsage } from "@/app/api/cloudinary/getCloudinaryUsage";
import Spinner from "@/utils/Spinner";
import { useEffect, useState } from "react";

interface CloudinaryCredits {
  usage: number;
  limit: number;
  used_percent: number;
}

interface CloudinaryStorage {
  usage: number;
  credits_usage: number;
}

interface CloudinaryUsage {
  plan: string;
  credits: CloudinaryCredits;
  storage: CloudinaryStorage;
}

export default function Dashboard() {
  const [isLoadingCloudinaryInfo, setIsLoadingCloudinaryInfo] = useState(false);
  const [cloudinaryInfo, setCloudinaryInfo] = useState<CloudinaryUsage | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingCloudinaryInfo(true);
        const response = await getCloudinaryUsage();
        setCloudinaryInfo(response as CloudinaryUsage);
      } catch (error) {
        console.error("Failed to get cloudinary usage", error);
      } finally {
        setIsLoadingCloudinaryInfo(false);
      }
    };

    fetchData();
  }, []);

  const renderProgress = (
    label: string,
    value: number,
    max: number,
    unit = ""
  ) => {
    const percentage = (value / max) * 100;
    return (
      <div className="mb-4">
        <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {value.toFixed(2)}
          {unit} / {max.toFixed(2)}
          {unit} ({percentage.toFixed(1)}%)
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full py-6 text-3xl font-bold">
      Dashboard
      <div className="md:max-w-[80vw] h-full mx-auto px-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 p-4 justify-center">
          {isLoadingCloudinaryInfo ? (
            <div className="flex shadow-md rounded-md">
              <Spinner />
            </div>
          ) : cloudinaryInfo ? (
            <div className="flex flex-col items-center justify-center text-center shadow-md rounded-md p-2">
              <div className="w-full flex items-center justify-center">
                <p className="text-lg font-semibold">Cloudinary Plan:</p>
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="text-4xl font-bold">
                  {cloudinaryInfo.credits.limit} GB
                </p>
              </div>
            </div>
          ) : (
            <div className="text-gray-600">Tidak ada data Cloudinary</div>
          )}
          {isLoadingCloudinaryInfo ? (
            <div className="flex shadow-md rounded-md">
              <Spinner />
            </div>
          ) : cloudinaryInfo ? (
            <div className="flex flex-col gap-6">
              {renderProgress(
                "Storage Used",
                cloudinaryInfo.storage.usage / (1024 * 1024), // bytes to MB
                2500, // Example: free plan has 2.5 GB (2500 MB)
                " MB"
              )}

              {renderProgress(
                "Credits Used",
                cloudinaryInfo.credits.usage,
                cloudinaryInfo.credits.limit,
                ""
              )}

              {renderProgress(
                "Credits Usage (%)",
                cloudinaryInfo.credits.used_percent * 100,
                100,
                "%"
              )}
            </div>
          ) : (
            <div className="text-gray-600">Tidak ada data Cloudinary</div>
          )}
        </div>
        <div className="flex justify-center">Analytic</div>
        <div className="w-full h-[50vh]"></div>
      </div>
    </div>
  );
}
