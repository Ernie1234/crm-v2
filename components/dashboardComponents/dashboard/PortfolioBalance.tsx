import { TbCurrencyNaira } from "react-icons/tb";
import Chart from "./Chart";
import { portfolioCommodity } from "@/actions/portfolio";
import { formatPrice } from "@/utils/fnLib";

interface Props {
  adjust?: boolean;
}

export default async function PortfolioBalance({ adjust }: Props) {
  const portfolio = await portfolioCommodity();
  // console.log(portfolio);

  if (!Array.isArray(portfolio)) return <p>Error fetching portfolio.</p>;
  if (portfolio.length === 0) return <p>No portfolio found.</p>;

  const balance = portfolio.reduce((acc, price) => acc + price.balance, 0);

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-lg border border-gray-200 h-full">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium">Portfolio Balance</p>
        <div className="">
          <p className="">1 d</p>
        </div>
      </div>
      <h4 className="font-bold flex items-center">
        <TbCurrencyNaira size={24} />
        <span className="text-xl">{balance && formatPrice(balance)}</span>
      </h4>
      {/* <PortfolioChart data={comPrice} /> */}
      <Chart portfolio={portfolio} adjust={adjust} />
    </div>
  );
}
