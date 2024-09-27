"use client";

import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mails } from "lucide-react";
import Icon from "@/components/icon";

export function ContactMe() {
  const [contacts, setContacts] = useState<any>([]);

  const getContacts = async () => {
    const col = collection(db, "contact");
    const snapshot = await getDocs(col);
    setContacts(
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }),
    );
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="pb-36 px-48 max-[1280px]:px-24 max-[768px]:px-12">
      <h1 className="text-3xl font-medium py-12 text-zinc-50">
        <Mails />
        Contact Me
      </h1>
      <Card>
        <CardHeader />
        <CardContent>
          <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-4">
            {contacts.map((contact: any) => (
              <div key={contact.id} className="flex items-center">
                <Link className="w-full" href={contact.link}>
                  <Button className="w-full" variant="outline">
                    <Icon name={contact.icon} className="mr-2 h-4 w-4" />{" "}
                    {contact.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
