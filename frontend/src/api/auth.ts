import axios from '@/api';
import { SignInFormValues, SignUpFormValues } from '@/types';
// import { messageSchema } from '@/lib/validations';

export const signIn = async (data: SignInFormValues) => {
  const response = await axios.post('/signin', data);

  // const validatedData = messageSchema.safeParse(response.data);

  // if (!validatedData.success) {
  //   throw new Error('Validation error');
  // }

  return response.data;
};

export const signUp = async (data: SignUpFormValues) => {
  const response = await axios.post('/signup', data);

  // const validatedData = messageSchema.safeParse(response.data);

  // if (!validatedData.success) {
  //   throw new Error('Validation error');
  // }

  return response.data;
};
