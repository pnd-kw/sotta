import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "@/app/api/auth/login";
import axiosInstance from "@/app/api/axiosInstance";
import Cookies from "js-cookie";

interface User {
  id_user: string;
  name: string;
  email: string;
  role_id: number;
  role_name: string;
  gender: string;
  avatar: string | null;
  phone_number: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const response = await loginUser({ email, password });

        set({
          user: response.user,
          token: response.access_token,
        });

        Cookies.set("token", response.access_token, {
          secure: true,
          sameSite: "strict",
          path: "/",
          expires: 1, 
        });
      },
      logout: async () => {
        try {
          await axiosInstance.post("/api/logout");
        } catch (e) {
          console.error(e);
        }
        Cookies.remove("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
