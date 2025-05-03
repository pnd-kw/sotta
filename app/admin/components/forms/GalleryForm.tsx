import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const galleryFormSchema = z.object({
  title: z.string().min(1, "Image title wajib diisi"),
  description: z.string().min(1, "Deskripsi image wajib diisi"),
  category: z.string().min(1, "Image category wajib diisi"),
  metadata: z.string().min(1, "Metadata images wajib diisi"),
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("title")}
            placeholder="Image title"
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <Input
            textarea
            {...register("description")}
            placeholder="Image description"
            maxLength={250}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <Input
            textarea
            {...register("metadata")}
            placeholder="Image metadata"
            maxLength={250}
            aria-invalid={!!errors.metadata}
          />
          {errors.metadata && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.metadata.message}
            </p>
          )}
        </div>
        <div>
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
          )}
        </div>
      </form>
    </>
  );
}
