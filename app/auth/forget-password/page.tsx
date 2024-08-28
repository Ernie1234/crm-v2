import ForgetPasswordForm from "@/components/authComponents/ForgetPasswordForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading login page...</p>}>
      <ForgetPasswordForm />
    </Suspense>
  );
}
