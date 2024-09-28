import { useUserProjectsQuery } from '@/hooks';
import Head from 'next/head';
import { PanelsTopLeft, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProjectCard } from '@/components/elements/cards';
import { CreateProjectDialog } from '@/components/modules/dialogs';
import { TopHeader } from '@/components/modules/headers';
import { NavBar } from '@/components/modules/bars';

export const ProjectsLayout = () => {
  const { data: userProjects } = useUserProjectsQuery();

  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='grid gap-3'>
              <h2 className='flex items-center gap-2 text-lg font-semibold md:text-2xl'>
                <Star />
                Отмеченные проекты
              </h2>
              <div className='grid max-w-[1165px] grid-cols-4 gap-4'>
                <Card className='flex h-[100px] cursor-pointer items-center justify-center gap-2 p-6 font-semibold'>
                  Kanban
                </Card>
              </div>
            </div>
            <div className='grid gap-3'>
              <h2 className='flex items-center gap-2 text-lg font-semibold md:text-2xl'>
                <PanelsTopLeft />
                Мои проекты
              </h2>
              <div className='grid max-w-[1165px] grid-cols-4 gap-4'>
                <CreateProjectDialog />
                {userProjects?.map(userProject => (
                  <ProjectCard key={userProject.guid} project={userProject} />
                ))}
                {/* <Card className='flex h-[100px] cursor-pointer items-center justify-center gap-2 p-6 font-semibold'>
                  Kanban
                </Card>
                <Card className='flex h-[100px] cursor-pointer items-center justify-center gap-2 p-6 font-semibold'>
                  Test
                </Card>
                <Card className='flex h-[100px] cursor-pointer items-center justify-center gap-2 p-6 font-semibold'>
                  Project 1
                </Card> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
