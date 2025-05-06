import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFileInput from "../CustomFileInput";

const galleryFormSchema = z.object({
  title: z.string().min(1, "Image title wajib diisi"),
  description: z.string().min(1, "Deskripsi image wajib diisi"),
  category: z.string().min(1, "Image category wajib diisi"),
  metadata: z.string().min(1, "Metadata image wajib diisi"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Gambar wajib diunggah")
    .refine(
      (file) => file?.[0]?.type?.startsWith("image/"),
      "File harus berupa gambar"
    )
    .refine(
      (file) => file?.[0]?.size <= 2 * 1024 * 1024,
      "Ukuran gambar maksimal 2MB"
    ),
});

type GalleryForm = z.infer<typeof galleryFormSchema>;

export default function GalleryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GalleryForm>({
    resolver: zodResolver(galleryFormSchema),
  });

  const onSubmit = (data: GalleryForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("metadata", data.metadata);
    formData.append("image", data.image[0]);

    console.log("send data to api", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 py-2">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-stone-900">
            Image title <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("title")}
            placeholder="Judul gambar ..."
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-900"
          >
            Image description <span className="text-red-500">*</span>
          </label>
          <Input
            textarea
            {...register("description")}
            placeholder="Deskripsi gambar adalah ..."
            maxLength={250}
            aria-invalid={!!errors.description}
          />
          <div
            className={`flex ${
              errors.description ? "justify-between" : "justify-end"
            }`}
          >
            {errors.description && (
              <p className="pt-2 px-2 text-left text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
            <span className="pt-2 text-xs text-stone-500 italic">
              Maximum of 250 characters
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="metadata"
            className="text-sm font-medium text-stone-900"
          >
            Image metadata <span className="text-red-500">*</span>
          </label>
          <Input
            textarea
            {...register("metadata")}
            placeholder="#kerajinan #souvenir #kuningan #perak..."
            maxLength={250}
            aria-invalid={!!errors.metadata}
          />
          <div
            className={`flex ${
              errors.metadata ? "justify-between" : "justify-end"
            }`}
          >
            {errors.metadata && (
              <p className="pt-2 px-2 text-left text-xs text-red-500">
                {errors.metadata.message}
              </p>
            )}
            <span className="pt-2 text-xs text-stone-500 italic">
              Maximum of 250 characters
            </span>
          </div>
        </div>
        <div>
          {/* <label htmlFor="image" className="text-sm font-medium text-stone-900">
            Upload an image <span className="text-red-500">*</span>
          </label>
          <Input
            type="file"
            accept="image/*"
            {...register("image")}
            aria-invalid={!!errors.image}
          />
          {typeof errors.image?.message === "string" && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.image.message}
            </p>
          )} */}
          <CustomFileInput
            onChange={(e) => setValue("image", e.target.files)}
            error={
              typeof errors.image?.message === "string"
                ? errors.image.message
                : undefined
            }
          />
        </div>
        <div className="flex justify-end">
          <Button variant="green">Simpan</Button>
        </div>
      </form>
    </>
  );
}
