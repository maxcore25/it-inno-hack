import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import Head from 'next/head';
import {
  BookmarkCheck,
  HomeIcon,
  LineChartIcon,
  PanelsTopLeft,
  Settings,
  UserCircleIcon,
  UsersIcon,
} from 'lucide-react';
import { BellIcon } from '@/components/elements/icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const ProfileLayout = () => {
  return (
    <>
      <Head>
        <title>Профиль</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
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
                  href='#'
                >
                  <HomeIcon className='h-4 w-4' />
                  Главная
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                  href='#'
                >
                  <PanelsTopLeft className='h-4 w-4' />
                  Проекты
                  {/* <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                6
              </Badge> */}
                </Link>

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
        <div className='flex flex-col overflow-hidden'>
          <header className='flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6'>
            <div className='w-full flex-1'>
              {/* <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
              placeholder='Search products...'
              type='search'
            />
          </div>
        </form> */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='rounded-full bg-background'
                  size='icon'
                  variant='secondary'
                >
                  <UserCircleIcon className='h-5 w-5' />
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem>Помощь</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='grid gap-3'>
              <h2 className='flex items-center gap-2 text-lg font-semibold md:text-2xl'>
                Профиль
              </h2>
              <Card className='w-full max-w-sm'>
                <CardHeader></CardHeader>
                <CardContent className='grid gap-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Почта</Label>
                    <Input
                      id='email'
                      type='email'
                      defaultValue='m@example.com'
                      required
                    />
                  </div>{' '}
                  <div className='grid gap-2'>
                    <Label htmlFor='username'>Имя пользователя</Label>
                    <Input id='username' defaultValue='user123' required />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Новый пароль</Label>
                    <Input id='password' type='password' required />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='confirm'>Повторите пароль</Label>
                    <Input id='confirm' type='password' required />
                  </div>
                </CardContent>
                <CardFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                  <Button className='w-fit' variant={'outline'}>
                    Отмена
                  </Button>
                  <Button className='w-fit'>Изменить</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
