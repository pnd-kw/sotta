import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { z } from "zod";

interface UserFormProps {
  userId: string | null;
}

type Gender = "laki-laki" | "perempuan";

type User = {
  id_user: string;
  username: string;
  nama: string;
  gender: Gender;
  avatar: string;
  phone_number: string;
  roles: string;
  password: string;
  password_confirm: string;
  created_at: string;
  updated_at: string;
};

const users: User[] = [
  {
    id_user: "manutd20",
    username: "alfian_persie",
    nama: "Eva Alfian",
    gender: "laki-laki",
    avatar: "/assets/avatar-1.svg",
    phone_number: "085774801409",
    roles: "superadmin",
    password: "rahasia",
    password_confirm: "rahasia",
    created_at: "2025-05-13T10:09:23.000456Z",
    updated_at: "2025-05-13T10:09:23.000456Z",
  },
  {
    id_user: "xvk765ia",
    username: "john",
    nama: "john doe",
    gender: "laki-laki",
    avatar: "/assets/avatar-2.svg",
    phone_number: "085524311234",
    roles: "admin",
    password: "admin123",
    password_confirm: "admin123",
    created_at: "2025-02-10T10:14:40.000456Z",
    updated_at: "2025-02-10T10:14:40.000456Z",
  },
  {
    id_user: "myc285pl",
    username: "susie",
    nama: "susan",
    gender: "perempuan",
    avatar: "/assets/avatar-3.svg",
    phone_number: "085578900987",
    roles: "account officer",
    password: "account123",
    password_confirm: "account123",
    created_at: "2025-02-10T10:14:41.000456Z",
    updated_at: "2025-02-10T10:14:41.000456Z",
  },
];

const MAX_AVATAR_SIZE = 1 * 1024 * 1024;
const MAX_AVATAR_WIDTH = 300;
const MAX_AVATAR_HEIGHT = 300;

const userSchema = z
  .object({
    username: z.string().min(1, "Username wajib diisi"),
    nama: z.string().min(1, "Nama wajib diisi"),
    gender: z.enum(["laki-laki", "perempuan"], {
      required_error: "Jenis kelamin wajib dipilih",
    }),
    phone_number: z
      .string()
      .min(10, "No HP minimal 10 digit")
      .regex(/^[0-9]+$/, "No HP hanya boleh angka"),
    roles: z.string().min(1, "Role wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    pass_confirm: z.string().min(1, "Konfirmasi password wajib diisi"),
    avatar: z
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
  .refine((data) => data.password === data.pass_confirm, {
    message: "Password tidak sama",
    path: ["pass_confirm"],
  });

async function validateAvatarResolution(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
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

type UserForm = z.infer<typeof userSchema>;

export default function UserForm({ userId }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      gender: "laki-laki",
    },
  });

  const [preview, setPreview] = useState<string>("/assets/avatar-1.svg");

  const watchAvatar = watch("avatar");
  const watchGender = watch("gender") as "laki-laki" | "perempuan";

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

  useEffect(() => {
    if (userId) {
      const userData = users.find((item) => item.id_user === userId);
      if (userData) {
        setValue("username", userData.username);
        setValue("nama", userData.nama);
        setValue("gender", userData.gender);
        setValue("phone_number", userData.phone_number);
        setValue("roles", userData.roles);
        setValue("password", userData.password);
        setValue("pass_confirm", userData.password_confirm);

        if (!watchAvatar || watchAvatar.length === 0) {
          setPreview(userData.avatar);
        }
      }
    } else {
      if (watchGender === "perempuan" || watchGender === "laki-laki") {
        setPreview(
          watchGender === "perempuan"
            ? "/assets/avatar-2.svg"
            : "/assets/avatar-1.svg"
        );
      }
    }
  }, [userId, setValue, watchGender]);

  const onSubmit = async (data: UserForm) => {
    const file = data.avatar?.[0];

    if (file) {
      const resolutionError = await validateAvatarResolution(file);
      if (resolutionError) {
        alert(resolutionError);
        return;
      }
    }

    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("nama", data.nama);
    formData.append("gender", data.gender);
    formData.append("phone_number", data.phone_number);
    formData.append("roles", data.roles);
    formData.append("password", data.password);
    formData.append("pass_confirm", data.pass_confirm);

    if (data.avatar?.[0]) {
      formData.append("avatar", data.avatar[0]);
    } else if (!userId) {
      const defaultAvatar =
        data.gender === "laki-laki"
          ? "/assets/avatar-1.svg"
          : "/assets/avatar-2.svg";
      formData.append("avatar", defaultAvatar);
    }

    console.log("send data to api", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 py-2">
      <div className="flex flex-col items-center space-y-2">
        <img
          src={preview}
          alt="Avatar Preview"
          className="w-32 h-32 rounded-full object-cover border"
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
      <div>
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
      </div>
      <div>
        <label htmlFor="nama" className="text-sm font-medium text-stone-900">
          Nama <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("nama")}
          placeholder="John doe ..."
          aria-invalid={!!errors.nama}
        />
        {errors.nama && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.nama.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="gender" className="text-sm font-medium text-stone-900">
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
      <div>
        <label htmlFor="roles" className="text-sm font-medium text-stone-900">
          Role <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("roles")}
          placeholder="Admin ..."
          aria-invalid={!!errors.roles}
        />
        {errors.roles && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.roles.message}
          </p>
        )}
      </div>
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
          htmlFor="pass_confirm"
          className="text-sm font-medium text-stone-900"
        >
          Konfirmasi Password <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("pass_confirm")}
          placeholder="123456 ..."
          aria-invalid={!!errors.pass_confirm}
        />
        {errors.pass_confirm && (
          <p className="pt-2 px-2 text-left text-xs text-red-500">
            {errors.pass_confirm.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="green">
          {userId !== null ? "Perbarui" : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
