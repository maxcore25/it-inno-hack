import { create } from 'zustand';
import { CreateProjectDialogStore } from '@/types';

export const useCreateProjectDialogStore = create<CreateProjectDialogStore>()(
  set => ({
    isOpen: false,
    toggle: value => set(() => ({ isOpen: value })),
  })
);
