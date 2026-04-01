import { goatService, getAllGoats } from '@/services/goatService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateGoat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (goatData: any) => goatService.createGoat(goatData),
        onSuccess: (data) => {
            console.log('✅ Goat created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ["goats"] });
            // You can add a success toast here
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