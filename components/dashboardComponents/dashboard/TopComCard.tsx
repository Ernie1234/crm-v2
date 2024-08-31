"use client";

import { formatPrice } from "@/utils/fnLib";
import { MdOutlineShowChart } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";

import { TopComChart } from "./TopComChart";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  price: number | undefined;
  unit: string;
  priceList: {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    commodityId: string;
  }[];
  avgPrice: number;
}

export default function TopComCard({
  name,
  price,
  unit,
  priceList,
  avgPrice,
}: Props) {
  const chartData = priceList.map((item) => {
    return {
      date: item.createdAt.toLocaleDateString(),
      price: item.price,
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between">
        <h4 className="space-x-1 uppercase font-semibold">
          <span className="">{name}</span>
          <span className="text-muted-foreground">({unit})</span>
        </h4>
        <div className="flex space-x-1">
          <MdOutlineShowChart
            size={24}
            className={cn(
              avgPrice < 0
                ? "text-red-400"
                : avgPrice > 0
                ? "text-green-500"
                : "text-neutral-700"
            )}
          />
          <p
            className={cn(
              avgPrice < 0
                ? "text-red-400"
                : avgPrice > 0
                ? "text-green-500"
                : "text-neutral-700"
            )}
          >
            {avgPrice}%
          </p>
        </div>
      </div>
      <div className="flex items-end space-x-2">
        <span className="self-end text-lg font-bold flex items-center">
          <TbCurrencyNaira size={24} />
          <div className="-ml-0.5">{price && formatPrice(price)}</div>
        </span>
        <span className="text-sm pb-1">per unit</span>
      </div>
      <TopComChart chartData={chartData} />
    </div>
  );
}
