"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { relative } from "path";

interface IModal {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  tab: Tabs;
}

enum Tabs {
  BUY,
  SELL,
  SWAP,
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  tab,
}: IModal) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <div className={cn(isOpen ? "flex" : "hidden")}>
      <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none bg-neutral-800/70 max-h-screen">
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
                      activeTab === Tabs.BUY
                        ? "rounded-none bg-white"
                        : activeTab !== Tabs.SELL
                        ? "rounded-none bg-gray-200"
                        : "bg-gray-200 rounded-br-2xl"
                    )}
                    onClick={() => setActiveTab(Tabs.BUY)}
                  >
                    Buy
                  </p>
                  <p
                    className={cn(
                      "flex justify-center items-center p-4 w-full hover:cursor-pointer",
                      activeTab === Tabs.SELL
                        ? "rounded-none bg-white"
                        : activeTab === Tabs.SWAP
                        ? "rounded-br-2xl bg-gray-200"
                        : "bg-gray-200 rounded-bl-2xl"
                    )}
                    onClick={() => setActiveTab(Tabs.SELL)}
                  >
                    Sell
                  </p>
                  <p
                    className={cn(
                      "flex justify-center items-center p-4 w-full hover:cursor-pointer",
                      activeTab === Tabs.SWAP
                        ? "rounded-none bg-white"
                        : activeTab !== Tabs.SELL
                        ? "bg-gray-200 rounded-bl-none"
                        : "bg-gray-200 rounded-bl-2xl"
                    )}
                    onClick={() => setActiveTab(Tabs.SWAP)}
                  >
                    Swap
                  </p>
                </div>
              </div>
              {/*body*/}
              <div className="relative p-4 flex-auto bg-red-400">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col items-center gap-4 w-full">
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                    round="round-full"
                  />
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      outline
                      round="round-full"
                    />
                  )}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
