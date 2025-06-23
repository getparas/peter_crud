"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, updateUser } from "@/server/users";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, UserIcon, Mail } from "lucide-react";

interface UserFormProps {
  user?: User;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userData = {
        ...values,
        password: "password123",
      };

      if (user) {
        await updateUser({
          ...userData,
          id: user.id,
        });
      } else {
        await createUser(userData);
      }

      form.reset();
      toast.success(`User ${user ? "updated" : "added"} successfully`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${user ? "update" : "add"} user`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-semibold text-black">
                  <UserIcon className="size-4" />
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    {...field}
                    className="rounded-xl border-2 border-black bg-white px-4 py-3 focus:border-gray-600 focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-semibold text-black">
                  <Mail className="size-4" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    className="rounded-xl border-2 border-black bg-white px-4 py-3 focus:border-gray-600 focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-xl border-2 border-black bg-black py-3 font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-200 hover:bg-gray-800 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-5 animate-spin" />
            ) : null}
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
