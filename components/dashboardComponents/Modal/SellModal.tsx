"use client";

import Link from "next/link";
import { TbCurrencyNaira } from "react-icons/tb";
import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, MoveUp } from "lucide-react";
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

import { useSellModalStore } from "@/hooks/use-sell-store";
import Modal from "./Modal";
import { sellModalSchema } from "@/utils/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TPortfolioCommodity } from "@/utils/types";
import { formatPrice } from "@/utils/fnLib";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { sellCommodity } from "@/actions/sell-commodity";

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
  portfolioCommodity: TPortfolioCommodity[];
}

export default function SellModal({ portfolioCommodity }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<string | undefined>("");
  const [selectedStep, setSelectedStep] = useState(STEPS.SELECT_INITIAL);
  const sellModalStore = useSellModalStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof sellModalSchema>>({
    resolver: zodResolver(sellModalSchema),
  });

  const formState = form.watch([
    "amount",
    "commodityName",
    "bank",
    "acctNumber",
  ]);

  const charge = 311;
  const AmountReceive = formState[0] && Number(formState[0]) - charge;

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
    return "Sell Now";
  }, [selectedStep]);

  async function onSubmit(values: z.infer<typeof sellModalSchema>) {
    startTransition(() => {
      sellCommodity(values).then((data) => {
        if (data?.error) {
          toast({
            description: data.error,
            variant: "destructive",
          });
        } else {
          console.log(data.success);
          setData(data.success);
          sellModalStore.onClose();
          onOpenChange();
        }
      });
    });
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
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Amount to withdraw
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
                    "w-full bg-green-200 rounded-b-md px-2 py-1 flex justify-between items-center",
                    formState[0]
                  )}
                >
                  <span className="text-sm leading-none">
                    Amount you{"'"}ll receive
                  </span>
                  <p className="">{Number(formState[0]) - charge} NGN</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="bankAcct"
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
                        <SelectItem
                          className="text-lg uppercase"
                          value="savings"
                        >
                          Savings
                        </SelectItem>
                        <SelectItem
                          className="text-lg uppercase"
                          value="current"
                        >
                          Current
                        </SelectItem>
                        <SelectItem className="text-lg uppercase" value="fixed">
                          Fixed
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
                  disabled={isPending}
                  onClick={onNext}
                >
                  Continue
                </Button>

                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-background hover:bg-white border border-transparent hover:border-gray-800 text-gray-600 hover:text-gray-800 rounded-full"
                  disabled={isPending}
                  onClick={sellModalStore.onClose}
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
                  Add Bank Account
                </p>
                <span></span>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Select Bank
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
                          <SelectItem
                            className="text-lg uppercase"
                            value="access"
                          >
                            Access Bank
                          </SelectItem>
                          <SelectItem
                            className="text-lg uppercase"
                            value="union"
                          >
                            Union Bank
                          </SelectItem>
                          <SelectItem
                            className="text-lg uppercase"
                            value="fixed"
                          >
                            Fixed
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acctNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Bank Account number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="p-3 placeholder:text-lg"
                          placeholder="Enter bank account number"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center items-center gap-2 w-full mt-8">
                <Button
                  className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                  disabled={isPending}
                  onClick={onNext}
                >
                  Add Bank Account
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
              <div className="w-full flex flex-col justify-center items-center my-5">
                <div className="p-3 rounded-full bg-[#EFFECE]">
                  <MoveUp size={28} />
                </div>
                <p className="text-lg font-medium">Sell Commodity</p>
              </div>
              <div className="flex flex-col my-5 border rounded-xl">
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Wallet</p>
                  <p className="text-lg font-medium text-gray-700">
                    {formState[1]}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Amount Bought</p>
                  <p className="text-lg font-medium text-gray-700">
                    {Number(formState[0])}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">You receive</p>
                  <p className="text-lg font-medium text-gray-700">
                    {AmountReceive}
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
                    {/* N{price && formatPrice(price)}/
                    {unit && unit.replace("per ", "")} */}
                  </p>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-200 last:border-b-0">
                  <p className="text-muted-foreground">Bank account</p>
                  <p className="text-lg font-medium capitalize text-gray-700">
                    {formState[2]}, {formState[3]}
                  </p>
                </div>
              </div>

              <Button
                className="p-6 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Confirm and Sell"}
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
        disabled={isPending}
        isOpen={sellModalStore.isOpen}
        onClose={sellModalStore.onClose}
        actionLabel={actionLabel}
        onSubmit={() => onNext()}
        secondaryActionLabel={
          selectedStep !== STEPS.SELECT_INITIAL ? "" : "Cancel"
        }
        secondaryAction={
          selectedStep === STEPS.SELECT_INITIAL
            ? sellModalStore.onClose
            : onBack
        }
        body={bodyContent}
        tab={Tabs.SELL}
      />
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-2 py-4">
            <h5 className="text-3xl font-medium text-center">Yay! 🎉</h5>
            <p className="text-center text-xl -mb-2">Sold Successfully</p>
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
