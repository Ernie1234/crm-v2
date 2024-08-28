import NewVerificationForm from "@/components/authComponents/NewVerificationForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading login page...</p>}>
      <NewVerificationForm />
    </Suspense>
  );
}
