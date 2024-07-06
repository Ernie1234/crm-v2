"use client";
import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

interface Portfolio {
  id: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  commodityId: string;
}

interface PortfolioChartProps {
  data: Portfolio[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  const chartRef = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("Portfolio-chart") as HTMLCanvasElement;
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.id),
        datasets: [
          {
            label: "Price",
            data: data.map((item) => item.price),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Portfolio Prices",
          },
        },
      },
    } as ChartConfiguration<"bar">);

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  return <canvas id="Portfolio-chart" />;
};

export default PortfolioChart;
