import { Button } from "@/components/ui/button";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

export interface ImageAlertDialogHandle {
  openDialog: () => void;
  closeDialog: () => void;
}

interface ImageAlertDialogProps {
  alertImage: ReactNode;
  title?: string;
  content?: string;
}

const ImageAlertDialog = forwardRef<
  ImageAlertDialogHandle,
  ImageAlertDialogProps
>(({ alertImage, title = "", content = "" }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
  }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-xs w-full p-6 text-center relative">
        <div className="flex items-center justify-center mb-4">
          {alertImage}
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{content}</p>
        <Button variant="red" onClick={() => setOpen(false)}>
          Tutup
        </Button>
      </div>
    </div>
  );
});

ImageAlertDialog.displayName = "ImageAlertDialog";

export default ImageAlertDialog;
