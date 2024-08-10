import { create } from "zustand";

interface IUseModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSendModalStore = create<IUseModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
