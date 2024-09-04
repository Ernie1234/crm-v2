import { getAllUsers } from "@/actions/admin-transaction";
import UserRow from "@/components/adminComponents/UserRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function page() {
  const user = await getAllUsers();

  if (!Array.isArray(user)) return <p>Error fetching user transactions.</p>;
  if (user.length === 0) return <p>No user transactions found.</p>;

  return (
    <div className="w-full h-full">
      <div className="bg-white border-b flex justify-between items-center gap-3 p-4">
        <p className="text-lg text-nowrap">All Users</p>
        <h4 className="text-orange-950 text-xl font-semibold">Administrator</h4>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-4 bg-background border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S/N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Switch Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.map((item, index) => (
                <UserRow key={index} item={item} index={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
