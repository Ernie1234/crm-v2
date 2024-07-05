import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineShowChart } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsChevronExpand } from "react-icons/bs";

import { Separator } from "@/components/ui/separator";
import { getCommodityById } from "@/actions/commodity";
import { formatPrice } from "@/utils/fnLib";
import Nav from "@/components/dashboardComponents/Nav";
import AboutCommodity from "@/components/dashboardComponents/commodity/AboutCommodity";
import serverCurrentUser from "@/app/_components/serverCurrentUser";
import EditCommodity from "@/components/dashboardComponents/commodity/EditCommodity";

export default async function page({
  params,
}: {
  params: { commodityId: string };
}) {
  const id = params.commodityId;
  const user = await serverCurrentUser();
  const role = user?.role;
  const commodity = await getCommodityById(id);

  const comPrice = commodity && commodity?.price.at(-1)?.price;
  const unitQty = commodity && commodity?.maxQuantity / commodity?.minQuantity;

  return (
    <div className="w-full h-dvh">
      <Nav header="Commodity Market" />
      <div className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <div className="flex justify-between items-center mb-5">
          <Link
            href="/dashboard/commodity"
            className="flex items-center gap-2 font-semibold"
          >
            <IoChevronBack size={22} />
            Back
          </Link>
          <EditCommodity role={role} name={commodity?.name} price={comPrice} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            <div className="rounded-2xl border-2 bg-background w-full flex flex-col gap-1 p-4">
              <h3 className="font-bold text-xs uppercase text-gray-500">
                {commodity?.name}
              </h3>
              <div className="flex justify-between items-center gap-8">
                <div className="flex gap-3 justify-center items-center">
                  <p className="text-3xl font-bold flex items-center justify-center">
                    <TbCurrencyNaira size={34} />
                    <span className="">
                      {comPrice && formatPrice(comPrice)}
                    </span>
                  </p>
                  <div className="flex">
                    <MdOutlineShowChart size={24} className="fill-green-500" />
                    {/* TODO: CALL THE AVERAGE */}
                  </div>
                </div>
                buttons here
              </div>
              <p className="font-semibold text-muted-foreground">
                {unitQty} Unit{unitQty && (unitQty > 1 ? "s" : "")}
              </p>
              <Separator className="my-4 bg-gray-300 h-[1.5px]" />
              <div className="flex justify-between min-h-min h items-center text-sm">
                <div className="flex flex-col justify-center w-full">
                  <p className="text-3xl uppercase font-semibold">
                    {commodity?.name}
                  </p>
                  <span className="text-lg text-left text-muted-foreground uppercase font-semibold">
                    smaz
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center w-full border-x-2 border-gray-300">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground">
                      Market Price
                    </span>
                    <div className="flex items-center text-left w-full">
                      <TbCurrencyNaira size={30} />
                      <span className="text-2xl font-semibold">
                        {comPrice && formatPrice(comPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full border-r-2 border-gray-300">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground">
                      Unit
                    </span>
                    <div className="flex items-center text-left w-full">
                      <span className="text-2xl font-semibold capitalize">
                        {commodity?.unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="flex flex-col items-start">
                    <span className="text-lg text-left text-muted-foreground flex items-center gap-1.5">
                      <AiOutlineClockCircle />
                      24h change
                      <BsChevronExpand />
                    </span>
                    <div className="flex items-center text-left w-full">
                      <span className="text-2xl font-semibold capitalize">
                        {/* TODO: CALL THE AVERAGE INCREASE */}
                        520.80 +1.25%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AboutCommodity
              name={commodity?.name}
              desc={commodity?.description}
            />
          </div>
          <div className="bg-violet-500 p-5 col-span-1"></div>
        </div>
      </div>
    </div>
  );
}
