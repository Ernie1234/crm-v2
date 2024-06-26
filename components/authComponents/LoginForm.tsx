"use client";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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

export default function LoginForm() {
  const [errors, setErrors] = useState<string | undefined>("");
  const [successs, setSuccesss] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

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
      loginAction(values).then((data) => {
        if (data?.error) {
          setErrors(data.error);
          setSuccesss(undefined);
        } else {
          setErrors(undefined);
          setSuccesss(data?.success);
        }
      });
    });
  }

  return (
    <div className="flex-1 min-h-full flex flex-col bg-zinc-50 px-6 sm:px-12 md:px-16 lg:px-28 py-8 border-2 border-gray-200 overflow-y-scroll no-scrollbar">
      <Link href="/">
        <h4 className="text-green-600 font-medium text-2xl w-min">
          A<span className="text-orange-400">C</span>M
        </h4>
      </Link>
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-3xl font-semibold text-green-600">
          Create an Account
        </h1>
        <p className="text-lg">Log into your Agent Account below</p>
        <div className="flex flex-col md:flex-row gap-3 pt-5">
          <Button
            disabled={isPending}
            variant="outline"
            className="rounded-full text-lg px-6 py-4"
          >
            <FcGoogle className="mr-2 h-6 w-6" />
            Google
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            className="rounded-full text-lg px-6 py-4"
          >
            <FaFacebookF className="mr-2 h-6 w-6 text-blue-600" />
            Facebook
          </Button>
        </div>
      </div>

      <p className="continue__text mt-4">Or continue with email</p>

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
