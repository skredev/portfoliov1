"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { firestore as db } from "@/lib/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";

export type Projects = {
  name: string;
  description: string;
  link: string;
  status: "DONE" | "WIP" | "INACTIVE";
};

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const projectsAction = row.original;
      let id;

      async function deleteItem(id: string) {
        const itemRef = doc(db, "public_projects", id);
        try {
          await deleteDoc(itemRef).then(() => {
            toast.success("Successfully deleted project");
            window.location.reload();
          });
        } catch (error) {
          toast.error("Deletion failed", {
            description: "Surely only a coincidence...",
          });
          console.log(error);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteItem(projectsAction.name)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
