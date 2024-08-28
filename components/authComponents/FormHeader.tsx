"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

interface IProps {
  title: string;
  subtitle?: string;
  showBtn?: boolean;
}

export default function FormHeader({
  title,
  subtitle,
  showBtn = false,
}: IProps) {
  const searchParams = useSearchParams();
  const callbackurl = searchParams.get("callbackUrl");

  const handleLogin = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackurl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <Link href="/">
        <h4 className="text-green-600 font-medium text-2xl w-min">
          A<span className="text-orange-400">C</span>M
        </h4>
      </Link>
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-3xl font-semibold text-green-600">{title}</h1>
        <p className="text-lg">{subtitle}</p>
        {!showBtn && (
          <>
            <div className="flex flex-col md:flex-row gap-3 pt-5">
              <Button
                variant="outline"
                className="rounded-full text-lg px-6 py-4"
                onClick={() => handleLogin("google")}
              >
                <FcGoogle className="mr-2 h-6 w-6" />
                Google
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-lg px-6 py-4"
                onClick={() => handleLogin("facebook")}
              >
                <FaFacebookF className="mr-2 h-6 w-6 text-blue-600" />
                Facebook
              </Button>
            </div>
          </>
        )}
      </div>

      {!showBtn && (
        <p className="continue__text mt-4">Or continue with email</p>
      )}
    </>
  );
}
