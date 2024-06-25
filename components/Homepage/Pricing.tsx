"use client";

import { Check, Database } from "lucide-react";
import { useState } from "react";

import Chip from "../Chip";
import Wrapper from "../Wrapper";
import { Separator } from "../ui/separator";
import Link from "next/link";
import PricingCard from "./PricingCard";
import { pricingData } from "@/utils/data";

export default function Pricing() {
  const [priceTarget, setPriceTarget] = useState(1);

  const onHover = (index: number) => {
    setPriceTarget(index);
  };

  return (
    <div className="border-t-2 border-dashed">
      <Wrapper className="w-full flex flex-col justify-center items-center py-8 lg:py-16">
        <Chip
          className="py-1 px-5 rounded-full max-w-fit bg-green-foreground/50 capitalize text-lg text-green font-semibold flex items-center gap-2"
          text="Pricing"
          Icon={Database}
        />
        <h3 className="font-bold max-w-[40rem] text-center text-xl md:text-3xl lg:text-5xl text-green my-4 leading-10">
          Transparent Pricing Tailoring To Your Needs
        </h3>
        <p className="text-xl  text-gray-500 mb-20">
          Explore our flexible pricing plans designed to match your business
          goals and budgets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-8">
          {pricingData.map((price, index) => (
            <PricingCard
              key={index}
              num={index}
              onHover={onHover}
              priceTarget={priceTarget}
              price={price.price}
              title={price.title}
              subTitle={price.subTitle}
              features={price.features}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
