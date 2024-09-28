import Link from 'next/link';
import { BookmarkCheck } from 'lucide-react';

export const LogoHeader = () => {
  return (
    <header className='fixed top-0 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href='#'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <BookmarkCheck className='h-6 w-6' />
          <span>Task Tracker</span>
        </Link>
      </nav>
    </header>
  );
};
