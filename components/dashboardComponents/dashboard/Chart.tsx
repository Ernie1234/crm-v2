"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TPortfolioCommodity } from "@/utils/types";

interface Props {
  portfolio: TPortfolioCommodity[];
  adjust?: boolean;
}

const chartConfig = {
  balance: {
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Chart({ portfolio, adjust }: Props) {
  return (
    <>
      {adjust ? (
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
            {/* <YAxis /> */}

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
      ) : (
        <ResponsiveContainer>
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
        </ResponsiveContainer>
      )}
    </>
  );
}
