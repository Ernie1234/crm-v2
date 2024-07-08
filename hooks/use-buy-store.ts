import { create } from "zustand";

interface IUseModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBuyModalStore = create<IUseModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
