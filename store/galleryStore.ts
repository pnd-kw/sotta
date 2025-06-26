import { create } from "zustand";

type GalleryStore = {
  successApiResponse: boolean;
  setSuccessApiResponse: (value: boolean) => void;
};

export const useGalleryStore = create<GalleryStore>((set) => ({
  successApiResponse: false,
  setSuccessApiResponse: (value) => set({ successApiResponse: value }),
}));
