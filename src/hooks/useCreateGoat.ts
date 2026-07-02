import { goatService, getAllGoats, deleteGoat, updateGoat } from '@/services/goatService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (goatData: any) => goatService.createGoat(goatData),
        onSuccess: (data) => {
            // Update cache locally
            queryClient.setQueryData(["goats"], (oldData: any) => {
                if (!oldData) return { data: [data.data] };
                return {
                    ...oldData,
                    data: [...(oldData.data || []), data.data],
                };
            });
            // Force refetch to ensure database consistency
            queryClient.invalidateQueries({ queryKey: ["goats"] });
        },
        onError: (error: any) => {
            console.error('Error creating goat:', error.response?.data?.message || error.message);
        },
    });
};

export const useGetAllGoats = () => {
    return useQuery({
        queryKey: ['goats'],
        queryFn: getAllGoats,
    });
};

export const useDeleteGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteGoat(id),
        onSuccess: (data) => {
            // Update cache locally
            queryClient.setQueryData(["goats"], (oldData: any) => {
                if (!oldData) return { data: [] };
                return {
                    ...oldData,
                    data: (oldData.data || []).filter((goat: any) => goat._id !== data.data._id),
                };
            });
            // Force refetch to ensure database consistency
            queryClient.invalidateQueries({ queryKey: ["goats"] });
        },
        onError: (error: any) => {
            console.error('Error deleting goat:', error.response?.data?.message || error.message);
        },
    });
};

export const useUpdateGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (goatData: any) => updateGoat(goatData),
        onSuccess: (data: any) => {
            // Update cache locally
            queryClient.setQueryData(["goats"], (oldData: any) => {
                if (!oldData) return { data: [data.data] };
                return {
                    ...oldData,
                    data: (oldData.data || []).map((goat: any) => goat._id === data.data._id ? data.data : goat),
                };
            });
            // Force refetch to ensure database consistency
            queryClient.invalidateQueries({ queryKey: ["goats"] });
        },
        onError: (error: any) => {
            console.error('Error updating goat:', error.response?.data?.message || error.message);
        },
    });
};