import { ArrowUpDown, BellRing, Check, MoveUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Empty from "./Empty";

type CardProps = React.ComponentProps<typeof Card>;

export function QuickAction({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full md:w-[560px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4 text-lg">
          Quick actions
        </CardTitle>
      </CardHeader>
      <CardContent>buttons</CardContent>
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
            <MoveUpRight />
          </div>
          <p className="text-lg capitalize">Recieve</p>
        </div>
      </CardFooter>
    </Card>
  );
}
