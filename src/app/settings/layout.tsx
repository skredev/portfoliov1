"use client";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarNav } from "./components/sidebar-nav";

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const [isUserValid, setIsUserValid] = useState(false);

  const sidebarNavItems = [
    {
      title: "Account",
      href: "/settings/account",
    },
  ]


  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        } else {
          useRouter().push("/login");
        }
      });
    };

    checkAuth();
  }, []);

  if (isUserValid) {
    return(
    <div className="space-y-6 pt-12 p-10 pb-16 md:block px-48 max-[1280px]:px-24 max-[768px]:px-12">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
    )
  }
}