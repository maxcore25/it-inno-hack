import { signIn } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Message, SignInFormValues } from '@/types';
import { AxiosError } from 'axios';

export const useSignInQuery = (data: SignInFormValues) => {
  return useQuery<any, AxiosError<Message>>({
    queryKey: [],
    queryFn: () => signIn(data),
    enabled: false,
    retry: false,
  });
};
