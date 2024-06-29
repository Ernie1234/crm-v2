import Nav from "@/components/dashboardComponents/Nav";
import { QuickAction } from "@/components/dashboardComponents/dashboard/QuickAction";
import { RecentTransaction } from "@/components/dashboardComponents/dashboard/RecentTransaction";
import YourCommodity from "@/components/dashboardComponents/dashboard/YourCommodity";

export default async function page() {
  return (
    <div className="w-full">
      <Nav header="Dashboard" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        {/* Your dashboard content goes here */}
        dashboard
        <div className="flex gap-8">
          <QuickAction />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-8">
          <YourCommodity />
          <RecentTransaction />
        </div>
      </main>
    </div>
  );
}
