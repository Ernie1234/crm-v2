"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getCommodityByName } from "@/actions/commodity";
import { TCommodity } from "@/utils/types";

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  commodityName: string;
}

type TPrice = {
  id: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  commodityId: string;
};

export function ComChart({ commodityName }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<TPrice[]>([]);
  const [chartColor, setChartColor] = useState<string>("hsl(var(--chart-2))");

  const fetchChartData = async (commodityName: string) => {
    try {
      const res = await getCommodityByName(commodityName);
      if (!res) throw new Error("No data received");
      return res;
    } catch (err) {
      console.error("Error fetching chart data:", err);
      throw err; // Propagate the error
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        const data = await fetchChartData(commodityName);
        setChartData(data.price);
        if (data.price.length >= 2) {
          const lastPrice = data.price[data.price.length - 1].price;
          const secondLastPrice = data.price[data.price.length - 2].price;

          // Set chart color based on the difference
          if (lastPrice > secondLastPrice) {
            setChartColor("hsl(var(--color-green))"); // Price increased
          } else if (lastPrice < secondLastPrice) {
            setChartColor("hsl(var(--color-red))"); // Price decreased
          } else {
            setChartColor("hsl(var(--color-neutral))"); // No change
          }
        }
      } catch (err) {
        setError("Failed to fetch chart data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [commodityName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ChartContainer
      config={{
        ...chartConfig,
        mobile: { ...chartConfig.mobile, color: chartColor },
      }}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke={chartColor}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
    //   </CardContent>
    // </Card>
  );
}
