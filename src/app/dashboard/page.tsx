"use client"

import { auth } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownRightFromCircle, Hand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Projects, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import { firestore as db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
 
const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    link: z.string(),
    status: z.string()
  }).refine((data) =>{
    return !!data.link;
  },
  {
    message: "Link is required",
    path: ["link"],
  }).refine((data) =>{
    return !!data.description;
  },
  {
    message: "Description is required",
    path: ["description"],
  }).refine((data) =>{
    return !!data.name;
  },
  {
    message: "Name is required",
    path: ["name"],
  });

export default function Dashboard() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          link: "",
          status: ""
        }
      });

    const [projects, setProjects] = useState<any>([])

    const getProjects = async () => {
      const col = collection(db, "public_projects");
      const snapshot = await getDocs(col);
      setProjects(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }));
    }
    
    useEffect(() => {
      getProjects()
    }, []) 

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const col = collection(db, "public_projects");
        try{
            await setDoc(doc(db, "public_projects", values.name), {
                id: values.name,
                name: values.name,
                description: values.description,
                link: values.link,
                status: values.status
            }).then(() => {
                toast.success("Successfully created project")
                window.location.reload()
            })
        }catch(error){
            toast.error("Creation failed", {
                description: "Surely only a coincidence..."
            })
            console.log(error)
        }
    };

  return (
    <div className='py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
        <h1 className='text-3xl font-medium py-12 text-zinc-50'><Hand />Welcome, {auth.currentUser?.email}!</h1>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-1 2xl:grid-cols-2'>
          <DataTable columns={columns} data={projects} />
          <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Display your project in one-click.</CardDescription>
            </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                            <FormField control={form.control} name="name" render={({field}) => {
                            return <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name of your project" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }} />
                            <FormField control={form.control} name="description" render={({field}) => {
                            return <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description of your project" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }} />
                            <FormField control={form.control} name="link" render={({field}) => {
                            return <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="Link of your project" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }} />
                            <FormField control={form.control} name="status" render={({field}) => {
                            return <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="DONE">DONE</SelectItem>
                                        <SelectItem value="WIP">WIP</SelectItem>
                                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }} />
                            <div className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button type="submit">Deploy</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
