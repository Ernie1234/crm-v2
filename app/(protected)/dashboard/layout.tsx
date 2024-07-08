import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import Sidebar from "@/components/dashboardComponents/Sidebar";
import { Metadata } from "next";
import BuyModal from "@/components/dashboardComponents/Modal/BuyModal";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "ACM Dashboard",
  description: "A ACM dashboard",
};

export default async function layout({ children }: IProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex">
        <BuyModal />
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </SessionProvider>
  );
}
