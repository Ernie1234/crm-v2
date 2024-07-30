"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/fnLib";
import { TbCurrencyNaira } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface Props {
  id: number;
  name: string;
  date: string;
  price: number;
  quantity: number;
  status: string;
}

export default function TransactionRow({
  id,
  name,
  date,
  price,
  quantity,
  status,
}: Props) {
  const router = useRouter();

  const createAt = useMemo(() => {
    if (!date) return null;

    return format(new Date(date), "MMMM dd, yyyy");
  }, [date]);

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => router.push(`/dashboard/commodity/${id}`)}
    >
      <TableCell className="font-medium">{createAt && createAt}</TableCell>
      <TableCell className="flex flex-col justify-center h-full">
        <span className="font-semibold text-lg uppercase">{name}</span>
        <span className="uppercase font-medium text-muted-foreground">smz</span>
      </TableCell>

      <TableCell>
        <div className="flex h-full w-full justify-start items-center gap-1 font-medium">
          <TbCurrencyNaira size={18} />
          <span>{price && formatPrice(price)}</span>
        </div>
      </TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        <div
          className={cn(
            "p-1 flex justify-center items-center rounded-lg uppercase text-xs font-semibold",
            status === "abandoned"
              ? "bg-rose-100/40 text-rose-700"
              : status === "processing"
              ? "bg-yellow-100"
              : status === "success"
              ? "bg-green-100 text-green-600"
              : "bg-red-200"
          )}
        >
          {status}
        </div>
      </TableCell>
      <TableCell>
        <Button variant="ghost" className="text-green-500">
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
