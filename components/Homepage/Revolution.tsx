"use client";

import Link from "next/link";
import Wrapper from "../Wrapper";
import { BarChart2, Blocks, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Chip from "../Chip";

export default function Revolution() {
  return (
    <div className="bg-green w-full">
      <Wrapper className="flex flex-col py-16">
        <div className="flex gap-16">
          <div className="flex-1 flex flex-col space-y-4 justify-between">
            <Chip
              text="Our Solutions"
              className="py-1 px-5 rounded-full max-w-fit bg-green-600/30 capitalize text-lg text-green-50"
            />
            <h3 className="capitalize font-bold max-w-prose text-xl md:text-3xl lg:text-5xl text-gray-50 my-4 leading-10">
              Revitalutionalize your business
            </h3>
            <p className="text-xl  text-green-foreground">
              Effortlessly boost sales, enhance service experiences, and drive
              marketing success with our specialized CRM solutions.
            </p>
            <Link
              href="/auth/customer/register"
              className="bg-green-foreground rounded-full hover:bg-green-600 text-green font-semibold text-lg py-3 px-7 max-w-fit"
            >
              Get Started
            </Link>
          </div>
          <div className="flex-1 border-2 border-green-foreground rounded-3xl overflow-hidden">
            <Image
              src="https://img.freepik.com/premium-photo/business-handshake-partnership-contract-agreement-corporate-clients-meeting-room-crm-b2b-welcome-thank-you-hand-sign-company-deal-marketing-presentation-with-paper-data_590464-85800.jpg"
              alt="revolutionalize"
              className="object-cover flex w-full object-center"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-8 mt-16">
          <div className="w-full flex flex-col bg-gray-50 rounded-3xl justify-center p-8 gap-4 ">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50 max-w-fit">
              <BarChart2 />
            </div>
            <h3 className="text-2xl font-semibold text-green">Sales CRM</h3>

            <p className="text-green font-semibold">
              Streamline sales, manage leads, and boost revenue with our Sales
              CRM{"'"}s actionable insights.
            </p>
          </div>
          <div className="w-full flex flex-col bg-gray-50 rounded-3xl justify-center p-8 gap-4 ">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50 max-w-fit">
              <LayoutGrid />
            </div>
            <h3 className="text-2xl font-semibold text-green">Service CRM</h3>

            <p className="text-green font-semibold">
              Elevate service quality, resolve issues, and maintain satisfaction
              with our Service CRM
            </p>
          </div>
          <div className="w-full flex flex-col bg-gray-50 rounded-3xl justify-center p-8 gap-4 ">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50 max-w-fit">
              <Blocks />
            </div>
            <h3 className="text-2xl font-semibold text-green">Marketing CRM</h3>

            <p className="text-green font-semibold">
              Crafts campaigns, tracking metrics, and converts leads seamlessly
              with our Marketing CRM
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
