import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fakeLogin } from "@/utils/fakeAuth";

interface AuthState {
  username: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
//   loggedInUsername: string | null;
//   loggedInUserRoles: string | null;
//   setLoggedInUsername: (user: string | null) => void;
//   setLoggedInUserRoles: (role: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      login: async (username, password) => {
        const data = fakeLogin(username, password);
        set({ username: data.username, role: data.role });
      },
      logout: () => {
        // localStorage.removeItem("token");
        document.cookie = "token=; Max-Age=0; path=/;";
        set({ username: null, role: null });
      },
    //   loggedInUsername: null,
    //   loggedInUserRoles: null,
    //   setLoggedInUsername: (user) => set({ loggedInUsername: user }),
    //   setLoggedInUserRoles: (role) => set({ loggedInUserRoles: role }),
    }),
    {
      name: "auth-storage",
    }
  )
);
