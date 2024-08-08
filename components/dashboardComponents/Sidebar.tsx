"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { dashboardLinks } from "@/utils/data";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "../ui/button";

import { useBuyModalStore } from "@/hooks/use-buy-store";
import { useSellModalStore } from "@/hooks/use-sell-store";

export default function Sidebar() {
  const pathname = usePathname();
  const role = useCurrentRole();

  const modalStore = useBuyModalStore();
  const sellModalStore = useSellModalStore();

  return (
    <aside className="sticky top-0 max-h-dvh min-w-min bg-green-800 p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <Link href="/">
          <h4 className="text-gray-50 font-bold text-2xl w-min">
            A<span className="text-orange-400">C</span>M
          </h4>
        </Link>
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
          {dashboardLinks.map(({ path, text, icon: Icon }, index) => (
            <Link
              key={index}
              href={path}
              className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
                pathname === path
                  ? "text-white bg-green-700 font-medium"
                  : "text-gray-100 hover:text-gray-300"
              } transition-all duration-300 rounded-md`}
            >
              <Icon size={20} />
              <p className="hidden lg:block">{text}</p>
            </Link>
          ))}
          {role === "ADMIN" && (
            <Link
              href="/admin"
              className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
                pathname === "/admin"
                  ? "text-white bg-green-700 font-medium"
                  : "text-gray-100 hover:text-gray-300"
              } transition-all duration-300 rounded-md`}
            >
              <MdOutlineAdminPanelSettings size={20} />
              <p className="hidden lg:block">Administrator</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="w-full bg-gray-50 hover:bg-gray-200/50 shadow-md text-green-700 hover:text-white rounded-full border border-gray-100 hover:border-gray-100/10 transition-all duration-300"
          onClick={modalStore.onOpen}
        >
          Buy
        </Button>
        <Button
          className="w-full bg-transparent hover:bg-white hover:text-green-700 rounded-full border border-gray-100 transition-all duration-300"
          onClick={sellModalStore.onOpen}
        >
          Sell
        </Button>
      </div>
    </aside>
  );
}
