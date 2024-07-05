"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { commodityFormSchema } from "@/utils/schema";
import { useTransition } from "react";
import { createCommodity } from "@/actions/commodity";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommodityForm() {
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const email = user?.email;

  const form = useForm<z.infer<typeof commodityFormSchema>>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: {
      unit: "per ton",
    },
  });

  function onSubmit(values: z.infer<typeof commodityFormSchema>) {
    startTransition(() => {
      createCommodity(values, email as string).then((data) => {
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

  if (!user || !user.email) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commodity Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 justify-center items-center">
            <FormField
              control={form.control}
              name="minQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Min Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Max Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 justify-center items-center">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Cost Price in naira"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commodity per unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="per ton">Per Ton</SelectItem>
                      <SelectItem value="per bag">Per Bag</SelectItem>
                      <SelectItem value="per kilo">Per Kilo</SelectItem>
                      <SelectItem value="per cup">Per Cup</SelectItem>
                      <SelectItem value="per mudu">Per Mudu</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="bg-green-500 hover:bg-green-700 hover:text-green-50"
            type="submit"
          >
            {isPending ? "Saving" : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
