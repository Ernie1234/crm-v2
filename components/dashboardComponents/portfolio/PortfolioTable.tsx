"use client";

import { TPortfolioCommodity } from "@/utils/types";

interface Props {
  portfolio: TPortfolioCommodity[] | { error: string } | undefined;
}

export default function PortfolioTable({ portfolio }: Props) {
  // console.log(portfolio);
  return <div>PortfolioTable</div>;
}
