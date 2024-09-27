"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore as db } from "@/lib/firebase/firebase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string(),
    icon: z.string(),
    link: z.string(),
  })
  .refine(
    (data) => {
      return !!data.link;
    },
    {
      message: "Link is required",
      path: ["link"],
    },
  )
  .refine(
    (data) => {
      return !!data.icon;
    },
    {
      message: "Icon is required",
      path: ["icon"],
    },
  )
  .refine(
    (data) => {
      return !!data.name;
    },
    {
      message: "Name is required",
      path: ["name"],
    },
  );

export function CreateContact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      link: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const col = collection(db, "contact");
    try {
      await setDoc(doc(db, "contact", values.name), {
        id: values.name,
        name: values.name,
        icon: values.icon,
        link: values.link,
      }).then(() => {
        toast.success("Successfully created contact");
        window.location.reload();
      });
    } catch (error) {
      toast.error("Creation failed", {
        description: "Surely only a coincidence...",
      });
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create contact</CardTitle>
        <CardDescription>Display your contact methods</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of your contact"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Icon of your contact"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <span className="text-sm text-muted-foreground inline-flex">
                        Use vanilla Lucide{" "}
                        <Link href="https://lucide.dev/icons/">
                          <Icon
                            name="move-up-right"
                            className="h-5 w-5 font-extrabold pr-2"
                          />
                        </Link>{" "}
                        icon names
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link of your contact"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Deploy</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
