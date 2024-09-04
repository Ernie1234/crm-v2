"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "../ui/table";
import { changeUserRole } from "@/actions/admin-transaction";
import { adminUserFormSchema } from "@/utils/schema";
import { TUser } from "@/utils/types";

interface Props {
  item: TUser;
  index: number;
}

export default function UserRow({ item, index }: Props) {
  const [isPending, startTransition] = useTransition();

  const isAdmin = item.role === "ADMIN" ? true : false;

  const form = useForm<z.infer<typeof adminUserFormSchema>>({
    resolver: zodResolver(adminUserFormSchema),
    defaultValues: {
      id: item.id,
      role: item.role,
      roleToggle: isAdmin,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof adminUserFormSchema>) {
    console.log(values);
    startTransition(() => {
      changeUserRole(values).then((data) => {
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
    <TableRow key={item.id}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.firstName || item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.phoneNumber}</TableCell>
      <TableCell>{item.role}</TableCell>
      <TableCell>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="roleToggle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </TableCell>
    </TableRow>
  );
}
