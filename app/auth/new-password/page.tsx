import NewPasswordForm from "@/components/authComponents/NewPasswordForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading login page...</p>}>
      <NewPasswordForm />
    </Suspense>
  );
}
