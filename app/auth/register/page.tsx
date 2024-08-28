import RegisterForm from "@/components/authComponents/RegisterForm";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<p>Loading register page...</p>}>
        <RegisterForm />
      </Suspense>
    </>
  );
}
