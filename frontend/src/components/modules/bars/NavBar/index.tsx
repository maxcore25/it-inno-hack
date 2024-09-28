import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BookmarkCheck,
  HomeIcon,
  LineChartIcon,
  PanelsTopLeft,
  Settings,
  UsersIcon,
} from 'lucide-react';
import { BellIcon } from '@/components/elements/icons';

export const NavBar = () => {
  return (
    <div className='hidden border-r bg-background md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link className='flex items-center gap-2 font-semibold' href='#'>
            <BookmarkCheck className='h-6 w-6' />
            <span>Task Tracker</span>
          </Link>
          <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
            <BellIcon className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
              href='/'
            >
              <HomeIcon className='h-4 w-4' />
              Главная
            </Link>
            {/* <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
              href='#'
            >
              <PanelsTopLeft className='h-4 w-4' />
              Проекты
              <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                6
              </Badge>
            </Link> */}

            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
              href='#'
            >
              <UsersIcon className='h-4 w-4' />
              Участники
            </Link>
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
              href='/stats'
            >
              <LineChartIcon className='h-4 w-4' />
              Статистика
            </Link>
            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
              href='#'
            >
              <Settings className='h-4 w-4' />
              Настройки
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
