import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import Sidebar from "@/components/dashboardComponents/Sidebar";
import { Metadata } from "next";
import BuyModal from "@/components/dashboardComponents/Modal/BuyModal";
import SellModal from "@/components/dashboardComponents/Modal/SellModal";
import SwapModal from "@/components/dashboardComponents/Modal/SwapModal";
import ReceiveModal from "@/components/dashboardComponents/Modal/ReceiveModal";
import SendModal from "@/components/dashboardComponents/Modal/SendModal";
import { portfolioCommodity } from "@/actions/portfolio";
import { getCommodityName } from "@/actions/commodity";
import { getWalletAddress } from "@/actions/transaction";
import ErrorBoundary from "@/components/ErrorBoundary";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "ACM Dashboard",
  description: "A ACM dashboard",
};

const fetchData = async () => {
  const session = await auth();
  const response = await portfolioCommodity();
  const allCommodity = await getCommodityName();
  const walletAddress = await getWalletAddress();

  // Throw an error if data fetching fails
  if (!Array.isArray(response) || !Array.isArray(allCommodity)) {
    throw new Error("Failed to fetch portfolio or commodities.");
  }

  return { session, response, allCommodity, walletAddress };
};

export default async function Layout({ children }: IProps) {
  const { session, response, allCommodity, walletAddress } = await fetchData();

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <div className="flex">
          <ReceiveModal address={walletAddress} />
          <SendModal portfolioCommodity={response} />
          <BuyModal commodity={allCommodity} />
          <SellModal portfolioCommodity={response} />
          <SwapModal portfolioCommodity={response} commodity={allCommodity} />
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </ErrorBoundary>
    </SessionProvider>
  );
}
