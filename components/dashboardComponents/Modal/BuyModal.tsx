"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Modal from "./Modal";
import { useBuyModalStore } from "@/hooks/use-buy-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface IBuyModal {}

enum Tabs {
  BUY,
  SELL,
  SWAP,
}
enum STEPS {
  SELECT_INITIAL = 0,
  SELECT_PAYMENT = 1,
  SELECT_DETAILS = 2,
}
const buyModalSchema = z.object({
  commodityName: z.string(),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  expiryDate: z.string(),
  cvc: z.string(),
});

export default function BuyModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const modalStore = useBuyModalStore();

  const form = useForm<z.infer<typeof buyModalSchema>>({
    resolver: zodResolver(buyModalSchema),
    defaultValues: {
      commodityName: "",
    },
  });

  const actionLabel = useMemo(() => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      return "Continue";
    }
    if (selectedStep === STEPS.SELECT_PAYMENT) {
      return "Next";
    }
    return "Buy Now";
  }, [selectedStep]);

  function onSubmit(values: z.infer<typeof buyModalSchema>) {
    console.log(values);
  }

  const onBack = () => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      undefined;
    }
    setSelectedStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (selectedStep !== STEPS.SELECT_DETAILS)
      return setSelectedStep((prev) => prev + 1);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {selectedStep === STEPS.SELECT_INITIAL ? (
            <>
              <FormField
                control={form.control}
                name="commodityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commodity Wallet</FormLabel>
                    <FormControl>
                      <Input placeholder="Maize" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-center gap-2 w-full">
                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                  disabled={isLoading}
                  onClick={onNext}
                >
                  Continue
                </Button>

                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-background hover:bg-white border border-transparent hover:border-gray-800 text-gray-600 hover:text-gray-800 rounded-full"
                  disabled={isLoading}
                  onClick={modalStore.onClose}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : selectedStep === STEPS.SELECT_PAYMENT ? (
            <div className="h-full w-full flex flex-col">
              <div className="flex justify-between items-center gap-3">
                <ArrowLeft onClick={onBack} />
                <p className="text-2xl text-center font-medium">
                  Add Payment method
                </p>
                <span></span>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Card Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="p-3 placeholder:text-lg"
                          placeholder="Enter card number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Card Holder Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="p-3 placeholder:text-lg"
                          placeholder="Enter Card Holder Name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-base text-gray-700">
                          Expiry Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="p-3 placeholder:text-lg"
                            placeholder="MM/YY"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-base text-gray-700">
                          CVC
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="p-3 placeholder:text-lg"
                            placeholder="123"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 w-full mt-8">
                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                  disabled={isLoading}
                  onClick={onNext}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full w-full flex flex-col">
              <div className="flex justify-between items-center gap-3">
                <ArrowLeft onClick={onBack} />
                <p className="text-2xl text-center font-medium">
                  review Details
                </p>
                <span></span>
              </div>
              <div className="flex flex-col my-5 border">
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Wallet</p>
                  <p className="text-lg font-medium text-gray-700">
                    Maize (smz)
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Amount Bought</p>
                  <p className="text-lg font-medium text-gray-700">N 20,000</p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">You recieve</p>
                  <p className="text-lg font-medium text-gray-700">3 smz</p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Fee</p>
                  <p className="text-lg font-medium text-gray-700">N311</p>
                </div>

                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Rate</p>
                  <p className="text-lg font-medium text-gray-700">
                    N10,00/smz
                  </p>
                </div>
              </div>
              <Button
                className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                type="submit"
              >
                Buy Now
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalStore.isOpen}
      onClose={modalStore.onClose}
      actionLabel={actionLabel}
      onSubmit={() => onNext()}
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
