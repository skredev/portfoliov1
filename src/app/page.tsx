import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRightFromCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='py-12 px-48 max-[1280px]:px-24 max-[768px]:px-12'>
    <h1 className='text-3xl font-medium py-12'>Welcome!</h1>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
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

      <Card className='break-all'>
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
              <ArrowDownRightFromCircle className="mr-2 h-4 w-4 break-all" /> Open NGINXProxyManager
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
  );
}
