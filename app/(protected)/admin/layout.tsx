import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import SideNavigation from "@/components/adminComponents/SideNavigation";

interface Props {
  children: React.ReactNode;
}

export default async function layout({ children }: Props) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex">
        <SideNavigation />
        <main className="w-full max-h-dvh h-dvh bg-gray-100">{children}</main>
      </div>
    </SessionProvider>
  );
}
