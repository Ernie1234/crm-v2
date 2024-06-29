import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function signout() {
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return <Button onClick={handleSignOut}>sign out</Button>;
}
