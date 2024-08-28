"use client";

import Link from "next/link";
import BeatLoader from "react-spinner";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import FormHeader from "./FormHeader";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }
    // Send the token to your server to verify and update the user's email status
    // Once verified, navigate to the login page
    console.log("Verification token:", token);
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Failed to verify email");
      });
    // await verifyEmail(token);
    // navigate("/auth/login");
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex-1 min-h-full flex flex-col bg-zinc-50 px-6 sm:px-12 md:px-16 lg:px-28 py-8 border-2 border-gray-200 overflow-y-scroll no-scrollbar gap-8">
      <FormHeader
        showBtn
        title="Welcome Back"
        subtitle="Confirm your verification"
      />
      <div className="flex flex-col">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
      <p className="text-center">
        Confirming your verification{" "}
        <Link href="/auth/login">
          <span className="text-green-500 font-semibold text-lg">
            Back to login
          </span>
        </Link>
      </p>
    </div>
  );
}
