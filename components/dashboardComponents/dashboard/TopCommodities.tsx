import { getAllCommodities } from "@/actions/commodity";
import TopComCard from "./TopComCard";
import { calculatePercentageChange } from "@/utils/fnLib";

export default async function TopCommodities() {
  const commodity = await getAllCommodities();

  const filterdComm = commodity && commodity?.slice(0, 4);

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-lg text-black font-medium capitalize">
        Top commodities
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {filterdComm.map((item) => {
          const comPrice = item.price.at(-1)?.price;
          const comUnit = item.unit.replace("per ", "");
          const lastPrice = item.price.slice(-2).map((item) => item.price);
          const avgPrice = calculatePercentageChange(lastPrice);
          return (
            <TopComCard
              key={item.id}
              name={item.name}
              price={comPrice}
              unit={comUnit}
              priceList={item.price}
              avgPrice={avgPrice}
            />
          );
        })}
      </div>
    </div>
  );
}
