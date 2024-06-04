"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { testimonialData } from "@/utils/data";

const responsive = {
  0: {
    items: 1,
  },

  // 960: {
  //   items: 2,
  //   // itemsFit: "contain",
  // },
};

const createItems = (length = testimonialData.length) => {
  return Array.from({ length }).map((e, i) => <div key={i}>{i + 1}</div>);
  //   Array.from({ length }).map((e, i) => console.log(e, i));
};

const items = testimonialData.map((view, index) => {
  return (
    <div className="border-2 p-8 flex gap-5 mr-10 w-auto" key={index}>
      <div className="flex">
        <div className="w-xl h-full relative group">
          <Image
            src={view.img}
            alt="personLaptop"
            className="object-cover flex w-full"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col gap-5 justify-between w-full">
          <p className="text-darkBlue text-lg">{view.name}</p>
          <p className="text-darkBlue">{view.text}</p>
        </div>
      </div>
    </div>
  );
});

function TestimonyCard() {
  const carousel = useRef<AliceCarousel>(null);

  const [indicator, setIndicator] = useState(createItems());
  const isDisabled = items.length <= 1;

  return [
    <AliceCarousel
      key="carousel"
      mouseTracking
      controlsStrategy="alternate"
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      ref={carousel}
      touchTracking
      keyboardNavigation
    />,
    <nav key="nav" className="b-refs-navs">
      {items.map((item, i) => {
        return <span key={i} onClick={() => carousel?.current?.slideTo(i)} />;
      })}
    </nav>,
    <div
      key="btns"
      className="b-refs-buttons flex justify-center items-center gap-8 mt-5"
    >
      <Button
        disabled={isDisabled}
        className="h-14 w-14 flex justify-center items-center rounded-full p-2 bg-gray-300 hover:bg-gray-300 active:bg-darkBlue focus:bg-darkBlue focus:text-white text-joelBlue"
        onClick={(e) => carousel?.current?.slidePrev(e)}
      >
        <ArrowLeft />
      </Button>
      <Button
        className="h-14 w-14 flex justify-center items-center rounded-full p-2 bg-gray-300 hover:bg-gray-300 active:bg-orange-500 focus:bg-orange-500 focus:text-white text-joelBlue"
        onClick={(e) => carousel?.current?.slideNext(e)}
      >
        <ArrowRight />
      </Button>
    </div>,
  ];
}

export default TestimonyCard;
