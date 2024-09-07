"use client"

import { auth } from "@/lib/firebase";
import { Hand } from "lucide-react";
import { ProjectsTable } from "./components/projects/projects-table";
import { CreateProject } from "./components/projects/create-project";
 
export default function Dashboard() {
  return (
    <div className='py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
        <h1 className='text-3xl font-medium py-12 text-zinc-50'><Hand />Welcome, {auth.currentUser?.email}!</h1>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-1 2xl:grid-cols-2'>
          <ProjectsTable />
          <CreateProject />
        </div>
    </div>
  );
}
