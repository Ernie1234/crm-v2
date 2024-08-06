"use client";

import { ArrowUpDown, MoveDownLeft, MoveUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBuyModalStore } from "@/hooks/use-buy-store";

type CardProps = React.ComponentProps<typeof Card>;

export function QuickAction({ className, ...props }: CardProps) {
  const buyModal = useBuyModalStore();

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4 text-lg">
          Quick actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full space-y-3">
          <Button
            onClick={buyModal.onOpen}
            size="lg"
            className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-500"
          >
            Buy
          </Button>
          <Button
            size="lg"
            className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-500"
          >
            Sell
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-lime-100 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <ArrowUpDown />
          </div>
          <p className="text-lg capitalize">swap</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-orange-200 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <MoveUpRight />
          </div>
          <p className="text-lg capitalize">send</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-orange-200 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <MoveDownLeft />
          </div>
          <p className="text-lg capitalize">Recieve</p>
        </div>
      </CardFooter>
    </Card>
  );
}
