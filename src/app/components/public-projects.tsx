"use client";

import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownRightFromCircle, DoorOpen } from "lucide-react";

export function PublicProjects() {
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

  return (
    <div className="py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12">
      <h1 className="text-3xl font-medium py-12 text-zinc-50">
        <DoorOpen />
        Public Projects
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project: any) => (
          <div key={project.id}>
            <Card>
              <div className="flex justify-end">
                <Badge variant={project.status} className="m-3">
                  {project.status}
                </Badge>
              </div>
              <CardHeader className="pt-0">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link className="w-full" href={project.link}>
                  <Button className="w-full" variant="outline">
                    <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open{" "}
                    {project.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
