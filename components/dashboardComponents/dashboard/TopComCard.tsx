"use client";

import { formatPrice } from "@/utils/fnLib";
import { MdOutlineShowChart } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
}

export default function TopComCard({ name, price, unit, priceList }: Props) {
  const chartData = {
    type: "line",
    labels: priceList.map((item) => item.createdAt.toLocaleDateString()),
    datasets: [
      {
        label: "Price",
        data: priceList.slice(0, 7).map((item) => item.price),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between">
        <h4 className="space-x-1 uppercase font-semibold">
          <span className="">{name}</span>
          <span className="text-muted-foreground">({unit})</span>
        </h4>
        <div className="flex space-x-1">
          <MdOutlineShowChart size={24} className="fill-green-500" />
          {/* TODO: CALL THE AVERAGE */}
          <p className={`text-green-500`}>5.04%</p>
        </div>
      </div>
      <div className="flex items-end space-x-2">
        <span className="self-end text-lg font-bold flex items-center">
          <TbCurrencyNaira size={24} />
          <div className="-ml-0.5">{price && formatPrice(price)}</div>
        </span>
        <span className="text-sm pb-1">per unit</span>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
