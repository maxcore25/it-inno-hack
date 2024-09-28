import { signUp } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Message, SignUpFormValues } from '@/types';
import { AxiosError } from 'axios';

export const useSignUpQuery = (data: SignUpFormValues) => {
  return useQuery<any, AxiosError<Message>>({
    queryKey: [],
    queryFn: () => signUp(data),
    enabled: false,
    retry: false,
  });
};
