import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ToastContentProps {
  t: { id: string | number };
  title: string;
  description: string;
  duration: number;
  type: "error" | "success";
}

export default function ToastContent({
  t,
  title,
  description,
  duration,
  type,
}: ToastContentProps) {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const newProgress = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        toast.dismiss(t.id);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [t.id, duration]);

  return (
    <div className="bg-white dark:bg-neutral-900 border rounded-md shadow p-4 w-[300px]">
      <div className="font-semibold text-md mb-1 text-gray-800 dark:text-white">
        {title}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </div>
      <div className="h-1 bg-gray-300 rounded mt-3 overflow-hidden">
        <div
          className={`h-full ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  );
}
