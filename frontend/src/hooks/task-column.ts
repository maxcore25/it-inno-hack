import {
  createTaskColumn,
  deleteTaskColumn,
  getTaskColumn,
  getUserTaskColumns,
  moveTaskColumn,
  patchTaskColumn,
} from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { TaskColumnPatch } from '@/types';

export const useCreateTaskColumnMutation = () => {
  return useMutation({
    mutationFn: createTaskColumn,
  });
};

export const useUserTaskColumnsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASK_COLUMNS],
    queryFn: () => getUserTaskColumns(),
  });
};

export const useTaskColumnQuery = (guid: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASK_COLUMNS, guid],
    queryFn: () => getTaskColumn(guid),
  });
};

export const usePatchTaskColumnMutation = (
  guid: string,
  model: TaskColumnPatch
) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECTS],
    mutationFn: () => patchTaskColumn(guid, model),
  });
};

export const useMoveTaskColumnMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECTS],
    mutationFn: (model: TaskColumnPatch[]) => moveTaskColumn(model),
  });
};

export const useDeleteTaskColumnMutation = (guid: string) => {
  return useMutation({
    mutationFn: () => deleteTaskColumn(guid),
  });
};
