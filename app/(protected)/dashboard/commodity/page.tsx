import { TbCurrencyNaira } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Nav from "@/components/dashboardComponents/Nav";
import CommodityForm from "@/components/dashboardComponents/commodity/CommodityForm";
import serverCurrentUser from "@/app/_components/serverCurrentUser";
import { getAllCommodities } from "@/actions/commodity";
import { formatPrice } from "@/utils/fnLib";
import Link from "next/link";
import Row from "@/components/dashboardComponents/commodity/Row";

export default async function page() {
  const user = await serverCurrentUser();
  const role = user?.role;

  const commodities = await getAllCommodities();

  return (
    <div className="w-full">
      <Nav header="Commodity" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <div className="flex justify-between items-center">
          <h3>search component here</h3>
          {role === "ADMIN" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button>New Commodity</Button>
              </SheetTrigger>
              {/* <SheetContent className="w-full sm:min-w-[70vw]"> */}
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Add new commodity</SheetTitle>
                </SheetHeader>
                <CommodityForm />
              </SheetContent>
            </Sheet>
          )}
        </div>
        {/* Your commodity market goes here */}
        <div className="flex flex-col gap-3 w-full">
          {/* Empty state */}
          {commodities.length === 0 && (
            <div className="mt-16 mx-auto text-xl">No commodity in store</div>
          )}
          {/* Commodity container*/}
          {commodities.length !== 0 && (
            <div className="mt-8 border rounded-2xl bg-white">
              <Table>
                {/* <TableCaption>A list of your recent commodity.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Ranking
                    </TableHead>
                    <TableHead>Commodity Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>7d</TableHead>
                    <TableHead>Chart</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="px-8">
                  {commodities.map((commodity, index) => {
                    const comPrice = commodity.price.at(-1)?.price;

                    return (
                      <Row
                        id={commodity.id}
                        index={index}
                        price={comPrice}
                        description={commodity.description}
                        name={commodity.name}
                        unit={commodity.unit}
                        key={index}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
