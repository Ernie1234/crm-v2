import { ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import Empty from "./Empty";
import { TPortfolioCommodity } from "@/utils/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PortfolioRow from "../portfolio/PortfolioRow";

interface Props {
  portfolio:
    | TPortfolioCommodity[]
    | {
        error: string;
      }
    | undefined;
}

export default function YourCommodity({ portfolio }: Props) {
  if (!Array.isArray(portfolio)) return <p>Error fetching portfolio here.</p>;
  // if (portfolio?.error) return <p>Error fetching portfolio here.</p>;
  if (portfolio?.length === 0)
    return (
      <div className="bg-white p-4 border border-gray-200 h-full shadow-sm rounded-xl">
        <div className="flex w-full justify-center items-center">
          <Empty
            title="No commodities"
            subtitle="Your commodities will appear here"
            showBtn
            btnTitle="Explore Commodity"
          />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg text-black font-medium">Your commodities</p>
        <Link href="/dashboard/commodity">
          <button className="text-white font-semibold px-6 py-2 rounded-full bg-green-800 hover:bg-green-600 flex gap-2">
            <Plus /> Add New
          </button>
        </Link>
      </div>
      <div className="shadow-sm">
        {portfolio?.length === 0 ? (
          <div className="bg-white p-4 border border-gray-200 h-full shadow-sm rounded-xl">
            <div className="flex w-full justify-center items-center">
              <Empty
                title="No commodities"
                subtitle="Your commodities will appear here"
                showBtn
                btnTitle="Explore Commodity"
              />
            </div>
          </div>
        ) : (
          <div className="mt-0 border rounded-2xl bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex gap-2 justify-start items-center">
                    Commodity <ChevronsUpDown size={18} />
                  </TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="flex gap-2 justify-start items-center">
                    7d %
                    <ChevronsUpDown size={18} />
                  </TableHead>
                  <TableHead>Chart</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="px-8">
                {portfolio.map((commodity, index) => {
                  return (
                    <PortfolioRow
                      id={commodity.id}
                      index={index}
                      price={commodity.balance}
                      quantity={commodity.totalQuantity}
                      name={commodity.commodityName}
                      key={index}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
