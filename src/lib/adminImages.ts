import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AdminImagesState = {
  slots: (string | null)[];
  confirmed: boolean[];
  setSlot: (index: number, dataUrl: string) => void;
  confirmSlot: (index: number) => void;
  clearSlot: (index: number) => void;
};

export const useAdminImagesStore = create<AdminImagesState>()(
  persist(
    (set) => ({
      slots: [null, null],
      confirmed: [false, false],
      setSlot: (index, dataUrl) =>
        set((state) => {
          const next = [...state.slots];
          const confirmed = [...state.confirmed];
          if (index >= 0 && index < next.length) {
            next[index] = dataUrl;
            confirmed[index] = false; // reset confirmation until admin validates
          }
          return { slots: next, confirmed };
        }),
      confirmSlot: (index) =>
        set((state) => {
          const confirmed = [...state.confirmed];
          if (index >= 0 && index < confirmed.length) {
            confirmed[index] = Boolean(state.slots[index]);
          }
          return { confirmed };
        }),
      clearSlot: (index) =>
        set((state) => {
          const next = [...state.slots];
          const confirmed = [...state.confirmed];
          if (index >= 0 && index < next.length) {
            next[index] = null;
            confirmed[index] = false;
          }
          return { slots: next, confirmed };
        }),
    }),
    { name: "admin-dashboard-images" }
  )
);
