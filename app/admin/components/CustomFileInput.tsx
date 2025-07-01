import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function CustomFileInput({
  label,
  onChange,
  error,
}: {
  label: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map(file => file.name);
      setFileNames(names);
    }
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-stone-900">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="text-stone-700"
          onClick={handleClick}
        >
          Pilih Gambar
        </Button>
        <span className="text-sm text-stone-700 italic truncate max-w-xs">
          {fileNames.length > 0 ? fileNames.join(", ") : "Belum ada file dipilih (ukuran maksimal 2MB)"}
        </span>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
          multiple
        />
      </div>
      {error && (
        <p className="pt-2 px-2 text-left text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
