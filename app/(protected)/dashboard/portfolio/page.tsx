import { portfolioCommodity } from "@/actions/portfolio";
import Nav from "@/components/dashboardComponents/Nav";
import PortfolioTable from "@/components/dashboardComponents/portfolio/PortfolioTable";

export default async function page() {
  // Fetch portfolio data
  const portfolioData = await portfolioCommodity();

  console.log(portfolioData);

  return (
    <div className="w-full">
      <Nav header="Portfolio" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col lg:flex-row p-4 gap-5 lg:gap-8">
        <div className="flex flex-col lg:max-w-[70%] md:flex-row w-full gap-8">
          <PortfolioTable />
        </div>
        <div className="flex flex-col lg:max-w-[30%] md:flex-row w-full gap-8">
          second world
        </div>
      </main>
    </div>
  );
}
