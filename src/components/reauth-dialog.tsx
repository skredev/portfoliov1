"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Button } from "./ui/button"
import { auth } from "@/lib/firebase";
import { Input } from "./ui/input"
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { toast } from "sonner"

const formSchema = z.object({
    password: z.string()
  }).refine((data) =>{
    return !!data.password;
  },
  {
    message: "Password is required",
    path: ["password"],
  });

export function ReauthComponent({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          password: ""
        }
    });

    // Reauth Function
    const handleSubmit = async (values: any) => {
      const user = auth.currentUser;
      try {
        const credential = EmailAuthProvider.credential(user?.email as any, values.password);
        await reauthenticateWithCredential(user as any, credential).then(() => {
          toast.success("Successfully reauthenticated", {
            description: "Now try again"
          })
        })
      } catch (error) {
        toast.error("Reauthentication failed", {
          description: "Surely only the wrong credentials..."
        })
      }
    };


    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                  <DialogTitle>Please reauthenticate</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                <FormField control={form.control} name="password" render={({field}) => {
                return <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                }} />
                <Button type="submit">Reauthenticate</Button>
              </form>
            </DialogContent>
        </Dialog>
    )
}