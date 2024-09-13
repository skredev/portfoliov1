"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore as db } from "@/lib/firebase/firebase";

export function ContactTable(){

    const [contacts, setContacts] = useState<any>([])

    const getProjects = async () => {
      const col = collection(db, "contact");
      const snapshot = await getDocs(col);
      setContacts(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }));
    }
    
    useEffect(() => {
      getProjects()
    }, []) 

    return (
        <DataTable columns={columns} data={contacts} />
    )
}