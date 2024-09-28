import axios from '@/api';
import { ProjectBase, ProjectGet, ProjectPatch } from '@/types';

const PREFIX = '/projects';

export const createProject = async (data: ProjectBase) => {
  const response = await axios.post<ProjectGet>(PREFIX, data);

  return response.data;
};

export const getUserProjects = async () => {
  const response = await axios.get<ProjectGet[]>(`${PREFIX}/my`);

  return response.data;
};

export const getProject = async (guid: string) => {
  const response = await axios.get<ProjectGet>(`${PREFIX}/${guid}`);

  return response.data;
};

export const patchProject = async (guid: string, model: ProjectPatch) => {
  const response = await axios.patch<ProjectGet>(`${PREFIX}/${guid}`, model);

  return response.data;
};

export const deleteProject = async (guid: string) => {
  const response = await axios.delete<any>(`${PREFIX}/${guid}`);

  return response.data;
};
