import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllSell } from "@/actions/admin-transaction";
import SellRow from "@/components/adminComponents/SellRow";

export default async function Page() {
  const sell = await getAllSell();

  if (!Array.isArray(sell)) return <p>Error fetching sell transactions.</p>;
  if (sell.length === 0) return <p>No sell transactions found.</p>;

  // console.log(sell);

  return (
    <div className="w-full h-full">
      <div className="bg-white border-b flex justify-between items-center gap-3 p-4">
        <p className="text-lg text-nowrap">Sell Transactions</p>
        <h4 className="text-orange-950 text-xl font-semibold">Administrator</h4>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4 bg-background border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S/N</TableHead>
                <TableHead>Commodity Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>User Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sell.map((item, index) => (
                <SellRow key={index} item={item} index={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
