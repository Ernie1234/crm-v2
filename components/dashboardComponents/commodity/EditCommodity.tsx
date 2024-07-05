import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EditCommodityForm from "./EditCommodityForm";

interface Props {
  role: string | undefined;
  name: string | undefined;
  price: number | null | undefined;
}
export default function EditCommodity({ role, name, price }: Props) {
  return (
    <div>
      {role === "ADMIN" && (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-green-800 hover:bg-green-700">
              Edit Commodity
            </Button>
          </SheetTrigger>
          {/* <SheetContent className="w-full sm:min-w-[70vw]"> */}
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add new commodity</SheetTitle>
            </SheetHeader>
            <EditCommodityForm price={price} name={name} role={role} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
