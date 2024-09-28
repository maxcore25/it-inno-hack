import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Head from 'next/head';
import { Plus, X } from 'lucide-react';
import { TaskColumnCard } from '@/components/elements/cards';
import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import { useRouter } from 'next/router';
import { useProjectQuery } from '@/hooks';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { KanbanBoard } from '@/components/temp3/KanbanBoard';
import { ShareDialog } from '@/components/modules/dialogs';

export const ProjectLayout = () => {
  const router = useRouter();
  const { data: project } = useProjectQuery(router.asPath.split('/')[2]);
  const [isCreatingTaskColumn, setIsCreatingTaskColumn] = useState(false);

  return (
    <>
      <Head>
        <title>{project?.name} | Доска проекта</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <div className='flex items-center'>
              <h1 className='text-lg font-semibold md:text-2xl'>
                {project?.name}
              </h1>
              <ShareDialog />
            </div>

            <KanbanBoard />

            {/* <div className='flex gap-4 after:flex-[0_0_8px] after:content-[""]'>
              {project?.task_columns.map(taskColumn => (
                <TaskColumnCard key={taskColumn.guid} taskColumn={taskColumn} />
              ))}

              {isCreatingTaskColumn ? (
                <Card className='h-fit w-[272px] p-4'>
                  <Input autoFocus placeholder='Введите заголовок колонки' />
                  <div className='mt-2 flex gap-2'>
                    <Button className='justify-start gap-1'>
                      Добавить колонку
                    </Button>
                    <Button
                      className='justify-start gap-1'
                      variant={'ghost'}
                      onClick={() => setIsCreatingTaskColumn(false)}
                    >
                      <X />
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button
                  className='justify-start gap-1'
                  variant={'outline'}
                  onClick={() => setIsCreatingTaskColumn(true)}
                >
                  <Plus className='size-4' />
                  Добавить колонку
                </Button>
              )}
            </div> */}
          </main>
        </div>
      </div>
    </>
  );
};
