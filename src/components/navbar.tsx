"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ImageUp, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { ModeToggle } from "./ui/toggle-mode";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export function Navbar() {
  const [isUserValid, setIsUserValid] = useState(false);
  const router = useRouter();

  // Checking if user is logged in
  useEffect(() => {
    let checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        }
      });
    };

    checkAuth();
  }, []);

  return (
    <nav>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/favicon.ico" width={40} height={40} alt="Favicon" />
            <h2 className="text-xl font-bold">skre/dev</h2>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          {isUserValid ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <User className="h-[1.1rem] w-[1.1rem]" />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                    className="hover: cursor-pointer"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.assign("https://up.skre.dev/");
                    }}
                    className="hover: cursor-pointer"
                  >
                    <ImageUp className="mr-2 h-4 w-4" />
                    <span>Zipline</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/settings");
                    }}
                    className="hover: cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    // Logout
                    signOut(auth)
                      .then(() => {
                        toast.success("Successfully logged out");
                        setIsUserValid(false);
                      })
                      .catch((error) => {
                        toast.error("Something went wrong...");
                      })
                  }
                  className="hover: cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="pb-0 pt-2 hover: cursor-pointer"
                  disabled
                >
                  <span className="text-xs whitespace-break-spaces">
                    {auth.currentUser?.uid}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="pt-0 pb-0 hover: cursor-pointer"
                  disabled
                >
                  <span className="text-xs whitespace-break-spaces">
                    {auth.currentUser?.metadata.lastSignInTime}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="pt-0 hover: cursor-pointer"
                  disabled
                >
                  <span className="text-xs whitespace-break-spaces">
                    v {process.env.version}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "default",
              })}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
