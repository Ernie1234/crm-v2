"use client";

import { Separator } from "@/components/ui/separator";
import { TbCurrencyNaira } from "react-icons/tb";

export default function EmptyPortfolio() {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg border border-gray-200 h-full">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium">Portfolio Balance</p>
        <div className="flex gap-3">
          <p className="">1 d</p>
          <p className="">All time</p>
        </div>
      </div>
      <h4 className="font-bold flex items-center">
        <TbCurrencyNaira size={24} />
        <span className="text-xl">0</span>
      </h4>

      <div className="flex flex-col gap-9 mt-8">
        <Separator />
        <Separator />
        <Separator />
        <Separator />
        <Separator />
      </div>
    </div>
  );
}
