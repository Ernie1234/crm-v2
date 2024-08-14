"use client";

import Link from "next/link";
import { TbCurrencyNaira } from "react-icons/tb";
import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import * as z from "zod";

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

import Modal from "./Modal";
import { swapModalSchema } from "@/utils/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IBuy, TPortfolioCommodity } from "@/utils/types";
import { formatPrice } from "@/utils/fnLib";
import { cn } from "@/lib/utils";
import { useSwapModalStore } from "@/hooks/use-swap-store";
import { swapCommodity } from "@/actions/swap-commodity";
import { toast } from "@/components/ui/use-toast";

enum Tabs {
  BUY,
  SELL,
  SWAP,
}
enum STEPS {
  SELECT_INITIAL = 0,
  SELECT_DETAILS = 2,
}

interface Props {
  portfolioCommodity: TPortfolioCommodity[];
  commodity: IBuy[] | undefined;
}

export default function SwapModal({ portfolioCommodity, commodity }: Props) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<string | undefined>("");
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const swapModalStore = useSwapModalStore();

  const form = useForm<z.infer<typeof swapModalSchema>>({
    resolver: zodResolver(swapModalSchema),
  });

  const formState = form.watch(["commodityName", "transferTo", "amount"]);

  const onOpenChange = () => {
    setOpen((prev) => !prev);
  };

  const actionLabel = useMemo(() => {
    if (selectedStep === STEPS.SELECT_INITIAL) {
      return "Continue";
    }

    return "Swap Now";
  }, [selectedStep]);

  async function onSubmit(values: z.infer<typeof swapModalSchema>) {
    try {
      console.log(values);
      startTransition(() => {
        swapCommodity(values).then((data) => {
          if (data?.error) {
            toast({
              description: data.error,
              variant: "destructive",
            });
          } else {
            console.log(data.success);
            setData(data?.success);
            swapModalStore.onClose();
            onOpenChange();
          }
        });
      });
    } catch (error: any) {
      console.log(error);
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

  const charge = 311;
  const AmountReceive = formState[2] && Number(formState[2]) - charge;

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
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3 h-12">
                          <SelectValue placeholder="Select a commodity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[100]">
                        {portfolioCommodity?.map((item) => {
                          // const comPrice = item.price.at(-1)?.price;
                          return (
                            <SelectItem
                              key={item.id}
                              value={item.commodityName}
                            >
                              <div className="flex items-center gap-4 uppercase">
                                <span className="text-xl font-medium">
                                  {item.commodityName}
                                </span>
                                <span className="font-semibold text-muted-foreground">
                                  TON
                                </span>
                                <span className="font-semibold text-gray-800 py-0.5 px-2.5 bg-green-100 rounded-full ml-8 flex justify-center items-center text-lg">
                                  <TbCurrencyNaira size={20} />
                                  {formatPrice(item.balance)}
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
                name="transferTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-gray-700">
                      Transfer to
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
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Amount to swap
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="p-3 placeholder:text-xl placeholder:font-semibold rounded-b-none"
                          placeholder="# 0.0"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn(
                    "w-full bg-green-200 rounded-b-md px-2 py-1 flex justify-between items-center"
                  )}
                >
                  <span className="text-sm leading-none">
                    Amount you{"'"}ll receive
                  </span>
                  {/* <p className="">{formState[0]} NGN</p> */}
                </div>
              </div>

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
                  onClick={swapModalStore.onClose}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="h-full w-full flex flex-col">
              <div className="flex justify-between items-center gap-3">
                <ArrowLeft onClick={onBack} />
                <p className="text-2xl text-center font-medium">
                  Review Details
                </p>
                <span></span>
              </div>
              <div className="w-full flex flex-col justify-center items-center my-5">
                <div className="p-3 rounded-full bg-[#EFFECE]">
                  <ArrowUpDown size={28} />
                </div>
                <p className="text-lg font-medium">Swap Commodity</p>
              </div>
              <div className="flex flex-col my-5 border rounded-xl">
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Transfer Wallet</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[0]} (TON)
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Receiving Wallet</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[1]} (TON)
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Amount Swap</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[2] && formatPrice(Number(formState[2]))}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Wallet Receives</p>
                  <p className="text-lg font-medium capitalize text-gray-700">
                    {AmountReceive && formatPrice(AmountReceive)}
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Fee</p>
                  <p className="text-lg font-medium text-gray-700">
                    N {charge}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Rate</p>
                  <p className="text-lg font-medium text-gray-700">
                    {/* N{price && formatPrice(price)}/
                    {unit && unit.replace("per ", "")} */}
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
        isOpen={swapModalStore.isOpen}
        onClose={swapModalStore.onClose}
        actionLabel={actionLabel}
        onSubmit={() => onNext()}
        secondaryActionLabel={
          selectedStep !== STEPS.SELECT_INITIAL ? "" : "Cancel"
        }
        secondaryAction={
          selectedStep === STEPS.SELECT_INITIAL
            ? swapModalStore.onClose
            : onBack
        }
        body={bodyContent}
        tab={Tabs.SELL}
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
