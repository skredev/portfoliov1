import { ModeToggle } from '@/components/ui/toggle-mode'
import Image from 'next/image'
import Link from 'next/link'

export default async function Dashboard() {
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
          <ModeToggle />
        </div>
      </header>
    </main>
  )
}