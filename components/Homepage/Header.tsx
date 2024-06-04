"use client";

import Link from "next/link";
import Chip from "../Chip";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-green">
      <Chip
        className="py-1.5 px-4 rounded-full text-center bg-green-600/20 capitalize text-lg text-green-50"
        text="ai based support"
      />

      <h1 className="capitalize font-bold max-w-prose text-center text-3xl md:text-5xl lg:text-7xl text-green-100 my-4">
        Revitalize team dynamics <br /> data-driven CRM
      </h1>
      <p className="text-2xl max-w-prose text-center text-green-foreground my-5">
        Manage the relation your business and customer perfectly with AI based
        customer Relationship Management
      </p>
      <div className="flex space-x-5 mt-8">
        <Link
          href="/about"
          className="bg-green-50 rounded-full hover:bg-green-100 text-green font-semibold text-lg py-3 px-7"
        >
          Learn More
        </Link>
        <Link
          href="/auth/customer/register"
          className="bg-green-foreground rounded-full hover:bg-green-600 text-green font-semibold text-lg py-3 px-7"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
