import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function FeedbackLayout() {
  return (
    <>
      <Head>
        <title>Отзывы</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <Card className='xl:col-span-2'>
              <CardHeader className='flex flex-row items-center'>
                <div className='grid gap-2'>
                  <CardTitle>Фидбек</CardTitle>
                </div>
                <Button asChild size='sm' className='ml-auto gap-1'>
                  <Link href='#'>
                    Показать все
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='hidden xl:table-column'>
                        Type
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Status
                      </TableHead>
                      <TableHead className='hidden xl:table-column'>
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-23
                      </TableCell>
                      <TableCell className='text-left'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Modi neque tenetur magni odit sint, ipsa at quos
                        velit debitis quo repudiandae! Aliquam praesentium
                        beatae nemo recusandae similique libero ipsa asperiores?
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Olivia Smith</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Refund
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Declined
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-24
                      </TableCell>
                      <TableCell className='text-left'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Fuga autem iste voluptatibus eveniet, aut
                        repudiandae fugiat facilis ex officia dolorem officiis.
                        Facere quas odit non eum molestias provident, quo culpa!
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Noah Williams</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          noah@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Subscription
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-25
                      </TableCell>
                      <TableCell className='text-left'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Harum iure ex repudiandae excepturi. Sapiente
                        reprehenderit culpa ipsam ad quas eaque cum at tenetur
                        quam error blanditiis, ratione odio corrupti nisi.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Emma Brown</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-26
                      </TableCell>
                      <TableCell className='text-left'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Mollitia cupiditate, fugit provident quam
                        blanditiis fuga in quisquam explicabo tempore, voluptas
                        magni ullam. Voluptate esse veniam alias rem tenetur
                        debitis consectetur.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className='font-medium'>Liam Johnson</div>
                        <div className='hidden text-sm text-muted-foreground md:inline'>
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        Sale
                      </TableCell>
                      <TableCell className='hidden xl:table-column'>
                        <Badge className='text-xs' variant='outline'>
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                        2023-06-27
                      </TableCell>
                      <TableCell className='text-left'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates voluptatibus consequuntur pariatur maiores
                        corporis doloremque totam nesciunt tempora nam. Incidunt
                        a esse placeat dolores veniam tenetur corporis
                        asperiores ea neque?
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  );
}
