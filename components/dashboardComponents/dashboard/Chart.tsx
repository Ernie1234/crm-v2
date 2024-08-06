"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TPortfolioCommodity } from "@/utils/types";
import { format } from "date-fns";
// const chartData = [
//   { month: "January", price: 18.6 },
//   { month: "February", price: 30.5 },
//   { month: "March", price: 23.7 },
//   { month: "April", price: 7.3 },
//   { month: "May", price: 20.9 },
//   { month: "June", price: 21.4 },
// ];
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
    <Card>
      {/* <Card className="max-h-60 overflow-y-auto"> */}
      <CardContent>
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
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                format(new Date(value), "MMM d, yyyy h:mm a")
              }
            />
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
      </CardContent>
    </Card>
  );
}
