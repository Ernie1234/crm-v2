"use client";

import { adminLinks } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 max-h-dvh min-h-max bg-orange-950 text-background p-4 flex flex-col gap-16">
      <Link href="/dashboard">
        <div className="hidden lg:flex">
          <Image
            src="/logo.svg"
            alt="logo"
            className="object-contain w-40"
            width={500}
            height={500}
          />
        </div>
        <div className="flex lg:hidden">
          <Image
            src="/Frame 2.png"
            alt="logo"
            className="object-contain w-8 sm:w-12 md:w-14"
            width={300}
            height={300}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
        {adminLinks.map(({ path, text, icon: Icon }, index) => (
          <Link
            key={index}
            href={path}
            className={`min-w-max flex items-center space-x-3 px-4 py-2 ${
              pathname === path
                ? "text-orange-200 hover:text-orange-400 font-medium"
                : "text-gray-100 hover:text-gray-300"
            } transition-all duration-300 rounded-md`}
          >
            <Icon size={20} />
            <p className="hidden lg:block">{text}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
