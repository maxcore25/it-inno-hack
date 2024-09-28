import axios from '@/api';
import { TaskBase, TaskGet, TaskPatch } from '@/types';

const PREFIX = '/tasks';

export const createTask = async (data: TaskBase) => {
  const response = await axios.post<TaskGet>(PREFIX, data);

  return response.data;
};

export const getUserTasks = async () => {
  const response = await axios.get<TaskGet[]>(`${PREFIX}/my`);

  return response.data;
};

export const getTask = async (guid: string) => {
  const response = await axios.get<TaskGet>(`${PREFIX}/${guid}`);

  return response.data;
};

export const patchTask = async (guid: string, model: TaskPatch) => {
  const response = await axios.patch<TaskGet>(`${PREFIX}/${guid}`, model);

  return response.data;
};

export const moveTask = async (model: TaskPatch[]) => {
  const response = await axios.patch<any>(`${PREFIX}/move`, model);

  return response.data;
};

export const deleteTask = async (guid: string) => {
  const response = await axios.delete<any>(`${PREFIX}/${guid}`);

  return response.data;
};
