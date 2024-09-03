"use client";

import { auth } from "@/lib/firebase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);


  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        } else {
          router.push("/login");
        }
      });
    };

    checkAuth();
  }, []);

  if (isUserValid) {
    return (
        children
    );
  }
}