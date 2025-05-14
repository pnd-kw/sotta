import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import CustomFileInput from "../CustomFileInput";
import { Checkbox } from "@/components/ui/checkbox";

interface GalleryFormProps {
  imageId: string | undefined;
}

type GalleryImage = {
  id: string;
  name: string;
  published: boolean;
  url: string;
  alt: string;
  caption: string;
  tags: string[];
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

const galleryImage: GalleryImage[] = [
  {
    id: "img_001",
    name: "tabernakel",
    published: false,
    url: "/assets/tabernakel.svg",
    alt: "Tabernakel",
    caption: "Tabernakel dari bahan kuningan",
    tags: ["tabernakel", "kuningan"],
    mimeType: "image/svg",
    size: 125034,
    createdAt: "2020-09-10T10:12:40.000456Z",
    updatedAt: "2020-09-10T10:12:40.000456Z",
  },
  {
    id: "img_002",
    name: "bejana kuningan",
    published: true,
    url: "/assets/bejana_kuningan.svg",
    alt: "Bejana kuningan",
    caption: "Bejana dari kuningan",
    tags: ["bejana", "kuningan"],
    mimeType: "image/svg",
    size: 98342,
    createdAt: "2021-02-10T10:12:40.000456Z",
    updatedAt: "2021-02-10T10:12:40.000456Z",
  },
  {
    id: "img_003",
    name: "plakat souvenir",
    published: true,
    url: "/assets/plakat_souvenir.svg",
    alt: "Plakat souvenir",
    caption: "Plakat untuk souvenir",
    tags: ["plakat", "souvenir"],
    mimeType: "image/svg",
    size: 85760,
    createdAt: "2023-04-10T10:12:40.000456Z",
    updatedAt: "2023-04-10T10:12:40.000456Z",
  },
  {
    id: "img_004",
    name: "kalung etnik",
    published: true,
    url: "/assets/kalung_etnik.svg",
    alt: "Kalung etnik",
    caption: "Kalung etnik dari kuningan",
    tags: ["kalung", "etnik", "kuningan"],
    mimeType: "image/svg",
    size: 90214,
    createdAt: "2024-02-10T10:12:40.000456Z",
    updatedAt: "2024-02-10T10:12:40.000456Z",
  },
  {
    id: "img_005",
    name: "lencana kerajaan",
    published: true,
    url: "/assets/lencana_kerajaan.svg",
    alt: "Lencana kerajaan",
    caption: "Lencana kerajaan kuno",
    tags: ["lencana", "kerajaan"],
    mimeType: "image/svg",
    size: 75900,
    createdAt: "2025-06-10T10:12:40.000456Z",
    updatedAt: "2025-06-10T10:12:40.000456Z",
  },
  {
    id: "img_006",
    name: "plakat ikan",
    published: true,
    url: "/assets/plakat_ikan.svg",
    alt: "Plakat ikan",
    caption: "Plakat ikan terbang",
    tags: ["plakat", "ikan"],
    mimeType: "image/svg",
    size: 80000,
    createdAt: "2019-01-10T10:12:40.000456Z",
    updatedAt: "2019-01-10T10:12:40.000456Z",
  },
  {
    id: "img_007",
    name: "taber",
    published: true,
    url: "/assets/tabernakel.svg",
    alt: "Taber",
    caption: "Taber kuningan",
    tags: ["taber", "kuningan"],
    mimeType: "image/svg",
    size: 50000,
    createdAt: "2018-02-10T10:12:40.000456Z",
    updatedAt: "2018-02-10T10:12:40.000456Z",
  },
  {
    id: "img_008",
    name: "bejana",
    published: true,
    url: "/assets/bejana_kuningan.svg",
    alt: "Bejana",
    caption: "Bejana kuning",
    tags: ["bejana", "kuning"],
    mimeType: "image/svg",
    size: 40000,
    createdAt: "2020-07-10T10:12:40.000456Z",
    updatedAt: "2020-07-10T10:12:40.000456Z",
  },
  {
    id: "img_009",
    name: "plakat",
    published: true,
    url: "/assets/plakat_souvenir.svg",
    alt: "Plakat",
    caption: "Plakat perak",
    tags: ["plakat", "perak"],
    mimeType: "image/svg",
    size: 60000,
    createdAt: "2023-05-10T10:12:40.000456Z",
    updatedAt: "2023-05-10T10:12:40.000456Z",
  },
  {
    id: "img_010",
    name: "kalung",
    published: true,
    url: "/assets/kalung_etnik.svg",
    alt: "Kalung",
    caption: "Kalung unik",
    tags: ["kalung", "unik"],
    mimeType: "image/svg",
    size: 70000,
    createdAt: "2024-02-10T10:12:40.000456Z",
    updatedAt: "2024-02-10T10:12:40.000456Z",
  },
  {
    id: "img_011",
    name: "lencana",
    published: true,
    url: "/assets/lencana_kerajaan.svg",
    alt: "Lencana",
    caption: "Lencana indah",
    tags: ["lencana", "indah"],
    mimeType: "image/svg",
    size: 90000,
    createdAt: "2024-08-10T10:12:40.000456Z",
    updatedAt: "2024-08-10T10:12:40.000456Z",
  },
  {
    id: "img_012",
    name: "ikan",
    published: true,
    url: "/assets/plakat_ikan.svg",
    alt: "Ikan",
    caption: "Ikan laut",
    tags: ["ikan", "laut"],
    mimeType: "image/svg",
    size: 98769,
    createdAt: "2019-07-10T10:12:40.000456Z",
    updatedAt: "2019-07-10T10:12:40.000456Z",
  },
];

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

const galleryFormSchema = z.object({
  name: z.string().min(1, "Image name wajib diisi"),
  published: z.boolean().optional(),
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

type GalleryForm = z.infer<typeof galleryFormSchema>;

export default function GalleryForm({ imageId }: GalleryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<GalleryForm>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: { published: false },
  });

  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (imageId) {
      const imageData = galleryImage.find((item) => item.id === imageId);
      if (imageData) {
        const tagArray = Array.isArray(imageData.tags) ? imageData.tags : [];
        const tagString = tagArray.join(" ");

        setValue("name", imageData.name);
        setValue("alt", imageData.alt);
        setValue("caption", imageData.caption);
        setValue("tags", imageData.tags);
        setValue("published", imageData.published);

        setTagsInput(tagString);
      }
    }
  }, [imageId, setValue]);

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
    const file = data.image?.[0];
    if (file) {
      const isValidResolution = await validateImageResolution(file);
      if (!isValidResolution) {
        alert(`Resolusi gambar maksimal ${MAX_WIDTH}x${MAX_HEIGHT}px`);
        return;
      }
    }
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
          <CustomFileInput
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
                checked={field.value}
                onCheckedChange={field.onChange}
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
          <Button variant="green">Simpan</Button>
        </div>
      </form>
    </>
  );
}
