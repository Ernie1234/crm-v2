"use client";

import Image from "next/image";

export default function HeaderImage() {
  return (
    <div className="relative flex w-full mx-auto mb-6 md:mb-12 lg:mb-20">
      <Image
        src="/assets/sketch-dashboard-ui-kit-saas-design.png"
        alt="header image"
        className="-mt-24 object-cover w-3/5 flex mx-auto shadow-2xl"
        width={500}
        height={500}
      />
    </div>
  );
}
