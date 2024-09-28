import Head from 'next/head';
import { LogoHeader } from '@/components/modules/headers/LogoHeader';
import { SignUpForm } from '@/components/modules/forms';

export const SignUpLayout = () => {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <LogoHeader />
      <main className='flex min-h-screen flex-col bg-background'>
        <div className='theme-zinc flex h-screen w-full items-center justify-center px-4'>
          <SignUpForm />
        </div>
      </main>
    </>
  );
};
