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
import { useSellModalStore } from "@/hooks/use-sell-store";
import { useSwapModalStore } from "@/hooks/use-swap-store";
import { useReceiveModalStore } from "@/hooks/use-receive-store";
import { useSendModalStore } from "@/hooks/use-send-store";

type CardProps = React.ComponentProps<typeof Card>;

export function QuickAction({ className, ...props }: CardProps) {
  const buyModal = useBuyModalStore();
  const sellModal = useSellModalStore();
  const swapModal = useSwapModalStore();
  const receiveModal = useReceiveModalStore();
  const sendModal = useSendModalStore();

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
            onClick={sellModal.onOpen}
          >
            Sell
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-evenly items-center gap-4">
        <div
          className="flex flex-col justify-center items-center"
          onClick={swapModal.onOpen}
        >
          <div className="bg-lime-100 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <ArrowUpDown />
          </div>
          <p className="text-lg capitalize">swap</p>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          onClick={sendModal.onOpen}
        >
          <div className="bg-orange-200 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <MoveUpRight />
          </div>
          <p className="text-lg capitalize">send</p>
        </div>
        <div
          className="flex flex-col justify-center items-center"
          onClick={receiveModal.onOpen}
        >
          <div className="bg-orange-200 hover:bg-lime-300 hover:shadow-md p-4 rounded-full">
            <MoveDownLeft />
          </div>
          <p className="text-lg capitalize">Receive</p>
        </div>
      </CardFooter>
    </Card>
  );
}
