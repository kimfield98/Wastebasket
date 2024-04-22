'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon as OutlineHomeIcon } from '@heroicons/react/24/outline';
import { HomeIcon as SolidHomeIcon } from '@heroicons/react/24/solid';
import { UserIcon as OutlineUserIcon } from '@heroicons/react/24/outline';
import { UserIcon as SolidUserIcon } from '@heroicons/react/24/solid';
import { PuzzlePieceIcon as OutlinePuzzlePieceIcon } from '@heroicons/react/24/outline';
import { PuzzlePieceIcon as SolidPuzzlePieceIcon } from '@heroicons/react/24/solid';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div>
      {children}
      <div className='fixed bottom-0 w-full mx-auto max-w-screen grid grid-cols-3 p-5 bg-white text-[#5f7a85]'>
        <Link href='/home' className='flex flex-col items-center gap-px'>
          {pathname === '/home' ? (
            <SolidHomeIcon className='h-6 w-6' />
          ) : (
            <OutlineHomeIcon className='h-6 w-6' />
          )}
        </Link>
        <Link href='/match' className='flex flex-col items-center gap-px'>
          {pathname === '/match' ? (
            <SolidPuzzlePieceIcon className='h-6 w-6' />
          ) : (
            <OutlinePuzzlePieceIcon className='h-6 w-6' />
          )}
        </Link>
        <Link href='/profile' className='flex flex-col items-center gap-px'>
          {pathname === '/profile' ? (
            <SolidUserIcon className='h-6 w-6' />
          ) : (
            <OutlineUserIcon className='h-6 w-6' />
          )}
        </Link>
      </div>
    </div>
  );
}
