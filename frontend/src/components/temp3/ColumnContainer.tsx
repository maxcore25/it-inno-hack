import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useMemo, useState } from 'react';
import { TaskColumnGet, TaskGet } from '@/types';
import { TaskCard } from './TaskCard';
import { Ellipsis, Plus, X } from 'lucide-react';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  useDeleteTaskColumnMutation,
  usePatchTaskColumnMutation,
} from '@/hooks/task-column';
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
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { useCreateTaskMutation } from '@/hooks/task';

interface Props {
  column: TaskColumnGet;
  tasks: TaskGet[];
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
  createTask: (columnId: string, name: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
}

export function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  // const [editMode, setEditMode] = useState(false);

  const {
    mutate: deleteTaskColumnMutation,
    isSuccess: isDeleteTaskColumnSuccess,
  } = useDeleteTaskColumnMutation(column.guid);
  const { mutate: createTaskMutation, isSuccess: isCreateTaskSuccess } =
    useCreateTaskMutation();

  const [name, setName] = useState(column.name);
  const {
    mutate: patchTaskColumnMutation,
    isSuccess: isPatchTaskColumnSuccess,
  } = usePatchTaskColumnMutation(column.guid, { name });

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.guid);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.guid,
    data: {
      type: 'Column',
      column,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    if (
      isPatchTaskColumnSuccess ||
      isCreateTaskSuccess ||
      isDeleteTaskColumnSuccess
    ) {
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    }
  }, [
    isPatchTaskColumnSuccess,
    isCreateTaskSuccess,
    isDeleteTaskColumnSuccess,
  ]);

  const handlePatchTaskColumn = () => {
    patchTaskColumnMutation();
  };

  const handleDeleteTaskColumn = () => {
    deleteTaskColumnMutation();
    deleteColumn(column.guid);
  };

  const handleCancelTask = () => {
    setIsCreatingTask(false);
    setNewTaskName('');
  };

  const handleCreateTask = () => {
    createTaskMutation({
      name: newTaskName,
      column_guid: column.guid,
      position: column.tasks.length,
    });
    createTask(column.guid, newTaskName);
    handleCancelTask();
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        // className='flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-background opacity-40'
        className='flex h-[600px] w-[272px] flex-col rounded-md border-2 border-blue-500 bg-background opacity-40'
      ></div>
    );
  }

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <div
        ref={setNodeRef}
        style={style}
        // className='flex h-[500px] max-h-[500px] w-[272px] flex-col rounded-md bg-background'
        // className='grid h-fit max-h-[800px] w-[272px] shrink-0 gap-4 overflow-y-auto rounded-lg bg-white p-4 shadow-md'
        className='flex h-[600px] w-[272px] flex-col rounded-lg bg-background'
      >
        <div
          {...attributes}
          {...listeners}
          // onClick={() => {
          //   setEditMode(true);
          // }}
          className='text-md flex h-[60px] cursor-grab items-center justify-between p-3'
        >
          <div className='flex gap-2 text-lg font-semibold'>
            {column.name}
            {/* {!editMode && column.name}
          {editMode && (
            <input
              className='rounded border bg-background px-2 outline-none focus:border-rose-500'
              value={column.name}
              onChange={e => updateColumn(column.guid, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )} */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='size-6 rounded-full'
                variant='link'
                size='icon'
              >
                <Ellipsis className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' side='right'>
              <DropdownMenuLabel>Действия с колонкой</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DialogTrigger asChild>
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem onClick={handleDeleteTaskColumn}>
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <button
          onClick={() => {
            deleteColumn(column.guid);
          }}
          className='rounded stroke-gray-500 px-1 py-2 hover:bg-background hover:stroke-white'
        >
          X
        </button> */}
        </div>

        <div className='v-scrollbar flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2'>
          <SortableContext items={tasksIds}>
            {tasks.map(task => (
              <TaskCard
                key={task.guid}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>

        <div className='p-2'>
          {isCreatingTask ? (
            <Card className='h-fit border-none px-0 shadow-none'>
              <Textarea
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
                autoFocus
                placeholder='Введите заголовок задачи'
              />
              <div className='mt-2 flex gap-2'>
                <Button
                  className='justify-start gap-1'
                  onClick={handleCreateTask}
                >
                  Добавить задачу
                </Button>
                <Button
                  className='justify-start gap-1'
                  variant={'ghost'}
                  onClick={handleCancelTask}
                >
                  <X />
                </Button>
              </div>
            </Card>
          ) : (
            <Button
              className='w-full justify-start gap-1'
              variant={'ghost'}
              onClick={() => setIsCreatingTask(true)}
            >
              <Plus className='size-4' />
              Добавить задачу
            </Button>
          )}
        </div>

        {/* <button
        className='hover:bg-mainBackgroundColor flex items-center gap-2 rounded-md border-2 border-border border-x-border p-4 hover:text-rose-500 active:bg-black'
        onClick={() => {
          createTask(column.guid);
        }}
      >
        Add task
      </button> */}
      </div>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Редактировать колонку</DialogTitle>
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
          <Button type='submit' onClick={handlePatchTaskColumn}>
            Изменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
