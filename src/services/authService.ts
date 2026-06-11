import { api } from './api';
import type { LoginResponse, User } from '../types';

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const res = await api.post('/auth/login', { email, password });
        return res.data;
    },

    register: async (payload: {
        name: string; email: string; password: string; organizationName: string;
    }) => {
        const res = await api.post('/auth/register', payload);
        return res.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },

    getMe: async (): Promise<User> => {
        const res = await api.get('/auth/me');
        return res.data;
    },

    listUsers: async (): Promise<User[]> => {
        const res = await api.get('/auth/users');
        return res.data;
    },

    createUser: async (payload: {
        name: string; email: string; password: string; role: string;
    }) => {
        const res = await api.post('/auth/users', payload);
        return res.data;
    },

    updateRole: async (userId: string, newRole: string) => {
        const res = await api.patch('/auth/users/role', { userId, newRole });
        return res.data;
    },

    deactivateUser: async (userId: string) => {
        const res = await api.delete(`/auth/users/${userId}`);
        return res.data;
    },
};