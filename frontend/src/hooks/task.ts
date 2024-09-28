import {
  createTask,
  deleteTask,
  getTask,
  getUserTasks,
  moveTask,
  patchTask,
} from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { TaskPatch } from '@/types';

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: createTask,
  });
};

export const useUserTasksQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: () => getUserTasks(),
  });
};

export const useTaskQuery = (guid: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS, guid],
    queryFn: () => getTask(guid),
  });
};

export const usePatchTaskMutation = () => {
  return useMutation({
    mutationFn: ({ guid, model }: { guid: string; model: TaskPatch }) =>
      patchTask(guid, model),
  });
};

export const useMoveTaskMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECTS],
    mutationFn: (model: TaskPatch[]) => moveTask(model),
  });
};

export const useDeleteTaskMutation = (guid: string) => {
  return useMutation({
    mutationFn: () => deleteTask(guid),
  });
};
