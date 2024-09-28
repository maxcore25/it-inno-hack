import { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskGet } from '@/types';
import { Card, CardContent } from '../ui/card';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useDeleteTaskMutation, usePatchTaskMutation } from '@/hooks/task';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QUERY_KEYS } from '@/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  task: TaskGet;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

export function TaskCard({ task, deleteTask, updateTask }: Props) {
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutate: deleteTaskMutation } = useDeleteTaskMutation(task.guid);
  const [name, setName] = useState(task.name);
  const { mutate: patchTaskMutation, isSuccess } = usePatchTaskMutation();

  // const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.guid,
    data: {
      type: 'Task',
      task,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    }
  }, [isSuccess]);

  const handlePatchTask = () => {
    patchTaskMutation({
      guid: task.guid,
      model: { name },
    });
  };

  const handleDeleteTask = () => {
    deleteTaskMutation();
    deleteTask(task.guid);
  };

  // const toggleEditMode = () => {
  //   setEditMode(prev => !prev);
  //   setMouseIsOver(false);
  // };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-blue-500 bg-background p-2.5  text-left opacity-30'
      />
    );
  }

  // if (editMode) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //       className='relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-background p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500'
  //     >
  //       <textarea
  //         className='h-[90%] w-full resize-none rounded border-none bg-transparent text-foreground focus:outline-none'
  //         value={task.name}
  //         autoFocus
  //         placeholder='Task content here'
  //         onBlur={toggleEditMode}
  //         onKeyDown={e => {
  //           if (e.key === 'Enter' && e.shiftKey) {
  //             toggleEditMode();
  //           }
  //         }}
  //         onChange={e => updateTask(task.guid, e.target.value)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='group relative h-[100px] shrink-0 cursor-pointer px-3 py-2 hover:border-blue-500'
      >
        <CardContent className='p-0'>
          <p className='text-sm'>{task.name}</p>
        </CardContent>

        <div className='absolute right-1 top-1 z-10 opacity-0 transition-opacity group-hover:opacity-100'>
          <DialogTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className='size-auto rounded-full p-1'
            >
              <Pencil className='size-4' />
            </Button>
          </DialogTrigger>
          <Button
            onClick={handleDeleteTask}
            variant={'ghost'}
            size={'icon'}
            className='size-auto rounded-full p-1'
          >
            <Trash className='size-4' />
          </Button>
        </div>
      </Card>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
          <DialogDescription>
            Заполните поля, чтобы внести изменения.
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
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handlePatchTask}>
            Изменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    // <div
    //   ref={setNodeRef}
    //   style={style}
    //   {...attributes}
    //   {...listeners}
    //   onClick={toggleEditMode}
    //   className='task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-background p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500'
    //   onMouseEnter={() => {
    //     setMouseIsOver(true);
    //   }}
    //   onMouseLeave={() => {
    //     setMouseIsOver(false);
    //   }}
    // >
    //   <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
    //     {task.name}
    //   </p>

    //   {mouseIsOver && (
    //     <button
    //       onClick={() => {
    //         deleteTask(task.guid);
    //       }}
    //       className='absolute right-4 top-1/2 -translate-y-1/2 rounded bg-background stroke-white p-2 opacity-60 hover:opacity-100'
    //     >
    //       X
    //     </button>
    //   )}
    // </div>
  );
}
