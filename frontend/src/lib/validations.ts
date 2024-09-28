import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().optional(),
});

envSchema.parse(process.env);

export const signInFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1, 'Password is required'),
});

export const signUpFormSchema = z
  .object({
    email: z.string().email().trim(),
    username: z.string().min(1, 'Username is required').trim(),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const messageSchema = z.object({
  message: z.string().optional(),
});

export const projectBaseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const taskColumnBaseSchema = z.object({
  project_guid: z.string(),
  name: z.string(),
  position: z.number(),
});

export const taskBaseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  position: z.number(),
  user_guid: z.string().optional(),
  column_guid: z.string(),
});
