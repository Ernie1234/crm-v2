"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TPortfolioCommodity } from "@/utils/types";
import { Item } from "@radix-ui/react-select";
import { formatPrice } from "@/utils/fnLib";
import { TbCurrencyNaira } from "react-icons/tb";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface Props {
  portfolio: TPortfolioCommodity[];
}
// fill: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,

export function PortChart({ portfolio }: Props) {
  const data = portfolio.map((item) => {
    const list = {
      browser: item.commodityName,
      visitors: item.balance,
      fill: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
    };
    return list;
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-left pb-0">
        <CardTitle>Portfolio Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none flex-col w-full">
          {portfolio.map((item) => (
            <div
              className="flex items-center justify-between w-full"
              key={item.id}
            >
              <div className="flex gap-1">
                <p className="uppercase">{item.commodityName}</p>
                <span className="text-muted-foreground">(TON)</span>
              </div>
              <p className="flex justify-center items-center">
                <TbCurrencyNaira size={18} />
                <span className="">
                  {item.balance && formatPrice(item.balance)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
