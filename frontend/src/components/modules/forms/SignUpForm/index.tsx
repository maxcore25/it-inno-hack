import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSignUpForm } from './SignUpForm.hooks';
import { useEffect, useRef } from 'react';
import { SpinIcon } from '@/components/elements/icons';

export const SignUpForm = () => {
  const { form, onSubmit, isFetching } = useSignUpForm();
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <Card className='max-w-[400px] flex-1'>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Введите свои данные для создания учетной записи.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='test@example.com'
                      {...field}
                      ref={emailInputRef}
                      className='h-auto py-3'
                    />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Никнейм</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='user123'
                      {...field}
                      className='h-auto py-3'
                    />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} className='h-auto py-3' />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} className='h-auto py-3' />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='!mt-6 h-auto w-full gap-2 py-3'
              disabled={isFetching}
            >
              {isFetching ? <SpinIcon /> : null}
              Зарегистрироваться
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='grid'>
        <div className='mt-4 text-center text-sm'>
          Уже есть аккаунт?{' '}
          <Link href='/signin' className='underline'>
            Войти
          </Link>
        </div>
      </CardFooter>
    </Card>

    // <Card className='w-full max-w-sm'>
    //   <CardHeader>
    //     <CardTitle className='text-2xl'>Регистрация</CardTitle>
    //     <CardDescription>
    //       Введите свои данные для создания учетной записи.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className='grid gap-4'>
    //     <div className='grid gap-2'>
    //       <Label htmlFor='email'>Почта</Label>
    //       <Input id='email' type='email' placeholder='m@example.com' required />
    //     </div>
    //     <div className='grid gap-2'>
    //       <Label htmlFor='username'>Имя пользователя</Label>
    //       <Input id='username' placeholder='user123' required />
    //     </div>
    //     <div className='grid gap-2'>
    //       <Label htmlFor='password'>Пароль</Label>
    //       <Input id='password' type='password' required />
    //     </div>
    //     <div className='grid gap-2'>
    //       <Label htmlFor='confirm'>Повторите пароль</Label>
    //       <Input id='confirm' type='password' required />
    //     </div>
    //   </CardContent>
    //   <CardFooter className='grid'>
    //     <Button className='w-full'>Зарегистрироваться</Button>
    //     <div className='mt-4 text-center text-sm'>
    //       Уже есть аккаунт?{' '}
    //       <Link href='/signin' className='underline'>
    //         Войти
    //       </Link>
    //     </div>
    //   </CardFooter>
    // </Card>
  );
};
