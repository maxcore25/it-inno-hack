import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskGet } from '@/types';

interface Props {
  task: TaskGet;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

export function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

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
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-blue-500 bg-background p-2.5  text-left opacity-30'
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-background p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500'
      >
        <textarea
          className='h-[90%] w-full resize-none rounded border-none bg-transparent text-foreground focus:outline-none'
          value={task.name}
          autoFocus
          placeholder='Task content here'
          onBlur={toggleEditMode}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={e => updateTask(task.guid, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className='task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-background p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue-500'
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
        {task.name}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.guid);
          }}
          className='absolute right-4 top-1/2 -translate-y-1/2 rounded bg-background stroke-white p-2 opacity-60 hover:opacity-100'
        >
          X
        </button>
      )}
    </div>
  );
}
