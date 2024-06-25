"use client";

import { cn } from "@/lib/utils";

import GridPattern from "./magicui/grid-pattern";

export default function DashedStroke() {
  return (
    <div className="col-start-1 col-end-2 h-full flex flex-col w-full items-center justify-center overflow-hidden rounded-lg bg-background opacity-80">
      <GridPattern
        width={250}
        height={250}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(1100px_circle_at_center,white,white)]"
        )}
      />
    </div>
  );
}
