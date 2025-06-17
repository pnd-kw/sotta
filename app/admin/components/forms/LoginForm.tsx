import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi"),
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

  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      ToastWithProgress({
        title: "Berhasil",
        description: "Login sukses.",
        duration: 3000,
        type: "success",
      });
      router.push("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Email atau password salah");
      ToastWithProgress({
        title: "Gagal",
        description: "Login gagal.",
        duration: 3000,
        type: "error",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      {errorMsg && <div className=""> </div>}
      <h1 className="flex items-center justify-center text-[#ba7b0b] text-3xl font-bold font-mono">
        Sotta
      </h1>
      <div className="w-full h-full px-4 py-4">
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("validation error", err);
          })}
          className="space-y-2"
        >
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-stone-800"
            >
              email
            </label>
            <Input
              {...register("email")}
              placeholder="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="pt-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-stone-800"
            >
              Password
            </label>
            <Input
              {...register("password")}
              placeholder="password"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="pt-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center pt-6">
            <Button variant="green">{isLoading ? "Memproses..." : "Login"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
