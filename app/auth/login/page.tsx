import LoginForm from "@/components/authComponents/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading login page...</p>}>
      <LoginForm />
    </Suspense>
  );
}
