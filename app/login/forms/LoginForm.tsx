"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.username, data.password);
      router.push("/admin");
    } catch (err) {
      setErrorMsg("username atau password salah");
    }
  };

  return (
    <div className="w-full h-full">
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
              htmlFor="username"
              className="text-sm font-medium text-stone-800"
            >
              Username
            </label>
            <Input
              {...register("username")}
              placeholder="username"
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="pt-2 text-xs text-red-500">
                {errors.username.message}
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
            <Button variant="green">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
