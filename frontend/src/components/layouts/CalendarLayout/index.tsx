import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';

export function CalendarLayout() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Head>
        <title>Календарь</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-md border'
            />
          </main>
        </div>
      </div>
    </>
  );
}
