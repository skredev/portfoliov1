"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { toast } from "sonner";

const accountFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Please provide your current password",
    }),
    password: z.string().min(7, {
      message: "Password must contain at least 7 characters",
    }),
    confirmPassword: z.string().min(7, {
      message: "Password must contain at least 7 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function PasswordForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: AccountFormValues) {
    signInWithEmailAndPassword(
      auth,
      auth.currentUser?.email as any,
      data["currentPassword"],
    )
      .then((userCredential) => {
        updatePassword(auth.currentUser as any, data["confirmPassword"])
          .then(() => {
            toast.success("Successfully changed password");
          })
          .catch((error) => {
            toast.error("Password change failed", {
              description: "Surely only a coincidence...",
            });
          });
      })
      .catch((error) => {
        toast.error("Wrong current password");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input placeholder="Current password" {...field} />
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
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="New password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm password" {...field} />
              </FormControl>
              <FormDescription>
                Changing your password is irreversible and can only be fixed by
                the site administrator because there is no forgot password
                function is initialized yet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update password</Button>
      </form>
    </Form>
  );
}
