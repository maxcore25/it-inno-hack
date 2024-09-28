import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QUERY_KEYS } from '@/constants';
import { useCreateProjectMutation } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export const CreateProjectDialog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { mutate, isSuccess } = useCreateProjectMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='h-[100px] gap-2 bg-muted'>
          <Plus />
          Создать проект
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Создать проект</DialogTitle>
          <DialogDescription>
            Заполните поля, чтобы создать проект.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid items-center gap-2'>
            <Label htmlFor='name'>Название</Label>
            <Input
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='grid items-center gap-2'>
            <Label htmlFor='description'>Описание</Label>
            <Textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={() => mutate({ name, description })}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
