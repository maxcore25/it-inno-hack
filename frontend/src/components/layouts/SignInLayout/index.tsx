import Head from 'next/head';
import { LogoHeader } from '@/components/modules/headers/LogoHeader';
import { SignInForm } from '@/components/modules/forms';

export const SignInLayout = () => {
  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <LogoHeader />
      <main className='flex min-h-screen flex-col bg-background'>
        <div className='theme-zinc flex h-screen w-full items-center justify-center px-4'>
          <SignInForm />
        </div>
      </main>
    </>
  );
};
