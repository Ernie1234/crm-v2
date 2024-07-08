"use client";

import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { useBuyModalStore } from "@/hooks/use-buy-store";

interface IBuyModal {}

enum Tabs {
  BUY,
  SELL,
  SWAP,
}

enum STEPS {
  SELECT_INITIAL = 0,
  SELECT_PAYMENT,
  SELECT_DETAILS,
}

export default function BuyModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const modalStore = useBuyModalStore();

  const actionLabel = useMemo(() => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      return "Continue";
    }
    if (selectedStep === STEPS.SELECT_PAYMENT) {
      return "Next";
    }
    return "Buy Now";
  }, [selectedStep]);

  const onSubmit = () => {
    console.log("testing submission");
  };

  const onBack = () => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      undefined;
    }
    setSelectedStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (selectedStep !== STEPS.SELECT_DETAILS)
      return setSelectedStep((prev) => prev + 1);

    return onSubmit();
  };

  const bodyContent = <div className="flex flex-col gap-4">buy modal</div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalStore.isOpen}
      onClose={modalStore.onClose}
      actionLabel={actionLabel}
      onSubmit={onNext}
      secondaryActionLabel={
        selectedStep !== STEPS.SELECT_INITIAL ? "" : "Cancel"
      }
      secondaryAction={
        selectedStep === STEPS.SELECT_INITIAL ? modalStore.onClose : onBack
      }
      body={bodyContent}
      tab={Tabs.BUY}
    />
  );
}
