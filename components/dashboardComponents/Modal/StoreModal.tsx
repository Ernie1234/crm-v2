"use client";

import { useModalStore } from "@/hooks/use-store";
import Modal from "./Modal";

export default function StoreModal() {
  const modalStore = useModalStore();
  return (
    <Modal isOpen={modalStore.isOpen} onClose={modalStore.onClose}>
      hello world
    </Modal>
  );
}
