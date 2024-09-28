import {
  createProject,
  deleteProject,
  getProject,
  getUserProjects,
  patchProject,
} from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { ProjectPatch } from '@/types';

export const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: createProject,
  });
};

export const useUserProjectsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: () => getUserProjects(),
  });
};

export const useProjectQuery = (guid: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, QUERY_KEYS.PROJECT, guid],
    queryFn: () => getProject(guid),
  });
};

export const usePatchProjectMutation = (guid: string, model: ProjectPatch) => {
  return useMutation({
    mutationFn: () => patchProject(guid, model),
  });
};

export const useDeleteProjectMutation = (guid: string) => {
  return useMutation({
    mutationFn: () => deleteProject(guid),
  });
};
