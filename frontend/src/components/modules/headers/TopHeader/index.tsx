import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { UserCircleIcon } from 'lucide-react';

export const TopHeader = () => {
  return (
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
  );
};
