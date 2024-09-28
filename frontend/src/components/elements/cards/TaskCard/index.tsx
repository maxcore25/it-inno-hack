import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskGet } from '@/types';

type TaskCardProps = {
  task: TaskGet;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className='cursor-pointer px-3 py-2 hover:border-blue-500'>
            <CardContent className='p-0'>
              <p className='text-sm'>{task.name}</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <div className='mt-4 grid gap-3'>
            <Input defaultValue={'Задача 1'} />
            <Textarea
              defaultValue={
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima rerum ipsam officia odit, blanditiis dolore asperiores, a ex maxime illum molestias pariatur quisquam fugit perspiciatis minus ab delectus nulla? Dolorum.'
              }
              rows={10}
            />
          </div>

          <DialogFooter>
            <Button variant={'outline'}>Удалить</Button>
            <Button type='submit'>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
