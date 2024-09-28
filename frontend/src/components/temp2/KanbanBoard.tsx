import { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { Column, Id, Task, TaskBase, TaskColumnGet, TaskGet } from '@/types';
import { ColumnContainer } from './ColumnContainer';
import { TaskCard } from './TaskCard';
import { useProjectQuery } from '@/hooks';
import { useRouter } from 'next/router';

const defaultCols: TaskColumnGet[] = [
  {
    guid: '5953de7e-f584-4694-b5ef-3ba3ce538db0',
    name: 'Todo',
    created_at: new Date(),
    updated_at: new Date(),
    project_guid: '4794783d-15d1-4e74-b51c-ca61ed82b011',
    position: 0,
    tasks: [],
  },
  {
    guid: 'e77833dd-a153-4c89-8f80-b05b558bb02f',
    name: 'Work in progress',
    created_at: new Date(),
    updated_at: new Date(),
    project_guid: '4794783d-15d1-4e74-b51c-ca61ed82b011',
    position: 1,
    tasks: [],
  },
  {
    guid: '34c8a70f-6a7a-43e6-a0dd-1e3f60611fc3',
    name: 'Done',
    created_at: new Date(),
    updated_at: new Date(),
    project_guid: '4794783d-15d1-4e74-b51c-ca61ed82b011',
    position: 2,
    tasks: [],
  },
];

const defaultTasks: TaskGet[] = [
  {
    guid: '1',
    column_guid: '5953de7e-f584-4694-b5ef-3ba3ce538db0',
    name: 'List admin APIs for dashboard',
    created_at: new Date(),
    updated_at: new Date(),
    position: 0,
  },
  {
    guid: '2',
    column_guid: 'e77833dd-a153-4c89-8f80-b05b558bb02f',
    name: 'Implement error logging and monitoring',
    created_at: new Date(),
    updated_at: new Date(),
    position: 0,
  },
  {
    guid: '3',
    column_guid: '34c8a70f-6a7a-43e6-a0dd-1e3f60611fc3',
    name: 'Optimize application performance',
    created_at: new Date(),
    updated_at: new Date(),
    position: 0,
  },
];

export function KanbanBoard() {
  const router = useRouter();
  const { data: project } = useProjectQuery(router.asPath.split('/')[2]);

  const [columns, setColumns] = useState<TaskColumnGet[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.guid), [columns]);

  const [tasks, setTasks] = useState<TaskGet[]>([]);

  const [activeColumn, setActiveColumn] = useState<TaskColumnGet | null>(null);

  const [activeTask, setActiveTask] = useState<TaskGet | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    if (project) {
      setColumns(project.task_columns);
      setTasks(project.task_columns.map(col => col.tasks.map(t => t)).flat());

      // console.log(
      //   project.task_columns.map(col => col.tasks.map(t => t)).flat()
      // );
    }
  }, [project]);

  return (
    <div className='flex h-full w-full overflow-x-auto overflow-y-hidden'>
      {project && typeof project !== 'undefined' && (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className='flex gap-4'>
            <div className='flex gap-4'>
              <SortableContext items={columnsId}>
                {columns.map(col => (
                  <ColumnContainer
                    key={col.guid}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter(task => task.column_guid === col.guid)}
                  />
                ))}
              </SortableContext>
            </div>
            <button
              onClick={() => {
                createNewColumn();
              }}
              className='flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-border bg-background p-4 ring-rose-500 hover:ring-2'
            >
              Add Column
            </button>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    task => task.column_guid === activeColumn.guid
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      )}
    </div>
  );

  function createTask(columnId: string) {
    const newTask: TaskGet = {
      guid: generateId(),
      column_guid: columnId,
      name: `Task ${tasks.length + 1}`,
      position: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter(task => task.guid !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map(task => {
      if (task.guid !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: TaskColumnGet = {
      guid: generateId(),
      name: 'New column',
      created_at: new Date(),
      updated_at: new Date(),
      project_guid: '4794783d-15d1-4e74-b51c-ca61ed82b011',
      position: 0,
      tasks: [],
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter(col => col.guid !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter(t => t.column_guid !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map(col => {
      if (col.guid !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    console.log('DRAG END');

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.guid === activeId);

      const overColumnIndex = columns.findIndex(col => col.guid === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.guid === activeId);
        const overIndex = tasks.findIndex(t => t.guid === overId);

        if (tasks[activeIndex].column_guid != tasks[overIndex].column_guid) {
          // Fix introduced after video recording
          tasks[activeIndex].column_guid = tasks[overIndex].column_guid;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.guid === activeId);

        // @ts-ignore
        tasks[activeIndex].column_guid = overId;
        console.log('DROPPING TASK OVER COLUMN', { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  // return Math.floor(Math.random() * 10001);
  return crypto.randomUUID();
}
