import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userSchema = z
  .object({
    username: z.string().min(1, "Username wajib diisi"),
    nama: z.string().min(1, "Nama wajib diisi"),
    phone_number: z
      .string()
      .min(10, "No HP minimal 10 digit")
      .regex(/^[0-9]+$/, "No HP hanya boleh angka"),
    roles: z.string().min(1, "Role wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    pass_confirm: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.pass_confirm, {
    message: "Password tidak sama",
    path: ["pass_confirm"],
  });

type UserForm = z.infer<typeof userSchema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserForm) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("nama", data.nama);
    formData.append("phone_number", data.phone_number);
    formData.append("roles", data.roles);
    formData.append("password", data.password);
    formData.append("pass_confirm", data.pass_confirm);

    console.log("send data to api", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4 py-2">
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
        <Button variant="green">Simpan</Button>
      </div>
    </form>
  );
}
