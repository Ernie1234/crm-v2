import { getTransaction } from "@/actions/transaction";
import Nav from "@/components/dashboardComponents/Nav";
import Table from "@/components/dashboardComponents/transaction/Table";

export default async function page() {
  const transaction = await getTransaction();

  if (!Array.isArray(transaction)) return <p>Error fetching transaction.</p>;

  if (transaction.length === 0) return <p>No transaction found.</p>;

  if (!transaction) return <p>No transaction found.</p>;

  return (
    <div className="w-full">
      <Nav header="Transaction" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <Table transaction={transaction} />
      </main>
    </div>
  );
}
