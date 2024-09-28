import { z } from 'zod';
import {
  messageSchema,
  projectBaseSchema,
  signInFormSchema,
  signUpFormSchema,
  taskBaseSchema,
  taskColumnBaseSchema,
} from '@/lib/validations';

export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
export type Message = z.infer<typeof messageSchema>;

export type Status = 'idle' | 'loading' | 'error' | 'success';

export type DialogStore = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
};

export type CreateProjectDialogStore = DialogStore;

export type ProjectBase = z.infer<typeof projectBaseSchema>;
export type TaskColumnBase = z.infer<typeof taskColumnBaseSchema>;
export type TaskBase = z.infer<typeof taskBaseSchema>;

export type BaseGet = {
  guid: string;
  created_at: Date;
  updated_at: Date;
};

export type ProjectGet = BaseGet &
  ProjectBase & {
    task_columns: TaskColumnGet[];
  };

export type TaskColumnGet = BaseGet &
  TaskColumnBase & {
    tasks: TaskGet[];
  };

export type TaskGet = BaseGet & TaskBase & {};

export type ProjectPatch = Partial<ProjectGet>;
export type TaskColumnPatch = Partial<TaskColumnGet>;
export type TaskPatch = Partial<TaskGet>;

// =============== Test Types ===============
export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
