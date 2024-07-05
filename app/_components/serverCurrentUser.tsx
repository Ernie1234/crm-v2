import { auth } from "@/auth";

export default async function serverCurrentUser() {
  const session = await auth();
  return session?.user;
}
