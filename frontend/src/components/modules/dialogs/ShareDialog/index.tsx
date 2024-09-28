import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const ShareDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Поделиться</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Поделиться</DialogTitle>
          <DialogDescription>
            Пригласите пользователей, написав их почту.
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-3 py-4'>
          <Input id='email' placeholder='Email' className='' />
          <Button type='submit'>Поделиться</Button>
        </div>
        <div className='grid gap-2'>
          <h1 className='text-lg font-semibold leading-none tracking-tight'>
            Участники
          </h1>
          <div className='grid gap-1 text-sm text-muted-foreground'>
            <div>Max Korobov</div>
            <div>Mila Boyarskaya</div>
            <div>Liza Korobova</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
