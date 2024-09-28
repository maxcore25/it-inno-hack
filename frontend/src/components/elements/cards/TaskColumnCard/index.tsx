import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TaskCard } from '..';
import { Ellipsis, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TaskColumnGet } from '@/types';
import { useState } from 'react';

type TaskColumnProps = {
  taskColumn: TaskColumnGet;
  name?: string | number;
  tasks?: (string | number)[];
};

export const TaskColumnCard = ({ taskColumn }: TaskColumnProps) => {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <div className='grid h-fit max-h-[800px] w-[272px] shrink-0 gap-4 overflow-y-auto rounded-lg bg-white p-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>{taskColumn.name}</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='size-6 rounded-full' variant='link' size='icon'>
              <Ellipsis className='size-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-44'>
            <div className='flex flex-col gap-2'>
              <h4 className='font-medium leading-none'>Действия со списком</h4>
              <ul className='space-y-2'>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='grid gap-2'>
        {taskColumn.tasks?.map(task => (
          <TaskCard key={task.guid} task={task} />
        ))}
      </div>
      {isCreatingTask ? (
        <Card className='h-fit border-none px-0 pb-4 shadow-none'>
          <Textarea autoFocus placeholder='Введите заголовок задачи' />
          <div className='mt-2 flex gap-2'>
            <Button className='justify-start gap-1'>Добавить задачу</Button>
            <Button
              className='justify-start gap-1'
              variant={'ghost'}
              onClick={() => setIsCreatingTask(false)}
            >
              <X />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          className='justify-start gap-1'
          variant={'ghost'}
          onClick={() => setIsCreatingTask(true)}
        >
          <Plus className='size-4' />
          Добавить карточку
        </Button>
      )}
    </div>
  );
};
