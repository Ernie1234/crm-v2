import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Wrapper from "../Wrapper";

import { navLinks } from "@/utils/data";

export default function Navbar() {
  return (
    <nav className="bg-green border-b border-green-foreground">
      <Wrapper className="flex justify-between items-center p-4 text-green-foreground">
        logo
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.text} className="text-green-foreground ">
              <Link href={link.path}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/auth/customer/register">
              <Button className="bg-green-foreground hover:bg-green-600 text-green font-semibold">
                Log In
              </Button>
            </Link>
            <Link href="/auth/customer/login">
              <Button className="bg-green-950 hover:bg-green-900">
                Sign In
              </Button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger>
              <Menu className="text-green-500 block md:hidden" size={30} />
            </SheetTrigger>
            <SheetContent className="bg-green-50 flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-center gap-8 items-start">
                {navLinks.map((link) => (
                  <li key={link.text} className="text-green-500 text-2xl">
                    <Link href={link.path}></Link>
                    {link.text}
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </Wrapper>
    </nav>
  );
}
