"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRightFromCircle, DoorOpen, Mails} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firestore as db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Icon from "@/components/icon"

export default function Home() {
  const [projects, setProjects] = useState<any>([])
  const [contacts, setContacts] = useState<any>([])

  const getProjects = async () => {
    const col = collection(db, "public_projects"); // accessing public projects collection
    const snapshot = await getDocs(col); // making a snapshot of the data
    setProjects(snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data() // saving the data
      }
    }));
  }

  const getContacts = async () => {
    const col = collection(db, "contact"); // accessing contact collection
    const snapshot = await getDocs(col); // making a snapshot of the data
    setContacts(snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data() // saving the data
      }
    }));
  }
  
  useEffect(() => {
    getProjects()
    getContacts()
  }, []) 

  return (
  <main>
    <div className='py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
      <h1 className='text-3xl font-medium py-12 text-zinc-50'><DoorOpen />Public Projects</h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
        {
          projects.map((project : any) => (
            <div key={project.id}>
              <Card>
                <div className="flex justify-end">
                  <Badge variant={project.status} className="m-3">{project.status}</Badge>
                </div>
                <CardHeader className="pt-0">
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link className="w-full" href={project.link}>
                    <Button className="w-full" variant="outline">
                      <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open {project.name}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
    <div className='pb-36 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
      <h1 className='text-3xl font-medium py-12 text-zinc-50'><Mails />Contact Me</h1>
      <Card>
        <CardHeader />
        <CardContent>
          <div className='grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-4'>
            {
              contacts.map((contact: any) => (
                <div key={contact.id} className="flex items-center">
                  <Link className="w-full" href={contact.link}>
                    <Button className="w-full" variant="outline">
                      <Icon name={contact.icon} className="mr-2 h-4 w-4" /> {contact.name}
                    </Button>
                  </Link>
                </div>
              ))
            }
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  </main>
  );
}