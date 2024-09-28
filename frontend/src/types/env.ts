import { z } from 'zod';
import { envSchema } from '@/lib/validations';

type EnvVariables = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }
}
