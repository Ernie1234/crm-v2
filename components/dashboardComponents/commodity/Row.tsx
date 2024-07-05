"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/fnLib";
import { useRouter } from "next/navigation";
import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  id: string;
  index: number;
  name: string;
  price: number | undefined;
  unit: string;
  description: string;
}

export default function Row({
  id,
  index,
  name,
  price,
  unit,
  description,
}: Props) {
  const router = useRouter();

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => router.push(`/dashboard/commodity/${id}`)}
    >
      <TableCell className="flex justify-center items-center w-full h-full">
        <div className="font-medium text-center bg-blue-200/30 text-green-900 rounded-full max-w-max p-2">
          # {index + 1}
        </div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell className="flex items-center gap-0.5 w-full h-full">
        <TbCurrencyNaira size={18} />
        <span>{price && formatPrice(price)}</span>
      </TableCell>
      <TableCell className="capitalize">{unit}</TableCell>
      <TableCell>+6.04%</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <Button variant="greenBtn">Buy</Button>
      </TableCell>
    </TableRow>
  );
}
