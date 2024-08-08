"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TPortfolioCommodity } from "@/utils/types";

interface Props {
  portfolio: TPortfolioCommodity[];
}

const chartConfig = {
  balance: {
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Chart({ portfolio }: Props) {
  return (
    // <Card>
    //   {/* <Card className="max-h-60 overflow-y-auto"> */}
    //   <CardContent>
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={portfolio}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        {/* <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                format(new Date(value), "MMM d, yyyy h:mm a")
              }
            /> */}
        <YAxis />
        {/* <defs>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs> */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          height={20}
          dataKey="balance"
          type="natural"
          fill="var(--color-balance)"
          fillOpacity={0.4}
          stroke="var(--color-balance)"
        />
      </AreaChart>
    </ChartContainer>
    //   </CardContent>
    // </Card>
  );
}
