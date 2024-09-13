"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string(),
  password: z.string()
}).refine((data) =>{
  return !!data.password;
},
{
  message: "Password is required",
  path: ["password"],
}).refine((data) =>{
  return !!data.email;
},
{
  message: "Email is required",
  path: ["email"],
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      toast.success("Successfully logged in")
      router.push("/dashboard")
    })
    .catch((error) => {
      toast.error("Login failed", {
        description: "Surely only the wrong credentials..."
      })
    });
  };

  return (
    <div className='flex flex-col items-center justify-between p-24'>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
              <FormField control={form.control} name="email" render={({field}) => {
              return <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                      This is your public email
                  </FormDescription>
                  <FormMessage />
              </FormItem>
              }} />
              <FormField control={form.control} name="password" render={({field}) => {
              return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              }} />
              <Button type="submit">Login</Button>
          </form>
          <span className="text-xs pt-2 text-muted-foreground">v {process.env.version}</span>
      </Form>
    </div>
  )
}
