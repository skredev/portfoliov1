"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LogOut, Settings } from "lucide-react";
import { ModeToggle } from "./ui/toggle-mode";
import { User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { version } from '@/../package.json';

export function Navbar() {
    const [isUserValid, setIsUserValid] = useState(false);
    const router = useRouter();

    useEffect(() => {
    const checkAuth = () => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            setIsUserValid(true);
        }
        });
    };

    checkAuth();
    }, []);


    if(isUserValid){
        return(
            <nav>
                <div className='relative px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between w-full'>
                    <div className='flex items-center'>
                        <Link href="/" className="flex items-center gap-2.5">
                            <img className="w-10 h-10" src="/favicon.ico"></img>
                            <h2 className="text-xl font-bold">skre/dashboard</h2>
                        </Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                    <Link
                                    href="/dashboard"
                                    className={buttonVariants({ variant: "outline", size: "icon" })}
                                    >
                                    <User className="h-[1.1rem] w-[1.1rem]" />
                                    </Link>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => {router.push("/dashboard")}} className='hover: cursor-pointer'>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='hover: cursor-pointer' disabled>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => 
                                    signOut(auth).then(() => {
                                        toast.success("Successfully logged out")
                                        }).catch((error) => {
                                        toast.error("Something went wrong...")
                                        })
                                    } className='hover: cursor-pointer'>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='pb-0 pt-2 hover: cursor-pointer' disabled>
                                <span className="text-xs whitespace-break-spaces">{auth.currentUser?.uid}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='pt-0 pb-0 hover: cursor-pointer' disabled>
                                <span className="text-xs whitespace-break-spaces">{auth.currentUser?.metadata.lastSignInTime}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='pt-0 hover: cursor-pointer' disabled>
                                <span className="text-xs whitespace-break-spaces">v {process.env.version}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        )
    }else{
        return(
            <nav>
                <div className='relative px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between w-full'>
                    <div className='flex items-center'>
                        <Link href="/" className="flex items-center gap-2.5">
                            <img className="w-10 h-10" src="/favicon.ico"></img>
                            <h2 className="text-xl font-bold">skre/dashboard</h2>
                        </Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <ModeToggle />
                        {
                            isUserValid ? (
    
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                            <Link
                                            href="/dashboard"
                                            className={buttonVariants({ variant: "outline", size: "icon" })}
                                            >
                                            <User className="h-[1.1rem] w-[1.1rem]" />
                                            </Link>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => {router.push("/dashboard")}} className='hover: cursor-pointer'>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => 
                                            signOut(auth).then(() => {
                                                toast.success("Successfully logged out")
                                                window.location.reload()
                                              }).catch((error) => {
                                                toast.error("Something went wrong...")
                                              })
                                            } className='hover: cursor-pointer'>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
    
                            ) : (
                                <Link
                                href="/login"
                                className={buttonVariants({ variant: "outline", size: "default" })}
                                >
                                    LOGIN
                                </Link>
                            )
                        }
                    </div>
                </div>
            </nav>
        )
    }
}