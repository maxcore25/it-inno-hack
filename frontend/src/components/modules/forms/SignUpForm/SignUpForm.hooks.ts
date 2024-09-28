import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signUpFormSchema } from '@/lib/validations';
import { SignUpFormValues } from '@/types';
import { useSignUpQuery } from '@/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useSignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { data, refetch, error, isSuccess, isError, isFetching } =
    useSignUpQuery({
      email: form.watch('email'),
      username: form.watch('username'),
      password: form.watch('password'),
      confirmPassword: form.watch('confirmPassword'),
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
