"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { useSendModalStore } from "@/hooks/use-send-store";
import { useReceiveModalStore } from "@/hooks/use-receive-store";

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

  const showModal = receiveModalStore.isOpen;

  const bodyContent = <div className="flex flex-col gap-4">{}</div>;

  return (
    <div className={cn(showModal ? "flex" : "hidden")}>
      <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[70] outline-none focus:outline-none bg-neutral-800/70 max-h-screen">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
          {/*content*/}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
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
