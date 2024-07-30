"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Chip from "../Chip";
import Wrapper from "../Wrapper";
import { Button } from "../ui/button";

const newsLetterFormSchema = z.object({
  email: z.string().email(),
});

const Newsletter = () => {
  const form = useForm<z.infer<typeof newsLetterFormSchema>>({
    resolver: zodResolver(newsLetterFormSchema),
  });

  function onSubmit(values: z.infer<typeof newsLetterFormSchema>) {
    // console.log(values);
  }

  return (
    <div className="bg-green relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 h-[20rem] w-[20rem] border-2 border-green-foreground/30 rounded-full" />
      <div className="absolute -top-10 -right-24 h-28 w-[20rem] border-2 border-green-foreground/30 rounded-3xl" />
      <Wrapper className="w-full flex flex-col justify-center items-center py-8 lg:py-16">
        <Chip
          className="py-1 px-5 rounded-full max-w-fit bg-green-foreground/20 capitalize text-lg text-green-100 font-semibold flex items-center gap-2"
          text="Stay Connected"
        />
        <h3 className="font-bold max-w-[40rem] text-center text-xl md:text-3xl lg:text-5xl text-green-100 my-4 leading-10">
          Stay Informed, Subscribe to Our Newsletter
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-x-4 flex items-center mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="E-mail Address"
                      className="rounded-full p-3 min-w-72"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-full bg-green-foreground text-green font-semibold text-lg"
            >
              Subscribe
            </Button>
          </form>
        </Form>
      </Wrapper>
    </div>
  );
};

export default Newsletter;
