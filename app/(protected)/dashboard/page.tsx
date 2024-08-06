import { portfolioCommodity } from "@/actions/portfolio";
import Nav from "@/components/dashboardComponents/Nav";
import PortfolioBalance from "@/components/dashboardComponents/dashboard/PortfolioBalance";
import { QuickAction } from "@/components/dashboardComponents/dashboard/QuickAction";
import { RecentTransaction } from "@/components/dashboardComponents/dashboard/RecentTransaction";
import TopCommodities from "@/components/dashboardComponents/dashboard/TopCommodities";
import YourCommodity from "@/components/dashboardComponents/dashboard/YourCommodity";
import { Suspense } from "react";

export default async function page() {
  const portfolioData = await portfolioCommodity();

  if (!Array.isArray(portfolioData)) return <p>Error fetching portfolio.</p>;
  // const priceData = await getCommodityByName(portfolioData.)

  return (
    <div className="w-full">
      <Nav header="Dashboard" />
      <Suspense fallback={<p>Loading feed...</p>}>
        <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="w-full lg:max-w-[70%]">
              <PortfolioBalance />
            </div>
            <div className="w-full lg:max-w-[30%]">
              <QuickAction />
            </div>
          </div>
          <div className="flex flex-col w-full gap-8 my-5">
            <TopCommodities />
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="w-full lg:max-w-[70%]">
              <YourCommodity portfolio={portfolioData} />
            </div>
            <div className="w-full lg:max-w-[30%]">
              <RecentTransaction />
            </div>
          </div>
        </main>
      </Suspense>
    </div>
  );
}
