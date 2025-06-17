import { toast } from "sonner";
import ToastContent from "./ToastContent";

type ToastType = "success" | "error";

interface ToastWithProgressProps {
  title: string;
  description: string;
  duration?: number;
  type?: ToastType;
}

export default function ToastWithProgress({
  title,
  description,
  duration = 3000,
  type = "success",
}: ToastWithProgressProps) {
  toast.custom((id: string | number) => (
    <ToastContent
      t={{ id }}
      title={title}
      description={description}
      duration={duration}
      type={type}
    />
  ));
};
