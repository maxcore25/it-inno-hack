import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import { Column, Id, Task, TaskColumnGet, TaskGet } from '@/types';
import { TaskCard } from './TaskCard';

interface Props {
  column: TaskColumnGet;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;

  createTask: (columnId: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
  tasks: TaskGet[];
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
  const [editMode, setEditMode] = useState(false);

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
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-background opacity-40'
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-background'
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className='text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-border bg-background p-3 font-bold'
      >
        <div className='flex gap-2'>
          {!editMode && column.name}
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
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.guid);
          }}
          className='rounded stroke-gray-500 px-1 py-2 hover:bg-background hover:stroke-white'
        >
          X
        </button>
      </div>

      {/* Column task container */}
      <div className='flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2'>
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
      {/* Column footer */}
      <button
        className='hover:bg-mainBackgroundColor flex items-center gap-2 rounded-md border-2 border-border border-x-border p-4 hover:text-rose-500 active:bg-black'
        onClick={() => {
          createTask(column.guid);
        }}
      >
        Add task
      </button>
    </div>
  );
}
