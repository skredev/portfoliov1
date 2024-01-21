import { ModeToggle } from '@/components/ui/toggle-mode'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  redirect('/dashboard');
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
            <ModeToggle />
          </div>
        </div>
      </header>
    </main>
  )
}