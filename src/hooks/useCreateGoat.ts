import { goatApi } from '@/services/goatApi';
import { useMutation } from '@tanstack/react-query';

export const useCreateGoat = () => {
    return useMutation({
        mutationFn: (goatData: any) => goatApi.createGoat(goatData),
        onSuccess: (data) => {
            console.log('✅ Goat created successfully:', data);
            // You can add a success toast here
        },
        onError: (error: any) => {
            console.error('Error creating goat:', error.response?.data?.message || error.message);
            // You can add an error toast here
        },
    });
};