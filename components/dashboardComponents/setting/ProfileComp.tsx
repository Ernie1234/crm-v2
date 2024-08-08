"use client";

import { updateUserByEmail } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { profileFormSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

export default function ProfileComp() {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const firstName = user?.name.split(" ")[0] || "";
  const lastName = user?.name.split(" ")[1] || "";
  const email = user?.email || "";
  const image = user?.image || "";

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email,
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    startTransition(() => {
      updateUserByEmail(values).then((data) => {
        if (data?.error) {
          toast({
            description: data.error,
            variant: "destructive",
          });
        } else {
          toast({
            description: data.success,
            variant: "default",
          });
        }
      });
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <p className="text-xs mb-3">
                Please note that changing your password will log you out of your
                current session. If you want to keep your account secure,
                consider using a strong, unique password and enabling two-factor
                authentication. Learn more about our security measures and
                privacy policy.{" "}
                <Link
                  href="/auth/security"
                  className="text-green-500 hover:text-green-600"
                >
                  Learn more
                </Link>
              </p>
              <Link href="/auth/forget-password" className="max-w-min">
                <Button
                  size="lg"
                  className="bg-green-50 hover:bg-green-600 hover:text-white text-green-700 transition-all duration-500"
                >
                  Change Password
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-1 flex justify-center relative">
            {image ? (
              <>
                <Image
                  src={image}
                  alt="Profile Image"
                  className="rounded-full border-2 border-white w-2/3 h-full"
                  width={500}
                  height={500}
                  quality={100}
                />
                <div className="bg-red-400 h-8 w-8 absolute bottom-4 right-28 "></div>
              </>
            ) : (
              //   <Avatar className="h-full w-2/3 border border-gray-100">
              //     <AvatarImage
              //       src={image || ""}
              //       alt={firstName}
              //       className="object-center object-cover"
              //     />
              //   </Avatar>
              <div className="flex justify-center items-center w-2/3 h-2/3 rounded-full bg-white border-2 border-gray-300">
                <CloudCog className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 col-span-1 md:col-span-2">
            <Button
              size="lg"
              variant="ghost"
              className="px-12 text-green-600 hover:text-green-500 transition-all duration-500"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="px-12 bg-green-700 hover:bg-green-600 transition-all duration-500"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Saving Changes" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
