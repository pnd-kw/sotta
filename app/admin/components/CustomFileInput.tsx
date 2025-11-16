import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CustomFileInput({
  label,
  onChange,
  error,
}: {
  label: React.ReactNode;
  onChange: (files: File[]) => void;
  error?: string;
}) {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

  const handlePick = (index: number) => {
    inputRefs[index].current?.click();
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;
    const updated = [...files];
    updated[index] = file;

    setFiles(updated);
    onChange(updated.filter(Boolean) as File[]);
  };

  const handleRemove = (index: number) => {
    const updated = [...files];
    updated[index] = null;

    setFiles(updated);
    onChange(updated.filter(Boolean) as File[]);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-stone-900">{label}</label>

      <div className="flex gap-4">
        {files.map((file, index) => (
          <div key={index} className="flex flex-col items-center">
            {file ? (
              <div className="relative w-24 h-24">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  fill
                  className="object-cover rounded"
                />
                <Button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                >
                  Hapus
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => handlePick(index)}
              >
                Pilih {index + 1}
              </Button>
            )}

            <input
              ref={inputRefs[index]}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="pt-2 px-2 text-left text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
