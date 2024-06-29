import { Plus } from "lucide-react";
import Link from "next/link";
import Empty from "./Empty";

export default function YourCommodity() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg text-black font-medium">Your commodities</p>
        <Link href="/dashboard/commodity">
          <button className="text-white font-semibold px-6 py-2 rounded-full bg-green-800 hover:bg-green-600 flex gap-2">
            <Plus /> Add New
          </button>
        </Link>
      </div>
      <div className="bg-white p-4 rounded-md h-full shadow-sm">
        {/* Commodity cards */}

        {/* Empty Commodity cards */}
        <div className="flex w-full justify-center items-center">
          <Empty
            title="No commodities"
            subtitle="Your commodites will appear here"
            showBtn
            btnTitle="Explore Commodity"
          />
        </div>
      </div>
    </div>
  );
}
