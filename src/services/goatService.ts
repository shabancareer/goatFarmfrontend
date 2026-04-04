import { CloudCog } from "lucide-react";
import { api } from "./goatApi";

export const goatService = {
    // Create new goat
    createGoat: async (goatData: any) => {
        const response = await api.post('/goats', goatData);
        return response.data;
    },
};

export const getAllGoats = async () => {
    const res = await api.get("/goats");
    return res.data;
};

export const deleteGoat = async (id: string | number) => {
    const res = await api.delete(`/goats/${id}`);
    return res.data;
};