import Head from 'next/head';
import { LogoHeader } from '@/components/modules/headers/LogoHeader';

export const StatsLayout = () => {
  return (
    <>
      <Head>
        <title>Статистика</title>
      </Head>
      <LogoHeader />
      <main className='flex min-h-screen flex-col bg-background'>
        <div className='theme-zinc flex h-screen w-full items-center justify-center px-4'>
          <h1>Statistics</h1>
        </div>
      </main>
    </>
  );
};
