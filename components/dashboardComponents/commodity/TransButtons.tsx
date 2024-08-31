"use client";

import { Button } from "@/components/ui/button";

import { useReceiveModalStore } from "@/hooks/use-receive-store";
import { useSendModalStore } from "@/hooks/use-send-store";

export default function TransButtons() {
  const sendModal = useSendModalStore();
  const receiveModal = useReceiveModalStore();

  return (
    <div className="flex gap-3">
      <Button
        onClick={sendModal.onOpen}
        size="lg"
        className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-500"
      >
        Send
      </Button>
      <Button
        onClick={receiveModal.onOpen}
        size="lg"
        className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-500"
      >
        Receive
      </Button>
    </div>
  );
}
