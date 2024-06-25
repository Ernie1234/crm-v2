import Link from "next/link";
import { Separator } from "../ui/separator";
import { Check } from "lucide-react";

type TProps = {
  num: number;
  onHover: (priceTarget: number) => void;
  priceTarget: number;
  price: number;
  title: string;
  subTitle: string;
  features: string[];
};

export default function PricingCard({
  num,
  onHover,
  priceTarget,
  price,
  title,
  subTitle,
  features,
}: TProps) {
  return (
    <div
      className={`${
        priceTarget === num ? "bg-green" : "bg-white"
      } p-8 rounded-lg flex flex-col justify-between gap-12 shadow-xl transition-all duration-500 border-2 border-gray-100`}
      onMouseEnter={() => onHover(num)}
    >
      <div className="">
        <p
          className={`${
            priceTarget === num ? "text-gray-200" : "text-gray-800"
          } text-xl font-semibold`}
        >
          {title}
        </p>
        <p
          className={`${
            priceTarget === num ? "text-gray-300" : "text-gray-800"
          } font-semibold pb-2`}
        >
          {subTitle}
        </p>
        <p
          className={`${
            priceTarget === num ? "text-gray-300" : "text-gray-600"
          } font-normal text-lg`}
        >
          <span
            className={`${
              priceTarget === num ? "text-gray-50" : "text-gray-800"
            } text-4xl font-bold`}
          >
            ${price}
          </span>
          /month
        </p>
        <Separator className="my-8" />
        <div className="space-y-3">
          {features.map((feat, i) => (
            <p className="flex gap-3" key={i}>
              <Check
                className={`${
                  priceTarget === num ? "text-gray-200" : "text-gray-600"
                }`}
              />
              <span
                className={`${
                  priceTarget === num ? "text-gray-200" : "text-gray-600"
                } font-normal text-base capitalize`}
              >
                {feat}
              </span>
            </p>
          ))}
        </div>
      </div>

      <Link
        href="/pricing"
        className="bg-green-foreground rounded-full hover:bg-green-600 text-green font-semibold text-lg py-3 px-7 max-w-full text-center"
      >
        Get Started
      </Link>
    </div>
  );
}
