"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";

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
import { userForgetFormSchema } from "@/utils/schema";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import FormHeader from "./FormHeader";
import { forgetPassword } from "@/actions/forget-password";
// import { useSearchParams } from "next/navigation";

export default function ForgetPasswordForm() {
  const [errors, setErrors] = useState<string | undefined>("");
  const [successs, setSuccesss] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof userForgetFormSchema>>({
    resolver: zodResolver(userForgetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof userForgetFormSchema>) {
    setErrors("");
    setSuccesss("");

    startTransition(() => {
      forgetPassword(values).then((data) => {
        setErrors(data?.error);
        setSuccesss(data?.success);
      });
    });
  }

  return (
    <div className="flex-1 min-h-full flex flex-col bg-zinc-50 px-6 sm:px-12 md:px-16 lg:px-28 py-8 border-2 border-gray-200 overflow-y-scroll no-scrollbar">
      <FormHeader showBtn title="Forget Password" />
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
            </div>

            {/* <FormError message={errors || urlError} /> */}
            <FormError message={errors} />
            <FormSuccess message={successs} />

            <Button
              className="bg-green-700 hover:bg-green-600 text-gray-100 hover:text-gray-100 text-lg w-full rounded-full py-6"
              type="submit"
              disabled={isPending}
            >
              Send forget mail
            </Button>
          </form>
        </Form>
      </div>

      <p className="mt-8 text-center">
        Back to login{" "}
        <Link href="/auth/login">
          <span className="text-green-500 font-semibold text-lg">Login</span>
        </Link>
      </p>
    </div>
  );
}
