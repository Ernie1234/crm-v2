import { getAllTransactions } from "@/actions/transaction";
import Nav from "@/components/dashboardComponents/Nav";
import Table from "@/components/dashboardComponents/transaction/Table";

export default async function page() {
  // const transaction = await getTransaction();
  const allTrans = await getAllTransactions();

  // if (!Array.isArray(transaction))
  //   return <p>Error bought fetching transaction.</p>;
  if (!Array.isArray(allTrans)) return <p>Error sold fetching transaction.</p>;

  // if (transaction.length === 0) return <p>No bought transaction found.</p>;

  // if (!transaction) return <p>No bought transaction found.</p>;

  return (
    <div className="w-full">
      <Nav header="Transaction" />
      <main className="bg-gray-100 w-full min-h-dvh overflow-scroll no-scrollbar flex flex-col p-4">
        <Table allTrans={allTrans} />
        {/* <Table transaction={transaction} allTrans={allTrans} /> */}
      </main>
    </div>
  );
}
