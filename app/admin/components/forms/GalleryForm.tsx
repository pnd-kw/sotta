import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import CustomFileInput from "../CustomFileInput";
import { Checkbox } from "@/components/ui/checkbox";
import { createGalleryImage } from "@/app/api/gallery/createGalleryImage";
import { useAuthStore } from "@/store/authStore";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { updateGalleryImage } from "@/app/api/gallery/updateGalleryImage";
import { useGalleryStore } from "@/store/galleryStore";
import { getCategories } from "@/app/api/category/getCategories";

type Category = {
  id: number;
  name: string;
  parent_id?: number | null;
  children?: Category[];
};

interface GalleryFormProps {
  imageId?: string;
  initialData?: GalleryImage | null;
  successApiResponse?: boolean;
}

type GalleryImage = {
  id: string;
  name: string;
  published: boolean;
  imageUrl: string;
  public_id: string;
  alt: string;
  caption: string;
  tags: string[];
  mimeType: string;
  size: number;
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

const galleryFormSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(1, "Image name wajib diisi"),
    published: z.boolean().optional(),
    alt: z.string().min(1, "Image alt wajib diisi"),
    caption: z.string().min(1, "Caption image wajib diisi"),
    tags: z.array(z.string()).optional(),
    categories: z
      .array(z.string(), {
        required_error: "Pilih setidaknya 1 kategori",
      })
      .min(1, "Pilih setidaknya 1 kategori"),
    image: isEditMode
      ? z.any().optional()
      : z
          .any()
          .refine((file) => file?.length === 1, "Gambar wajib diunggah")
          .refine(
            (file) => file?.[0]?.type?.startsWith("image/"),
            "File harus berupa gambar"
          )
          .refine(
            (file) => file?.[0]?.size <= MAX_FILE_SIZE,
            `Ukuran gambar maksimal ${MAX_FILE_SIZE / (1024 * 1024)}MB`
          ),
  });

const validateImageResolution = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

type GalleryForm = z.infer<ReturnType<typeof galleryFormSchema>>;

export default function GalleryForm({
  imageId,
  initialData,
}: GalleryFormProps) {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm<GalleryForm>({
    resolver: zodResolver(galleryFormSchema(isEditMode)),
    defaultValues: { published: false },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setSuccessApiResponse } = useGalleryStore();
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        alt: initialData.alt,
        caption: initialData.caption,
        tags: initialData.tags ?? [],
        published: initialData.published ?? false,
        image: undefined,
      });

      setTagsInput((initialData.tags ?? []).join(" "));
    }
  }, [initialData, reset]);

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

  const onSubmit = async (data: GalleryForm) => {
    setIsLoading(true);
    const file = data.image?.[0];
    if (file) {
      const isValidResolution = await validateImageResolution(file);
      if (!isValidResolution) {
        alert(`Resolusi gambar maksimal ${MAX_WIDTH}x${MAX_HEIGHT}px`);
        return;
      }
    }

    // const basePayload = {
    //   name: data.name,
    //   published: !!data.published,
    //   alt: data.alt,
    //   caption: data.caption,
    //   tags: data.tags || [],
    //   image: file,
    //   updatedBy: user?.name || "",
    // };

    try {
      if (initialData && imageId) {
        const updatePayload = {
          name: data.name,
          published: !!data.published,
          caption: data.caption,
          tags: data.tags || [],
          categories: selectedCategoryIds,
          updatedBy: user?.name || "",
          newImages: files,
          existingImages: initialData.images || [],
        };
        await updateGalleryImage(updatePayload, { params: { id: imageId } });
        ToastWithProgress({
          title: "Berhasil",
          description: "Data image gallery berhasil diperbarui.",
          duration: 3000,
          type: "success",
        });
        setSuccessApiResponse(true);
      } else {
        const createPayload = {
          name: data.name,
          published: !!data.published,
          alt: data.alt,
          caption: data.caption,
          tags: data.tags || [],
          categories: selectedCategoryIds,
          images: files,
          createdBy: user?.name || "",
          updatedBy: user?.name || "",
        };
        await createGalleryImage(createPayload);
        ToastWithProgress({
          title: "Berhasil",
          description: "Data image gallery berhasil disimpan.",
          duration: 3000,
          type: "success",
        });
        setSuccessApiResponse(true);
        reset();
        setTagsInput("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      ToastWithProgress({
        title: "Gagal",
        description: initialData
          ? "Gagal memperbarui data image gallery."
          : "Gagal menyimpan data image gallery.",
        duration: 3000,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
            value={tagsInput}
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
          <label
            htmlFor="categories"
            className="text-sm font-medium text-stone-900"
          >
            Categories <span className="text-red-500">*</span>
          </label>
          <Controller
            name="categories"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isSelected = field.value.includes(String(cat.id));

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          const newValue = isSelected
                            ? field.value.filter((id) => id !== String(cat.id))
                            : [...field.value, cat.id];
                          field.onChange(newValue);
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 ${
                          isSelected
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          />
          {errors.categories && (
            <p className="pt-1 text-xs text-red-500">
              {errors.categories.message}
            </p>
          )}
        </div>
        {initialData && (
          <div>
            Image link :{" "}
            <a
              href={initialData.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {initialData.imageUrl}
            </a>
          </div>
        )}
        <div>
          <CustomFileInput
            label={
              initialData ? (
                "Upload new image or just ignore this field"
              ) : (
                <>
                  Upload an image <span className="text-red-500">*</span>
                </>
              )
            }
            onChange={(e) => setValue("image", e.target.files)}
            error={
              typeof errors.image?.message === "string"
                ? errors.image.message
                : undefined
            }
          />
        </div>
        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id="published"
                checked={!!field.value}
                onCheckedChange={(checked: boolean | "indeterminate") =>
                  field.onChange(checked === true)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="publish"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Publish
                </label>
                <p className="text-sm text-muted-foreground">
                  Anda tidak bisa melihat preview dan akan langsung tampil di
                  halaman pengunjung.
                </p>
              </div>
            </div>
          )}
        />
        <div className="flex justify-end">
          <Button variant="green" disabled={isLoading}>
            {isLoading ? "Memproses" : initialData ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </form>
    </>
  );
}
