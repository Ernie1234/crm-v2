"use client";

import { useRouter } from "next/navigation";

import { TableCell, TableRow } from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatPrice } from "@/utils/fnLib";
import { TbCurrencyNaira } from "react-icons/tb";
import { ComChart } from "../dashboard/ComChart";

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
      <TableCell>
        <div className="flex flex-col gap-0.5 text-xl font-semibold">
          <p className="">{name}</p>
          <span className="uppercase text-muted-foreground text-lg">ton</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-0.5">
          <TbCurrencyNaira size={18} />
          <span className="font-medium">{price && formatPrice(price)}</span>
        </div>
      </TableCell>
      <TableCell>+6.04%</TableCell>
      <TableCell>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <ComChart commodityName={name} />
        </AspectRatio>
      </TableCell>
    </TableRow>
  );
}
