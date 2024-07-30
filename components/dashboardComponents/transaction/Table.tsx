"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Table as TransactionTable,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TransactionRow from "./TransactionRow";
import { TTransactionData } from "@/utils/types";
import { ChevronsUpDown } from "lucide-react";

enum Tabs {
  BOUGHT,
  WITHDRAWAL,
  SOLD,
  SWAP,
}

interface Props {
  transaction: TTransactionData[];
}

export default function Table({ transaction }: Props) {
  const [activeTab, setActiveTab] = useState(Tabs.BOUGHT);

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="flex justify-between items-center w-full transition-all duration-500">
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.BOUGHT
              ? "rounded-none bg-white"
              : activeTab !== Tabs.WITHDRAWAL
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.BOUGHT)}
        >
          Commodity Bought
        </p>
      </div>
      <div className="rounded-2xl bg-white">
        <TransactionTable>
          <TableHeader>
            <TableRow>
              <TableHead className="flex gap-1 items-center">
                Date <ChevronsUpDown size={18} />
              </TableHead>
              <TableHead>Commodity Wallet</TableHead>
              <TableHead>Amount bought</TableHead>
              <TableHead>Quantity receive</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="px-8">
            {transaction.map((item) => {
              return (
                <TransactionRow
                  id={item.id}
                  key={item.id}
                  name={item.commodityName}
                  date={item.createdAt}
                  price={item.price}
                  quantity={item.quantity}
                  status={item.status}
                />
              );
            })}
          </TableBody>
        </TransactionTable>
      </div>
    </div>
  );
}
