"use client";

import { CloudCog, LayoutTemplate, Puzzle } from "lucide-react";
import Wrapper from "../Wrapper";
import Image from "next/image";

export default function UnrivaledFeatures() {
  return (
    <Wrapper className="w-full flex flex-col justify-center items-center py-8">
      {/* <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Grid Pattern
      </p> */}
      <div className="flex lg:gap-28 justify-between items-center w-full">
        <h3 className="max-w-prose text-5xl font-semibold text-green">
          Unrivaled Feautures Tailored for Your Success
        </h3>
        <p className="max-w-[34ch] text-lg text-muted-foreground">
          Customized, unparalled features designed for your Business{"'"}s
          unrivaled success and unparalled growth.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-8 my-12">
        <div className="w-full flex flex-col bg-green rounded-3xl justify-center p-8 gap-4 ">
          <div className="flex items-center space-x-4">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50">
              <Puzzle />
            </div>
            <h3 className="text-2xl font-semibold text-gray-50">
              Intuitive Interface
            </h3>
          </div>
          <p className="text-gray-50">
            Our intuitive interface makes it easy for you to manage your
            customers, products and orders.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
          <Image
            src="https://www.linkpoint360.com/wp-content/uploads/2021/07/11-benefits-of-crm-integration-1200x675.png"
            alt="image"
            className="w-full h-full object-fill object-center hover:scale-110 transition-all duration-300"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full flex flex-col bg-green rounded-3xl justify-center p-8 gap-4 ">
          <div className="flex items-center space-x-4">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50">
              <CloudCog />
            </div>
            <h3 className="text-2xl font-semibold text-gray-50">
              Data Security
            </h3>
          </div>
          <p className="text-gray-50">
            Your data is precious. With our state-of-the-art security
            meausres,rest assured that your information is protected against any
            potentials treats
          </p>
        </div>
        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
          <Image
            src="https://media.licdn.com/dms/image/C5112AQEQPccqtFtclA/article-cover_image-shrink_600_2000/0/1549511238904?e=2147483647&v=beta&t=LtV1lUAqOPJP1h94yKFkk4cvEwDuUzs5mve8zHKZ6jA"
            alt="image"
            className="w-full h-full object-fill object-center hover:scale-110 transition-all duration-300"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full flex flex-col bg-green rounded-3xl justify-center p-8 gap-4 ">
          <div className="flex items-center space-x-4">
            <div className="bg-green-foreground rounded-full p-2 border-2 border-gray-50">
              <LayoutTemplate />
            </div>
            <h3 className="text-2xl font-semibold text-gray-50">
              Customization
            </h3>
          </div>
          <p className="text-gray-50">
            Tailor the CRM to fit your unique business needs with On Point,
            whether it{"'"}s sales pipeline management, customer support, or
            marketing campaigns
          </p>
        </div>
        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
          <Image
            src="https://media.licdn.com/dms/image/D4D12AQE4s8eFinNN9w/article-cover_image-shrink_720_1280/0/1654158672708?e=2147483647&v=beta&t=-7CBFWHqFC-NJToFq8wa7WJw72RSmJrWQYiYEIBy-44"
            alt="image"
            className="w-full h-full object-fill object-center hover:scale-110 transition-all duration-300"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Wrapper>
  );
}
