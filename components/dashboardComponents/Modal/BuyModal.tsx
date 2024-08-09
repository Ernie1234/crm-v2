"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import * as z from "zod";

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
import { useBuyModalStore } from "@/hooks/use-buy-store";
import Modal from "./Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getCommodityName } from "@/actions/commodity";
import { formatPrice, maskNumber } from "@/utils/fnLib";
import { buyModalSchema } from "@/utils/schema";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { IBuy } from "@/utils/types";

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

interface Props {
  commodity: IBuy[] | undefined;
}

export default function BuyModal({ commodity }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const modalStore = useBuyModalStore();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const user = useCurrentUser();
  const email = user?.email;

  const form = useForm<z.infer<typeof buyModalSchema>>({
    resolver: zodResolver(buyModalSchema),
  });

  const formState = form.watch(["commodityName", "quantity", "cardNumber"]);

  const quantity = commodity?.find((value) => {
    return value.name === formState[0];
  });
  const min = quantity?.minQuantity;
  const max = quantity?.maxQuantity;
  const unit = quantity?.unit;
  const price = quantity && quantity?.price.at(-1)?.price;
  const charge = 311;
  const totalPrice = price && formatPrice(Number(formState[1]) * price ?? 1);

  const onOpenChange = () => {
    setOpen((prev) => !prev);
  };

  const actionLabel = useMemo(() => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      return "Continue";
    }
    if (selectedStep === STEPS.SELECT_PAYMENT) {
      return "Next";
    }
    return "Buy Now";
  }, [selectedStep]);

  async function onSubmit(values: z.infer<typeof buyModalSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify({ ...values, totalPrice, email, unit }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      setData(data.success);
      modalStore.onClose();
      onOpenChange();
    } catch (error: any) {
      toast({
        description: error,
        variant: "destructive",
      });
    }
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
                    <FormLabel className="text-base text-gray-700">
                      Commodity Wallet
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3 h-12">
                          <SelectValue placeholder="Select a commodity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[100]">
                        {commodity?.map((item) => {
                          const comPrice = item.price.at(-1)?.price;
                          return (
                            <SelectItem key={item.name} value={item.name}>
                              <div className="flex items-center gap-4 uppercase">
                                <span className="text-xl font-medium">
                                  {item.name}
                                </span>
                                <span className="font-semibold text-muted-foreground">
                                  {item.unit.replace("per ", "")}
                                </span>
                                <span className="font-semibold text-gray-800 py-0.5 px-2.5 bg-green-100 rounded-full ml-8 flex justify-center items-center text-lg">
                                  <TbCurrencyNaira size={20} />
                                  {comPrice && formatPrice(comPrice)}
                                </span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-gray-700 flex justify-between items-center gap-3">
                      <span className="">{min}</span>
                      <span className="">{formState[1]}</span>
                      {max}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="p-3 placeholder:text-lg w-full h-2 bg-green-200 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                        placeholder="Enter Quantity"
                        {...field}
                        type="range"
                        min={min || 1}
                        max={max || 10}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-gray-700">
                      Payment Method
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3 h-12">
                          <SelectValue
                            className="text-lg"
                            placeholder="Select payment method"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[100]">
                        <SelectItem className="text-lg uppercase" value="USSD">
                          USSD
                        </SelectItem>
                        <SelectItem className="text-lg uppercase" value="CARD">
                          CARD
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
              <div className="flex flex-col my-5 border rounded-xl">
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Wallet</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[0]}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Amount Bought</p>
                  <p className="text-lg font-medium text-gray-700">
                    N {totalPrice && totalPrice + charge}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">You recieve</p>
                  <p className="text-lg font-medium text-gray-700">
                    {/* N {price && formatPrice(Number(formState[1]) * price ?? 1)} */}
                    {formState[1]} {unit && unit.replace("per ", "")}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Fee/Charges</p>
                  <p className="text-lg font-medium text-gray-700">
                    N {charge}
                  </p>
                </div>

                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Rate</p>
                  <p className="text-lg font-medium text-gray-700">
                    N{price && formatPrice(price)}/
                    {unit && unit.replace("per ", "")}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[2] && maskNumber(Number(formState[2]))}
                  </p>
                </div>
              </div>
              <Button
                className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Buy Now"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );

  return (
    <>
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
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-2 py-4">
            <h5 className="text-3xl font-medium text-center">Yay! 🎉</h5>
            <p className="text-center text-xl -mb-2">
              Your transaction is on the way
            </p>
            <p className="text-center">{data && data}</p>
            <div className="flex justify-center items-center -mb-5 mt-2">
              <Link
                href="/dashboard/transaction"
                onClick={onOpenChange}
                className="rounded-full text-green-700 font-medium border-green-700 px-12 py-2 hover:bg-green-700 hover:text-white transition-all duration-500 border"
                type="submit"
              >
                View details
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
