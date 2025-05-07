import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFileInput from "../CustomFileInput";

const galleryFormSchema = z.object({
  name: z.string().min(1, "Image name wajib diisi"),
  alt: z.string().min(1, "Image alt wajib diisi"),
  caption: z.string().min(1, "Caption image wajib diisi"),
  category: z.string().min(1, "Image category wajib diisi"),
  tags: z.array(z.string()).optional(),
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
    watch,
  } = useForm<GalleryForm>({
    resolver: zodResolver(galleryFormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tagsInput, setTagsInput] = useState("");

  const nameValue = watch("name");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (nameValue) {
        setValue("alt", nameValue.toLowerCase(), { shouldValidate: true });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue]);

  const onSubmit = (data: GalleryForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("alt", data.alt);
    formData.append("caption", data.caption);
    formData.append("category", data.category);
    formData.append("tags", JSON.stringify(data.tags || []));
    formData.append("image", data.image[0]);

    console.log("send data to api", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, (err) => {
          console.log("validation error", err);
        })}
        className="space-y-4 px-4 py-2"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-900">
            Image name <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder="Judul gambar ..."
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="alt" className="text-sm font-medium text-stone-900">
            Image alt <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("alt")}
            placeholder="Image alt ..."
            aria-invalid={!!errors.alt}
          />
          {errors.alt && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.alt.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="text-sm font-medium text-stone-900"
          >
            Image category <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("category")}
            placeholder="Logam"
            aria-invalid={!!errors.category}
          />
          {errors.category && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="caption"
            className="text-sm font-medium text-stone-900"
          >
            Image caption <span className="text-red-500">*</span>
          </label>
          <Input
            textarea
            {...register("caption")}
            placeholder="Caption gambar adalah ..."
            maxLength={250}
            aria-invalid={!!errors.caption}
          />
          <div
            className={`flex ${
              errors.caption ? "justify-between" : "justify-end"
            }`}
          >
            {errors.caption && (
              <p className="pt-2 px-2 text-left text-xs text-red-500">
                {errors.caption.message}
              </p>
            )}
            <span className="pt-2 text-xs text-stone-500 italic">
              Maximum of 250 characters
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="tags" className="text-sm font-medium text-stone-900">
            Image tags <span className="text-red-500"></span>
          </label>
          <Input
            textarea
            // {...register("tags")}
            onChange={(e) => {
              const rawValue = e.target.value;
              setTagsInput(rawValue);

              const tagArray = rawValue
                .split(/[ ,]+/)
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
                .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
              setValue("tags", tagArray, { shouldValidate: true });
            }}
            placeholder="#kerajinan #souvenir #kuningan #perak..."
            maxLength={250}
            aria-invalid={!!errors.tags}
          />
          <div
            className={`flex ${
              errors.tags ? "justify-between" : "justify-end"
            }`}
          >
            {errors.tags && (
              <p className="pt-2 px-2 text-left text-xs text-red-500">
                {errors.tags.message}
              </p>
            )}
            <span className="pt-2 text-xs text-stone-500 italic">
              Maximum of 250 characters
            </span>
          </div>
        </div>
        <div>
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
