import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Empty from "./Empty";

type CardProps = React.ComponentProps<typeof Card>;

export function RecentTransaction({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full md:w-[560px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          <p className="text-lg">Recent Transactions</p>
          <Link
            href="/dashboard/transaction"
            className="text-lg text-blue-500 hover:underline"
          >
            View all
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Empty
          title="No transaction"
          subtitle="You don’t own any commodity. Ready to buy some"
        />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-2 border-foreground">
          Explore Commodity
        </Button>
      </CardFooter>
    </Card>
  );
}
