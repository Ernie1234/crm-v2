"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Table as TransactionTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import TransactionRow from "./TransactionRow";
import { TAllTrans } from "@/utils/types";
import { ChevronsUpDown } from "lucide-react";
import SoldTransactionRow from "./SoldTransactionRow";
import { TransactionType } from "@prisma/client";
import SendTransactionRow from "./SendTransactionRow";
import SwapTransactionRow from "./SwapTransactionRow";

enum Tabs {
  BOUGHT,
  WITHDRAWAL,
  SOLD,
  SWAP,
  SEND,
  RECEIVE,
}

interface Props {
  // transaction: TTransactionData[];
  allTrans: TAllTrans[];
}

export default function Table({ allTrans }: Props) {
  const [activeTab, setActiveTab] = useState(Tabs.BOUGHT);

  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === BOUGHT
  const boughtTransactions = allTrans.filter(
    (t) => t.type === TransactionType.BOUGHT
  );
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SOLD
  const soldTransactions = allTrans.filter(
    (t) => t.type === TransactionType.SOLD
  );
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SOLD
  const swapTransactions = allTrans.filter(
    (t) => t.type === TransactionType.SWAP
  );
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === SEND
  const sendTransactions = allTrans.filter(
    (t) => t.type === TransactionType.SEND
  );
  // TO GET ALL TRANSACTIONS THAT HAS THE TYPE === RECEIVED
  const recievedTransactions = allTrans.filter(
    (t) => t.type === TransactionType.RECEIVED
  );

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
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SOLD
              ? "rounded-none bg-white"
              : activeTab !== Tabs.WITHDRAWAL
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SOLD)}
        >
          Withdrawals
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SWAP
              ? "rounded-none bg-white"
              : activeTab !== Tabs.WITHDRAWAL
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SWAP)}
        >
          Commodity swap
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.SEND
              ? "rounded-none bg-white"
              : activeTab !== Tabs.WITHDRAWAL
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.SEND)}
        >
          Sent commodities
        </p>
        <p
          className={cn(
            "flex justify-center items-center p-4 w-full hover:cursor-pointer",
            activeTab === Tabs.RECEIVE
              ? "rounded-none bg-white"
              : activeTab !== Tabs.WITHDRAWAL
              ? "rounded-none bg-gray-200"
              : "bg-gray-200 rounded-br-2xl"
          )}
          onClick={() => setActiveTab(Tabs.RECEIVE)}
        >
          Received commodities
        </p>
      </div>
      {activeTab === Tabs.BOUGHT && (
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
              {boughtTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="w-full text-xl font-semibold py-20 text-center">
                      No bought transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                boughtTransactions.map((item) => {
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
                })
              )}
            </TableBody>
          </TransactionTable>
        </div>
      )}
      {activeTab === Tabs.SWAP && (
        <div className="rounded-2xl bg-white">
          <TransactionTable>
            <TableHeader>
              <TableRow>
                <TableHead className="flex gap-1 items-center">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Transfer Wallet</TableHead>
                <TableHead>Amount swap</TableHead>
                <TableHead>Receiving wallet</TableHead>
                <TableHead>Wallet Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {swapTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="w-full text-xl font-semibold py-20 text-center">
                      No sold transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                swapTransactions.map((item) => {
                  return (
                    <SwapTransactionRow
                      id={item.id}
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      receives={item.quantity}
                      transferTo={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </TransactionTable>
        </div>
      )}
      {activeTab === Tabs.SOLD && (
        <div className="rounded-2xl bg-white">
          <TransactionTable>
            <TableHeader>
              <TableRow>
                <TableHead className="flex gap-1 items-center">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {soldTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="w-full text-xl font-semibold py-20 text-center">
                      No sold transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                soldTransactions.map((item) => {
                  return (
                    <SoldTransactionRow
                      id={item.id}
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                    />
                  );
                })
              )}
            </TableBody>
          </TransactionTable>
        </div>
      )}

      {activeTab === Tabs.SEND && (
        <div className="rounded-2xl bg-white">
          <TransactionTable>
            <TableHeader>
              <TableRow>
                <TableHead className="flex gap-1 items-center">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Recipient Address</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {sendTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="w-full text-xl font-semibold py-20 text-center">
                      No sent transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                sendTransactions.map((item) => {
                  // console.log(sendTransactions.length);
                  return (
                    <SendTransactionRow
                      id={item.id}
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      address={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </TransactionTable>
        </div>
      )}
      {activeTab === Tabs.RECEIVE && (
        <div className="rounded-2xl bg-white">
          <TransactionTable>
            <TableHeader>
              <TableRow>
                <TableHead className="flex gap-1 items-center">
                  Date <ChevronsUpDown size={18} />
                </TableHead>
                <TableHead>Commodity Wallet</TableHead>
                <TableHead>Recipient Address</TableHead>
                <TableHead>Amount Sold</TableHead>
                <TableHead>Amount Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-8">
              {recievedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="w-full text-xl font-semibold py-20 text-center">
                      No received transaction yet!
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                recievedTransactions.map((item) => {
                  return (
                    <SendTransactionRow
                      id={item.id}
                      key={item.id}
                      name={item.commodityName}
                      date={item.createdAt}
                      amount={item.price}
                      status={item.status}
                      address={item.reference}
                    />
                  );
                })
              )}
            </TableBody>
          </TransactionTable>
        </div>
      )}
    </div>
  );
}
