import Head from 'next/head';
import { LogoHeader } from '@/components/modules/headers/LogoHeader';
import { AreaChartDemo, PieChartDemo } from '@/components/modules/charts';

export const StatsLayout = () => {
  return (
    <>
      <Head>
        <title>Статистика</title>
      </Head>
      <LogoHeader />
      <main className='mt-[100px] flex min-h-screen flex-col bg-background'>
        <div className='theme-zinc flex w-full items-center justify-center px-4'>
          <h1 className='mb-[100px] text-lg font-semibold md:text-2xl'>
            Statistics
          </h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <PieChartDemo />
          <AreaChartDemo />
        </div>
      </main>
    </>
  );
};
