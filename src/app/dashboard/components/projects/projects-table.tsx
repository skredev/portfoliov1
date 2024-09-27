"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore as db } from "@/lib/firebase/firebase";

export function ProjectsTable() {
  const [projects, setProjects] = useState<any>([]);

  const getProjects = async () => {
    const col = collection(db, "public_projects");
    const snapshot = await getDocs(col);
    setProjects(
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }),
    );
  };

  useEffect(() => {
    getProjects();
  }, []);

  return <DataTable columns={columns} data={projects} />;
}
