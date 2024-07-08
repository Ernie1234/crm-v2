import { getUserById } from "@/actions/user";

export default async function page({ params }: { params: { userId: string } }) {
  const id = params.userId;
  const user = await getUserById(id);
  // console.log(user);

  return <div></div>;
}
