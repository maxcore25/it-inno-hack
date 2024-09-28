import axios from '@/api';
import { TaskColumnBase, TaskColumnGet, TaskColumnPatch } from '@/types';

const PREFIX = '/task-columns';

export const createTaskColumn = async (data: TaskColumnBase) => {
  const response = await axios.post<TaskColumnGet>(PREFIX, data);

  return response.data;
};

export const getUserTaskColumns = async () => {
  const response = await axios.get<TaskColumnGet[]>(`${PREFIX}/my`);

  return response.data;
};

export const getTaskColumn = async (guid: string) => {
  const response = await axios.get<TaskColumnGet>(`${PREFIX}/${guid}`);

  return response.data;
};

export const patchTaskColumn = async (guid: string, model: TaskColumnPatch) => {
  const response = await axios.patch<TaskColumnGet>(`${PREFIX}/${guid}`, model);

  return response.data;
};

export const moveTaskColumn = async (model: TaskColumnPatch[]) => {
  const response = await axios.patch<any>(`${PREFIX}/move`, model);

  return response.data;
};

export const deleteTaskColumn = async (guid: string) => {
  const response = await axios.delete<any>(`${PREFIX}/${guid}`);

  return response.data;
};
