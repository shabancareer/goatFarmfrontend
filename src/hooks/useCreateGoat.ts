import { goatService, getAllGoats, deleteGoat, updateGoat } from '@/services/goatService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (goatData: any) => goatService.createGoat(goatData),
        onSuccess: (data) => {
            queryClient.setQueryData(["goats"], (oldData: any) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data],
                };
            });
        },
        onError: (error: any) => {
            console.error('Error creating goat:', error.response?.data?.message || error.message);
            // You can add an error toast here
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
            queryClient.setQueryData(["goats"], (oldData: any) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((goat: any) => goat.id !== data.id),
                };
            });
            // You can add a success toast here
        },
        onError: (error: any) => {
            console.error('Error deleting goat:', error.response?.data?.message || error.message);
            // You can add an error toast here
        },
    });
};
export const useUpdateGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (goatData: any) => updateGoat(goatData),
        onSuccess: (data: any) => {
            queryClient.setQueryData(["goats"], (oldData: any) => {
                return {
                    ...oldData,
                    data: oldData.data.map((goat: any) => goat.id === data.id ? data : goat),
                };
            });
            // You can add a success toast here
        },
        onError: (error: any) => {
            console.error('Error updating goat:', error.response?.data?.message || error.message);
            // You can add an error toast here
        },
    });
};