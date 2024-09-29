import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

export function TaskLayout() {
  return (
    <>
      <Head>
        <title>Задача</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <div>
              <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
                The King's Plan
              </h2>
              <p className='leading-7 [&:not(:first-child)]:mt-6'>
                The king thought long and hard, and finally came up with{' '}
                <a
                  href='#'
                  className='font-medium text-primary underline underline-offset-4'
                >
                  a brilliant plan
                </a>
                : he would tax the jokes in the kingdom.
              </p>
              <blockquote className='mt-6 border-l-2 pl-6 italic'>
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </blockquote>
            </div>
            <form className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'>
              <Label htmlFor='message' className='sr-only'>
                Message
              </Label>
              <Textarea
                id='message'
                placeholder='Спросите ИИ...'
                className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
              />
              <div className='flex items-center p-3 pt-0'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <Paperclip className='size-4' />
                        <span className='sr-only'>Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top'>Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <Mic className='size-4' />
                        <span className='sr-only'>Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top'>Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type='submit' size='sm' className='ml-auto gap-1.5'>
                  Готово
                  <CornerDownLeft className='size-3.5' />
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
