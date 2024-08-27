"use client";

import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, MoveDown } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { useBuyModalStore } from "@/hooks/use-buy-store";
import Modal from "./Modal";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { formatPrice, maskNumber } from "@/utils/fnLib";
import { schema } from "@/utils/schema";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { IBuy } from "@/utils/types";
import Payment from "@/components/Paystack/Payment";
import { usePaystackPayment } from "react-paystack";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction } from "@/actions/transaction";

enum Tabs {
  BUY,
  SELL,
  SWAP,
}
enum STEPS {
  SELECT_INITIAL = 0,
  SELECT_DETAILS = 1,
}

interface Props {
  commodity: IBuy[] | undefined;
}
const apiKey = process.env.NEXT_PUBLIC_PAYSTACK_API_KEY as string;

export default function BuyModal({ commodity }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const modalStore = useBuyModalStore();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const email = user?.email as string;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: "1",
    },
  });

  const formState = form.watch(["commodityName", "quantity"]);

  const quantity = commodity?.find((value) => {
    return value.name === formState[0];
  });
  const min = quantity?.minQuantity;
  const max = quantity?.maxQuantity;
  const unit = quantity?.unit;
  const price = quantity && quantity?.price.at(-1)?.price;
  const charge = 311;
  const totalPrice = price && formatPrice(Number(formState[1]) * price ?? 1);
  const payPrice = price && Number(formState[1]) * price + charge;
  const amount = payPrice && payPrice * 100;

  const onOpenChange = () => {
    setOpen((prev) => !prev);
  };

  const actionLabel = useMemo(() => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      return "Continue";
    }
    return "Buy Now";
  }, [selectedStep]);

  async function onSubmit(values: z.infer<typeof schema>) {
    // Perform some action with the form data
    console.log(values);
    setShowPreview(true);
    if (selectedStep !== STEPS.SELECT_DETAILS)
      return setSelectedStep((prev) => prev + 1);
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

  const handleBuy = () => {
    setLoading(true);

    startTransition(() => {
      createTransaction({
        commodityName: formState[0],
        quantity: Number(formState[1]),
        unit: unit as string,
        price: payPrice as number,
      }).then((data) => {
        if (data?.error) {
          toast({
            description: data.error,
            variant: "destructive",
          });
        } else {
          setLoading(false);
          setData(data?.success as string);
          modalStore.onClose();
          onOpenChange();
        }
      });
    });
  };

  const onSuccess = (reference: any) => {
    handleBuy();
    console.log(reference.status);
  };

  const onClose = () => {
    // Handle payment close
    console.log("Payment closed");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount),
    publicKey: apiKey,
  };

  const initializePayment = usePaystackPayment(config);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {!showPreview || selectedStep === STEPS.SELECT_INITIAL ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <div>
                <label
                  htmlFor="quantity"
                  className="text-base text-gray-700 flex justify-between items-center gap-3"
                >
                  <span>{min}</span>
                  <span>{formState[1]}</span>
                  <span>{max}</span>
                </label>
                <input
                  id="quantity"
                  type="range"
                  {...form.register("quantity", { min, max })}
                  className="block w-full px-3 py-1.5 placeholder:text-lg bg-green-200 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                  placeholder="Enter Quantity"
                  min={min}
                  max={max}
                  step={1}
                />
                {form.formState.errors.quantity && (
                  <p className="text-red-500">
                    {form.formState.errors.quantity.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
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
            </form>
          </Form>
        </>
      ) : (
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-center gap-3">
            <ArrowLeft onClick={onBack} />
            <p className="text-2xl text-center font-medium">review Details</p>
            <span></span>
          </div>
          <div className="w-full flex flex-col justify-center items-center my-5">
            <div className="p-3 rounded-full bg-[#EFFECE]">
              <MoveDown size={28} />
            </div>
            <p className="text-lg font-medium">Buy Commodity</p>
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
                N {payPrice && formatPrice(Number(payPrice))}
              </p>
            </div>
            <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
              <p className="text-muted-foreground">You receive</p>
              <p className="text-lg font-medium text-gray-700">
                {/* N {price && formatPrice(Number(formState[1]) * price ?? 1)} */}
                {formState[1]} {unit && unit.replace("per ", "")}
              </p>
            </div>
            <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
              <p className="text-muted-foreground">Fee/Charges</p>
              <p className="text-lg font-medium text-gray-700">N {charge}</p>
            </div>

            <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
              <p className="text-muted-foreground">Rate</p>
              <p className="text-lg font-medium text-gray-700">
                N{price && formatPrice(price)}/
                {unit && unit.replace("per ", "")}
              </p>
            </div>
          </div>
          <button
            className="p-4 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
            onClick={() => {
              initializePayment({ onSuccess, onClose });
            }}
          >
            Buy now
          </button>
        </div>
      )}
      {/* </form>
      </Form> */}
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
