"use client";

import { ModeToggle } from '@/components/ui/toggle-mode'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react';
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react';
import { ArrowDownRightFromCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LogOut, User } from "lucide-react"
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data } = useSession();
  const router = useRouter();
  
  const handleLogout = async () => {
    signOut();
    toast.success("Successfully logged out");
  }

  return (
    <main>
      <header className='sm:flex sm:justify-between py-1 px-4 border-b'>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
          <div className='flex items-center'>
            <Link href="/" className='ml-4 lg:ml-0'>
              <h1 className='text-xl font-bold'>
                skre/dashboard
              </h1>
            </Link>
          </div>
          <div className='flex items-center'>
            <div className='ml-4 lg:ml-0 px-5 text-l hover: cursor-pointer'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={data?.user.image} />
                    <AvatarFallback>{data?.user.name.substr(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => {router.push('/dashboard/user')}} className='hover: cursor-pointer'>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()} className='hover: cursor-pointer'>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className='px-48 py-12'>
        <h1 className='text-3xl font-medium py-12'>Welcome, {data?.user.name}!</h1>
        <div className='grid grid-cols-3 gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Nextcloud</CardTitle>
              <CardDescription>a safe place for all your data</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="https://c.skre.dev">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open Nextcloud
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excalidraw</CardTitle>
              <CardDescription>virtual collaborative whiteboard tool</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="https://d.skre.dev">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open Excalidraw
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zipline</CardTitle>
              <CardDescription>ShareX / File upload server</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="https://s.skre.dev">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open Zipline
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IT-Tools</CardTitle>
              <CardDescription>Handy tools for developers</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="https://t.skre.dev">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open IT-Tools
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NGINXProxyManager</CardTitle>
              <CardDescription>Managing Nginx proxy hosts with a powerful interface</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="http://161.97.125.45:81/">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open NGINXProxyManager
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portainer</CardTitle>
              <CardDescription>Container management software</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="https://p.skre.dev">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open Portainer
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PGAdmin</CardTitle>
              <CardDescription>PostgreSQL administration</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={''} alt={''}></Image>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href="http://161.97.125.45:5051/">
                <Button className="w-full" variant="outline">
                  <ArrowDownRightFromCircle className="mr-2 h-4 w-4" /> Open PGAdmin
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}