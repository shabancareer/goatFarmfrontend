// import { CloudCog } from "lucide-react";
// import { useSelector } from "react-redux";
import { api } from "./goatApi";
// import { useAppSelector } from "../reduxHooks/hooks";
export const goatService = {
    // Create new goat
    createGoat: async (goatData: any) => {
        // console.log("Goat Data in Service:", goatData);
        const response = await api.post('/goats', goatData);
        return response.data;
    },
};

export const getAllGoats = async () => {
    // const count = useAppSelector((state) => state.manageGoat.allGoats)
    const res = await api.get("/goats");
    return res.data;

};

export const deleteGoat = async (id: string | number) => {
    const res = await api.delete(`/goats/${id}`);
    return res.data;
};
export const updateGoat = async ({ id, ...goatData }: any) => {
    const response = await api.put(`/goats/${id}`, goatData);
    return response.data;
};