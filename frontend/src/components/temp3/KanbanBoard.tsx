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
import { Id, TaskColumnGet, TaskGet } from '@/types';
import { ColumnContainer } from './ColumnContainer';
import { TaskCard } from './TaskCard';
import { useProjectQuery } from '@/hooks';
import { useRouter } from 'next/router';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';
import {
  useCreateTaskColumnMutation,
  useMoveTaskColumnMutation,
} from '@/hooks/task-column';
import { useMoveTaskMutation, usePatchTaskMutation } from '@/hooks/task';

export function KanbanBoard() {
  const router = useRouter();
  const { data: project } = useProjectQuery(router.asPath.split('/')[2]);
  const { mutate: createTaskColumnMutation } = useCreateTaskColumnMutation();
  const { mutate: moveTaskColumnMutation } = useMoveTaskColumnMutation();
  const { mutate: moveTaskMutation } = useMoveTaskMutation();
  const { mutate: patchTaskMutation } = usePatchTaskMutation();

  const [newTaskColumnName, setNewTaskColumnName] = useState('');
  const [isCreatingTaskColumn, setIsCreatingTaskColumn] = useState(false);

  const [columns, setColumns] = useState<TaskColumnGet[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.guid), [columns]);

  const [tasks, setTasks] = useState<TaskGet[]>([]);

  const [activeColumn, setActiveColumn] = useState<TaskColumnGet | null>(null);

  const [activeTask, setActiveTask] = useState<TaskGet | null>(null);

  const [originalColumnGuid, setOriginalColumnGuid] = useState<string | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    if (project) {
      setColumns(project.task_columns.sort((a, b) => a.position - b.position));
      setTasks(project.task_columns.map(col => col.tasks.map(t => t)).flat());
    }
  }, [project]);

  const handleCancelTaskColumn = () => {
    setIsCreatingTaskColumn(false);
    setNewTaskColumnName('');
  };

  const handleCreateTaskColumn = () => {
    if (project) {
      createTaskColumnMutation({
        name: newTaskColumnName,
        project_guid: project.guid!,
        position: project.task_columns.length,
      });
    }

    createNewColumn(newTaskColumnName);
    handleCancelTaskColumn();
  };

  function createTask(columnId: string, name: string) {
    const newTask: TaskGet = {
      guid: crypto.randomUUID(),
      column_guid: columnId,
      name,
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

  function createNewColumn(name: string) {
    const columnToAdd: TaskColumnGet = {
      guid: crypto.randomUUID(),
      name,
      created_at: new Date(),
      updated_at: new Date(),
      project_guid: project?.guid!,
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
      setOriginalColumnGuid(event.active.data.current.task.column_guid);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(() => {
      if (
        activeTask &&
        originalColumnGuid &&
        activeTask.column_guid !== originalColumnGuid
      ) {
        const toColumn = columns.find(
          col => col.guid === activeTask.column_guid
        );
        patchTaskMutation({
          guid: activeTask.guid,
          model: {
            column_guid: activeTask.column_guid,
            position: toColumn ? toColumn.tasks.length : 0,
          },
        });
      }

      setOriginalColumnGuid(null);

      moveTaskMutation(
        tasks.map((task, index) => ({
          guid: task.guid,
          position: index,
        }))
      );

      return null;
    });

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

      const movedColumns = arrayMove(
        columns,
        activeColumnIndex,
        overColumnIndex
      );

      moveTaskColumnMutation(
        movedColumns.map((col, index) => ({
          guid: col.guid,
          position: index,
        }))
      );

      return movedColumns;
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

  return (
    <div className='h-scrollbar flex h-full w-full overflow-x-auto overflow-y-hidden'>
      {project && typeof project !== 'undefined' && (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
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

            {/* <button
              onClick={() => {
                createNewColumn();
              }}
              className='flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-border bg-background p-4 ring-rose-500 hover:ring-2'
            >
              Add Column
            </button> */}
            {isCreatingTaskColumn ? (
              <Card className='h-fit w-[272px] p-4'>
                <Input
                  value={newTaskColumnName}
                  onChange={e => setNewTaskColumnName(e.target.value)}
                  autoFocus
                  placeholder='Введите заголовок колонки'
                />
                <div className='mt-2 flex gap-2'>
                  <Button
                    className='justify-start gap-1'
                    onClick={handleCreateTaskColumn}
                  >
                    Добавить колонку
                  </Button>
                  <Button
                    className='justify-start gap-1'
                    variant={'ghost'}
                    onClick={handleCancelTaskColumn}
                  >
                    <X />
                  </Button>
                </div>
              </Card>
            ) : (
              <Button
                className='w-[272px] justify-start gap-1'
                variant={'outline'}
                onClick={() => setIsCreatingTaskColumn(true)}
              >
                <Plus className='size-4' />
                Добавить колонку
              </Button>
            )}
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
}
