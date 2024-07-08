import { TbCurrencyNaira } from "react-icons/tb";
import PortfolioChart from "./PortfolioChart";
import { getAllCommodities } from "@/actions/commodity";
import Chart from "./Chart";

export default async function PortfolioBalance() {
  //   const commodity = await getAllCommodities();
  //   const comPrice =
  //     commodity &&
  //     commodity.map((item) => {
  //       return item.price;
  //     });
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg border border-gray-200 h-full">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium">Portfolio Balance</p>
        <div className="">
          <p className="">1 w</p>
        </div>
      </div>
      <h4 className="font-bold flex items-center">
        <TbCurrencyNaira size={24} />
        <span className="text-xl">0</span>
      </h4>
      {/* <PortfolioChart data={comPrice} /> */}
      <Chart />
    </div>
  );
}
