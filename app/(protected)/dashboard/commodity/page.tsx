import Nav from "@/components/dashboardComponents/Nav";

export default function page() {
  return (
    <div className="w-full">
      <Nav header="Commodity" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        commodity market
      </main>
    </div>
  );
}
