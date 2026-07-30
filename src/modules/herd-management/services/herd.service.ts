import { api } from '@/shared/api/api';

export interface GoatPayload {
  id?: string | number;
  tagId?: string;
  name?: string;
  breed?: string;
  gender?: string;
  dob?: string;
  weight?: number;
  status?: string;
  [key: string]: any;
}

export const herdService = {
  createGoat: async (goatData: GoatPayload) => {
    const response = await api.post('/goats', goatData);
    return response.data;
  },

  getAllGoats: async () => {
    const response = await api.get('/goats');
    return response.data;
  },

  getGoatById: async (id: string | number) => {
    const response = await api.get(`/goats/${id}`);
    return response.data;
  },

  updateGoat: async ({ id, ...goatData }: GoatPayload) => {
    const response = await api.put(`/goats/${id}`, goatData);
    return response.data;
  },

  deleteGoat: async (id: string | number) => {
    const response = await api.delete(`/goats/${id}`);
    return response.data;
  },
};
