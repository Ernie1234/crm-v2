import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <h1>dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
