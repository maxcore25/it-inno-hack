import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UsersLayout() {
  return (
    <>
      <Head>
        <title>База знаний</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-8'>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/01.png' alt='Avatar' />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Olivia Martin
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$1,999.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/02.png' alt='Avatar' />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Jackson Lee
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$39.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/03.png' alt='Avatar' />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Isabella Nguyen
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      isabella.nguyen@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$299.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/04.png' alt='Avatar' />
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      William Kim
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      will@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$99.00</div>
                </div>
                <div className='flex items-center gap-4'>
                  <Avatar className='hidden h-9 w-9 sm:flex'>
                    <AvatarImage src='/avatars/05.png' alt='Avatar' />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                      Sofia Davis
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      sofia.davis@email.com
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+$39.00</div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
}
