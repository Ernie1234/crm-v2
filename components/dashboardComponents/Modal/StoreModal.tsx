"use client";

import { useBuyModalStore } from "@/hooks/use-buy-store";
import Modal from "./Modal";

export default function StoreModal() {
  const modalStore = useBuyModalStore();
  return (
    <Modal
      onSubmit={() => console.log("first")}
      actionLabel="submit"
      isOpen={modalStore.isOpen}
      onClose={modalStore.onClose}
    />
  );
}
