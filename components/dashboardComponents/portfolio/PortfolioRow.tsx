"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/fnLib";
import { useRouter } from "next/navigation";
import { TbCurrencyNaira } from "react-icons/tb";

interface Props {
  id: string;
  index: number;
  name: string;
  price: number;
  quantity: number;
}

export default function PortfolioRow({ id, name, price }: Props) {
  const router = useRouter();

  return (
    <TableRow
      className="hover:cursor-pointer"
      onClick={() => router.push(`/dashboard/commodity/${id}`)}
    >
      <TableCell>{name}</TableCell>
      <TableCell className="flex items-center gap-0.5 w-full h-full">
        <TbCurrencyNaira size={18} />
        <span>{price && formatPrice(price)}</span>
      </TableCell>
      <TableCell>+6.04%</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
