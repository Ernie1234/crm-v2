"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { useSendModalStore } from "@/hooks/use-send-store";
import { useReceiveModalStore } from "@/hooks/use-receive-store";
import Image from "next/image";
import CopyToClipboard from "./CopyToClipboard";
import { CircleHelp } from "lucide-react";
import QRCodeComponent from "./QRCodeComponent";
import { Button } from "@/components/ui/button";

enum Tabs {
  SEND,
  RECEIVE,
}

interface Props {
  address:
    | string
    | {
        error: string;
      };
}

export default function ReceiveModal({ address }: Props) {
  const receiveModalStore = useReceiveModalStore();
  const sendModalStore = useSendModalStore();
  const [activeTab, setActiveTab] = useState(Tabs.RECEIVE);

  const showModal = receiveModalStore;

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col mx-auto px-8 w-full">
        <div className="w-1/4 mx-auto py-8">
          {/* <Image
            alt="qr-code"
            src="/assets/qr-code-svgrepo-com 1.png"
            className="object-contain w-full"
            height={500}
            width={500}
          /> */}
          <QRCodeComponent address={address as string} />
        </div>
        <div className="border-2 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Wallet Address</p>
          <div className="flex w-full justify-between items-center">
            <p className="text-lg">{address as string}</p>
            <CopyToClipboard text={address as string} />
          </div>
        </div>
        <div className="bg-green-100 rounded-lg p-3 my-4">
          <p className="text-sm text-muted-foreground flex gap-3 items-center">
            <CircleHelp className="fill-muted-foreground text-green-100" />
            Only send MAIZE (SMAZ) commodity to this wallet address
          </p>
        </div>
        <Button
          className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-background hover:bg-white border border-transparent hover:border-gray-800 text-gray-600 hover:text-gray-800 rounded-lg"
          onClick={showModal.onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn(showModal.isOpen ? "flex" : "hidden")}>
      <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[70] outline-none focus:outline-none bg-neutral-800/70 max-h-screen">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
          {/*content*/}
          <div
            className={`translate duration-300 h-full ${
              showModal.isOpen ? "translate-y-0" : "translate-y-full"
            } ${showModal.isOpen ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="
              translate h-auto border-0 rounded-2xl overflow-hidden shadow-lg relative flex flex-col 
              w-full bg-white outline-none focus:outline-none"
            >
              {/*header*/}
              <div className="flex items-center justify-center relative">
                {/* <div className="text-lg font-semibold">{title}</div> */}

                <div className="flex justify-between items-center w-full transition-all duration-500">
                  <p
                    className={cn(
                      "flex justify-center items-center p-4 w-full hover:cursor-pointer",
                      activeTab === Tabs.SEND
                        ? "rounded-none bg-white"
                        : activeTab !== Tabs.RECEIVE
                        ? "rounded-none bg-gray-200"
                        : "bg-gray-200 rounded-br-2xl"
                    )}
                    onClick={() => {
                      setActiveTab(Tabs.SEND);
                      receiveModalStore.onClose();
                      sendModalStore.onOpen();
                    }}
                  >
                    Send
                  </p>
                  <p
                    className={cn(
                      "flex justify-center items-center p-4 w-full hover:cursor-pointer",
                      activeTab === Tabs.RECEIVE
                        ? "rounded-none bg-white"
                        : activeTab === Tabs.SEND
                        ? "rounded-br-2xl bg-gray-200"
                        : "bg-gray-200 rounded-bl-2xl"
                    )}
                    onClick={() => {
                      setActiveTab(Tabs.RECEIVE);
                      sendModalStore.onClose();
                      receiveModalStore.onOpen();
                    }}
                  >
                    Receive
                  </p>
                </div>
              </div>
              <div className="relative p-4 flex-auto">{bodyContent}</div>
              {/* {footer} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
