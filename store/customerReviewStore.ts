import { create } from "zustand";

type CustomerReviewStore = {
  successApiResponse: boolean;
  setSuccessApiResponse: (value: boolean) => void;
};

export const useCustomerReviewStore = create<CustomerReviewStore>((set) => ({
  successApiResponse: false,
  setSuccessApiResponse: (value) => set({ successApiResponse: value }),
}));
