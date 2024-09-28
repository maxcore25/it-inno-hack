import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';
import { LogoHeader } from '@/components/modules/headers/LogoHeader';
import {
  AreaChartDemo,
  BarChartDemo,
  PieChartDemo,
  RadialChartDemo,
} from '@/components/modules/charts';

export const StatsLayout = () => {
  return (
    <>
      <Head>
        <title>Статистика</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <LogoHeader />
          <main className='mt-[20px] flex min-h-screen flex-col bg-background'>
            <div className='theme-zinc flex w-full items-center justify-center px-4'>
              <h1 className='mb-[60px] text-lg font-semibold md:text-2xl'>
                Statistics
              </h1>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <PieChartDemo />
              <AreaChartDemo />
              <BarChartDemo />
              <RadialChartDemo />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
