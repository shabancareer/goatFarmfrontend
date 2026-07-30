import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { herdService } from '../services/herd.service';

export const HERD_QUERY_KEYS = {
  all: ['goats'] as const,
  list: () => [...HERD_QUERY_KEYS.all, 'list'] as const,
  detail: (id: string | number) => [...HERD_QUERY_KEYS.all, 'detail', id] as const,
};

export const useHerdList = () => {
  return useQuery({
    queryKey: HERD_QUERY_KEYS.list(),
    queryFn: herdService.getAllGoats,
  });
};

export const useAnimalProfile = (id?: string | number) => {
  return useQuery({
    queryKey: HERD_QUERY_KEYS.detail(id || ''),
    queryFn: () => (id ? herdService.getGoatById(id) : null),
    enabled: !!id,
  });
};

export const useCreateGoat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: herdService.createGoat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HERD_QUERY_KEYS.all });
    },
  });
};

export const useUpdateGoat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: herdService.updateGoat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HERD_QUERY_KEYS.all });
    },
  });
};

export const useDeleteGoat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: herdService.deleteGoat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HERD_QUERY_KEYS.all });
    },
  });
};
