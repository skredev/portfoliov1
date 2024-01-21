"use client";

import { ModeToggle } from '@/components/ui/toggle-mode'
import Image from 'next/image'
import Link from 'next/link'

import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"

const formSchema = z.object({
    username: z.string(),
    password: z.string()
  }).refine((data) =>{
    return !!data.password;
  },
  {
    message: "Password is required",
    path: ["password"],
  }).refine((data) =>{
    return !!data.username;
  },
  {
    message: "Username is required",
    path: ["username"],
  });

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", { username: values.username, password: values.password, redirect: false, callbackUrl: "/" })
    if(response?.ok){
        const push = await router.push('/dashboard', { scroll: false });
        toast.success("Successfully logged in")
    }else{
        toast.error("Login failed", {
            description: "Surely only the wrong credentials..."
        })
    }
  }

  return (
    <main>
      <header className='sm:flex sm:justify-between py-1 px-4 border-b'>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
          <div className='flex items-center'>
            <Link href="/" className='ml-4 lg:ml-0'>
              <h1 className='text-xl font-bold'>
                skre/dashboard
              </h1>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </header>
      <div className='flex flex-col items-center justify-between p-24'>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                  <FormField control={form.control} name="username" render={({field}) => {
                  return <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                          <Input placeholder="Username" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                          This is your public display name.
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
          </Form>
      </div>
    </main>
  )
}
