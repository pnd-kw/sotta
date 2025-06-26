import { create } from "zustand";

type UserStore = {
  successApiResponse: boolean;
  setSuccessApiResponse: (value: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  successApiResponse: false,
  setSuccessApiResponse: (value) => set({ successApiResponse: value }),
}));
