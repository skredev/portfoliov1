"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/firebase";
import { updateEmail } from "firebase/auth";
import { toast } from "sonner"
import { ReauthComponent } from "@/components/reauth-dialog"
import { useState } from "react"

const accountFormSchema = z.object({
  email: z
    .string().email({
        message: "Please provide a valid email.",
    })
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function EmailForm() {

  const [isReauthOpen, setIsReauthOpen] = useState(false);

  let defaultValues: Partial<AccountFormValues> = {
    email: auth.currentUser?.email as any
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  function onSubmit(data: AccountFormValues) {
    updateEmail(auth.currentUser as any, data['email']).then(() => {
      toast.success("Successfully changed email", {
        description: "New: " + JSON.stringify(data, null, 2)
      })
    }).catch((error) => {
      toast.error("Please reauthenticate")
      setIsReauthOpen(true);
    });
  }

  return (
    <Form {...form}>
      <ReauthComponent
        isOpen={isReauthOpen}
        setIsOpen={setIsReauthOpen}
      />
        
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be used for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update email</Button>
      </form>
    </Form>
  )
}