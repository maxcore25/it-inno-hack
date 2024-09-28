import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signInFormSchema } from '@/lib/validations';
import { SignInFormValues } from '@/types';
import { useSignInQuery } from '@/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useSignInForm = () => {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { data, refetch, error, isSuccess, isError, isFetching } =
    useSignInQuery({
      email: form.watch('email'),
      password: form.watch('password'),
    });

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('access_token', data.access_token);
      form.reset();
      router.push('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message || 'Something went wrong', {
        description: 'Please try again.',
        action: {
          label: 'Close',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError]);

  function onSubmit() {
    refetch();
  }

  return { form, onSubmit, ...form, isFetching };
};
