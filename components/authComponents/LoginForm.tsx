"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userLoginFormSchema } from "@/utils/schema";
import FormError from "./FormError";
import { loginAction } from "@/actions/login";
import { useState, useTransition } from "react";
import FormSuccess from "./FormSuccess";
import FormHeader from "./FormHeader";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [errors, setErrors] = useState<string | undefined>("");
  const [successs, setSuccesss] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  // const urlError =
  //   searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email already linked"
  //     : undefined;

  const form = useForm<z.infer<typeof userLoginFormSchema>>({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userLoginFormSchema>) {
    setErrors("");
    setSuccesss("");

    startTransition(() => {
      loginAction(values, callbackUrl).then((data) => {
        setErrors(data?.error);
        setSuccesss(data?.success);
      });
    });
  }

  return (
    <div className="flex-1 min-h-full flex flex-col bg-zinc-50 px-6 sm:px-12 md:px-16 lg:px-28 py-8 border-2 border-gray-200 overflow-y-scroll no-scrollbar">
      <FormHeader title="Welcome Back" subtitle="Log into your Account below" />
      <div className="flex flex-col mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-10"
          >
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="elon@tesla.com"
                        {...field}
                        disabled={isPending}
                        type="email"
                        className="p-3"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between pt-2 pb-1">
                      <p>Password*</p>
                      <Link
                        className="text-green-500"
                        href="/auth/forget-password"
                      >
                        Forget Password?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter secure Password"
                        {...field}
                        disabled={isPending}
                        type="password"
                        className="p-3"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormError message={errors || urlError} /> */}
            <FormError message={errors} />
            <FormSuccess message={successs} />

            <Button
              className="bg-green-700 hover:bg-green-600 text-gray-100 hover:text-gray-100 text-lg w-full rounded-full py-6"
              type="submit"
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>

      <p className="mt-8 text-center">
        Already have an account?{" "}
        <Link href="/auth/register">
          <span className="text-green-500 font-semibold text-lg">Register</span>
        </Link>
      </p>
    </div>
  );
}
