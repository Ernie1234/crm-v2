import { portfolioCommodity } from "@/actions/portfolio";
import PortfolioBalance from "@/components/dashboardComponents/dashboard/PortfolioBalance";
import { RecentTransaction } from "@/components/dashboardComponents/dashboard/RecentTransaction";
import YourCommodity from "@/components/dashboardComponents/dashboard/YourCommodity";
import Nav from "@/components/dashboardComponents/Nav";
import { PortChart } from "@/components/dashboardComponents/portfolio/PortChart";

export default async function page() {
  // Fetch portfolio data
  const portfolioData = await portfolioCommodity();

  if (!Array.isArray(portfolioData)) return <p>Error fetching portfolio.</p>;

  return (
    <div className="w-full">
      <Nav header="Portfolio" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col lg:flex-row p-4 gap-5 lg:gap-8">
        <div className="flex flex-col lg:max-w-[70%] w-full gap-8">
          {/* <PortfolioTable portfolio={portfolioData} /> */}
          <PortfolioBalance />
          <YourCommodity portfolio={portfolioData} />
        </div>
        <div className="flex flex-col lg:max-w-[30%] w-full gap-8">
          <RecentTransaction />
          <PortChart portfolio={portfolioData} />
        </div>
      </main>
    </div>
  );
}
