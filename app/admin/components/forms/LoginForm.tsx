import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    console.log("send data to api", data);
  };

  return (
    <div className="w-full h-full">
      <h1 className="flex items-center justify-center text-2xl font-bold">
        Logo
      </h1>
      <div className="w-full h-full px-4 py-4">
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("validation error", err);
          })} className="space-y-2"
        >
          <div>
            <label htmlFor="username" className="text-sm font-medium text-stone-800">
              Username
            </label>
            <Input
              {...register("username")}
              placeholder="username"
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="pt-2 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-stone-800">
              Password
            </label>
            <Input
              {...register("password")}
              placeholder="password"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="pt-2 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center pt-6">
            <Button variant="green">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
