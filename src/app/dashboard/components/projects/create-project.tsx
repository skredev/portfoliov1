"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as z from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore as db } from "@/lib/firebase/firebase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

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

export function CreateProject(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          link: "",
          status: ""
        }
      });

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
        <Card>
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
    )
}