import { createUser } from "@/app/api/user/createUser";
import { updateUser } from "@/app/api/user/updateUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { z } from "zod";

interface UserFormProps {
  userId: string | undefined;
  initialData?: UserData | null;
}

type Gender = "laki-laki" | "perempuan";

type UserData = {
  id_user: string;
  name: string;
  email: string;
  gender: Gender;
  avatar: string;
  phone_number: string;
  role: {
    id: number;
    name: string;
  };
};

// type User = {
//   id_user: string;
//   name: string;
//   email: string;
//   gender: Gender;
//   avatar: string;
//   phone_number: string;
//   role: {
//     id: number;
//     name: string;
//   };
//   role_id: number;
//   password: string;
//   password_confirmation: string;
//   created_at: string;
//   updated_at: string;
// };

const role = [
  { id: 2, name: "admin" },
  { id: 3, name: "guest" },
];

const MAX_AVATAR_SIZE = 1 * 1024 * 1024;
const MAX_AVATAR_WIDTH = 300;
const MAX_AVATAR_HEIGHT = 300;

const makeUserSchema = (isEditMode: boolean) =>
  z
    .object({
      name: z.string().min(1, "Nama wajib diisi"),
      email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid"),
      gender: z.enum(["laki-laki", "perempuan"], {
        required_error: "Jenis kelamin wajib dipilih",
      }),
      phone_number: z
        .string()
        .min(10, "No HP minimal 10 digit")
        .regex(/^[0-9]+$/, "No HP hanya boleh angka"),
      role: z.object(
        {
          id: z.number(),
          name: z.string(),
        },
        {
          required_error: "Role wajib dipilih",
          invalid_type_error: "Role tidak valid",
        }
      ),
      password: isEditMode
        ? z.string().optional()
        : z.string().min(6, "Password minimal 6 karakter"),
      password_confirmation: isEditMode
        ? z.string().optional()
        : z.string().min(1, "Konfirmasi password wajib diisi"),
      avatar: isEditMode
        ? z.any().optional()
        : z
            .any()
            .optional()
            .refine(
              (file) => !file?.length || file?.[0]?.type?.startsWith("image/"),
              "File harus berupa gambar"
            )
            .refine(
              (file) => !file?.length || file?.[0]?.size <= MAX_AVATAR_SIZE,
              "Ukuran avatar maksimal 1MB"
            ),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Password tidak sama",
      path: ["password_confirmation"],
    });

async function validateAvatarResolution(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const img: HTMLImageElement = new Image();
      img.onload = () => {
        if (img.width > MAX_AVATAR_WIDTH || img.height > MAX_AVATAR_HEIGHT) {
          resolve(
            `Resolusi avatar maksimal ${MAX_AVATAR_WIDTH}x${MAX_AVATAR_HEIGHT}px`
          );
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve("Gagal membaca gambar.");
      img.src = reader.result as string;
    };
    reader.onerror = () => resolve("Gagal membaca file.");
    reader.readAsDataURL(file);
  });
}

type CreateUserForm = z.infer<ReturnType<typeof makeUserSchema>>;
type UpdateUserForm = z.infer<ReturnType<typeof makeUserSchema>>;

export default function UserForm({ userId, initialData }: UserFormProps) {
  const isEditMode = !!initialData;

  const isSuperAdmin = initialData?.role.name === "superadmin";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CreateUserForm | UpdateUserForm>({
    resolver: zodResolver(makeUserSchema(isEditMode)),
    defaultValues: {
      gender: "laki-laki",
      role: { id: 2, name: "admin" },
    },
  });

  const [preview, setPreview] = useState<string>("/assets/avatar-1.svg");

  const watchAvatar = watch("avatar");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        gender: initialData.gender,
        phone_number: initialData.phone_number,
        role: {
          id: initialData.role.id,
          name: initialData.role.name,
        },
        password: "",
        password_confirmation: "",
      });
      if (initialData.avatar) {
        setPreview(initialData.avatar);
      }
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (watchAvatar && watchAvatar[0]) {
      const file = watchAvatar[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchAvatar]);

  const onSubmit = async (data: CreateUserForm | UpdateUserForm) => {
    let avatarFile = data.avatar?.[0];

    if (avatarFile) {
      const resolutionError = await validateAvatarResolution(avatarFile);
      if (resolutionError) {
        alert(resolutionError);
        return;
      }
    }

    if (!avatarFile && !userId) {
      const defaultAvatarPath =
        data.gender === "laki-laki"
          ? "/assets/avatar-1.svg"
          : "/assets/avatar-2.svg";

      const response = await fetch(defaultAvatarPath);
      const blob = await response.blob();
      const filename =
        defaultAvatarPath.split("/").pop() || "default-avatar.svg";
      avatarFile = new File([blob], filename, { type: blob.type });
    }

    const mappedGender = data.gender === "laki-laki" ? "male" : "female";

    const basePayload = {
      name: data.name,
      email: data.email,
      gender: mappedGender,
      avatar: avatarFile as File,
      phone_number: data.phone_number,
      role_id: data.role.id,
      // password: data.password,
      // password_confirmation: data.password_confirmation,
    };

    try {
      if (initialData && userId) {
        await updateUser(
          {
            ...basePayload,
            ...(data.password
              ? {
                  password: data.password,
                  password_confirmation: data.password_confirmation,
                }
              : {}),
            // ...(data.password ? { password: data.password } : {}),
            // ...(data.password_confirmation
            //   ? { password_confirmation: data.password_confirmation }
            //   : {}),
          },
          { params: { id: userId } }
        );
        ToastWithProgress({
          title: "Berhasil",
          description: "Data user berhasil diperbarui.",
          duration: 3000,
          type: "success",
        });
      } else {
        await createUser({
          ...basePayload,
          password: data.password as string,
          password_confirmation: data.password_confirmation as string,
        });
        ToastWithProgress({
          title: "Berhasil",
          description: "Data user berhasil disimpan.",
          duration: 3000,
          type: "success",
        });
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastWithProgress({
        title: "Gagal",
        description: initialData
          ? "Gagal memperbarui data user."
          : "Gagal menyimpan data user.",
        duration: 3000,
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 py-2">
      <div className="flex flex-col items-center space-y-2">
        <NextImage
          src={preview}
          alt="Avatar Preview"
          width={150}
          height={150}
          className="rounded-full object-cover border"
        />
        <label
          htmlFor="avatar-upload"
          className="absolute flex items-end justify-end w-32 h-32 text-stone-500 rounded-lg cursor-pointer"
        >
          <FaCamera />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("avatar")}
        />
        {errors.avatar?.message && (
          <p className="text-xs text-red-500">
            {String(errors.avatar.message)}
          </p>
        )}
      </div>
      {/* <div>
        <label
          htmlFor="username"
          className="text-sm font-medium text-stone-900"
        >
          Username <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("username")}
          placeholder="John doe ..."
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.username.message}
          </p>
        )}
      </div> */}
      <div>
        <label htmlFor="name" className="text-sm font-medium text-stone-900">
          Nama <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("name")}
          placeholder="John doe ..."
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-stone-900">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("email")}
          placeholder="john.doe@gmail.com ..."
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      {!isSuperAdmin && (
        <div>
          <label
            htmlFor="gender"
            className="text-sm font-medium text-stone-900"
          >
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <select
            {...register("gender")}
            defaultValue="laki-laki"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
      )}
      <div>
        <label
          htmlFor="phone_number"
          className="text-sm font-medium text-stone-900"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("phone_number")}
          placeholder="088888888888 ..."
          aria-invalid={!!errors.phone_number}
        />
        {errors.phone_number && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.phone_number.message}
          </p>
        )}
      </div>
      {!isSuperAdmin && (
        <div>
          <label htmlFor="role" className="text-sm font-medium text-stone-900">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selected = role.find((role) => role.id === selectedId);

              if (selected) setValue("role", selected);
            }}
            value={watch("role")?.id || ""}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="" disabled>
              Pilih role...
            </option>
            {role.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="pt-2 px-2 text-left text-xs text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>
      )}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium text-stone-900"
        >
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("password")}
          placeholder="123456 ...."
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password_confirmation"
          className="text-sm font-medium text-stone-900"
        >
          Konfirmasi Password <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("password_confirmation")}
          placeholder="123456 ..."
          aria-invalid={!!errors.password_confirmation}
        />
        {errors.password_confirmation && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="green">{isEditMode ? "Perbarui" : "Simpan"}</Button>
      </div>
    </form>
  );
}
