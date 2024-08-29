import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { ModeToggle } from "@/components/ui/toggle-mode"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { buttonVariants } from "@/components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'skre/dashboard',
  description: 'In times of change',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav>
            <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
              <div className='flex items-center'>
                <Link href="/" className='ml-4 lg:ml-0'>
                  <h1 className='text-xl font-bold'>
                    skre/dashboard
                  </h1>
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <Link
                  href="https://github.com/sprechblase"
                  className={buttonVariants({ variant: "ghost", size: "icon" })}
                >
                  <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
                </Link>
                <ModeToggle />
              </div>
            </div>
          </nav>
          <main>
            {children}
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
