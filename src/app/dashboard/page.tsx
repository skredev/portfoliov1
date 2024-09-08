"use client"

import { auth } from "@/lib/firebase";
import { Hand } from "lucide-react";
import { ProjectsTable } from "./components/projects/projects-table";
import { CreateProject } from "./components/projects/create-project";
import { Information } from "./components/info";
import { ContactTable } from "./components/contact/contact-table";
import { CreateContact } from "./components/contact/create-contact";
 
export default function Dashboard() {
  return (
    <div className='py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
        <h1 className='text-3xl font-medium py-12 text-zinc-50'><Hand />Welcome, {auth.currentUser?.email}!</h1>
        <div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
          <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
            <Information />
            <CreateProject />
            <CreateContact />
          </div>
          <div className="col-span-2 grid items-start gap-6 pt-6 md:pt-0">
            <ProjectsTable />
            <ContactTable />
          </div>
        </div>
    </div>
  );
}
