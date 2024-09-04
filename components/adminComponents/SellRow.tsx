"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableCell, TableRow } from "../ui/table";
import { ISellUser } from "@/utils/types";
import { payUser } from "@/actions/admin-transaction";
import { sellerFormSchema } from "@/utils/schema";
import { toast } from "@/components/ui/use-toast";

interface Props {
  item: ISellUser;
  index: number;
}

export default function SellRow({ item, index }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      id: item.id,
      userId: item.userId,
      commodityName: item.commodityName,
    },
  });

  function onSubmit(values: z.infer<typeof sellerFormSchema>) {
    startTransition(() => {
      payUser(values).then((data) => {
        if (data?.error) {
          toast({
            description: data.error,
            variant: "destructive",
          });
        } else {
          toast({
            description: data.success,
            variant: "default",
          });
        }
      });
    });
  }

  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.commodityName}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.accountNumber}</TableCell>
      <TableCell>{item.bank}</TableCell>
      <TableCell>{item.user.firstName || item.user.name}</TableCell>
      <TableCell>{item.user.phoneNumber}</TableCell>
      <TableCell>
        <div
          className={cn(
            "p-1 flex justify-center items-center rounded-lg uppercase text-xs font-semibold",
            item.status === "abandoned"
              ? "bg-rose-100/40 text-rose-700"
              : item.status === "processing"
              ? "bg-yellow-100"
              : item.status === "success" || item.status === "complete"
              ? "bg-green-100 text-green-600"
              : "bg-red-200"
          )}
        >
          {item.status}
        </div>
      </TableCell>
      <TableCell>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading" : "Submit"}
            </Button>
          </form>
        </Form>
      </TableCell>
    </TableRow>
  );
}
