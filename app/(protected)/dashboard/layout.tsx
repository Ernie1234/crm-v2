import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import Sidebar from "@/components/dashboardComponents/Sidebar";
import { Metadata } from "next";
import BuyModal from "@/components/dashboardComponents/Modal/BuyModal";
import SellModal from "@/components/dashboardComponents/Modal/SellModal";
import { portfolioCommodity } from "@/actions/portfolio";
import SwapModal from "@/components/dashboardComponents/Modal/SwapModal";
import { getCommodityName } from "@/actions/commodity";
import ReceiveModal from "@/components/dashboardComponents/Modal/ReceiveModal";
import { getWalletAddress } from "@/actions/transaction";
import SendModal from "@/components/dashboardComponents/Modal/SendModal";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "ACM Dashboard",
  description: "A ACM dashboard",
};

export default async function layout({ children }: IProps) {
  const session = await auth();
  const response = await portfolioCommodity();
  const allCommodity = await getCommodityName();
  const walletAddress = await getWalletAddress();

  if (!Array.isArray(response)) return <p>Error fetching portfolio here.</p>;
  // if (!Array.isArray(walletAddress)) return <p>Error fetching user wallet.</p>;
  if (!Array.isArray(allCommodity)) return <p>Error fetching commodity.</p>;

  return (
    <SessionProvider session={session}>
      <div className="flex">
        <ReceiveModal address={walletAddress} />
        <SendModal portfolioCommodity={response} />
        <BuyModal commodity={allCommodity} />
        <SellModal portfolioCommodity={response} />
        <SwapModal portfolioCommodity={response} commodity={allCommodity} />
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </SessionProvider>
  );
}
