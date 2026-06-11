import { api } from './api';
import type { User } from '../types'

export const profileService = {
    getMyProfile: async (): Promise<User> => {
        const res = await api.get('/profile');
        return res.data;
    },

    updateProfile: async (payload: {
        name?: string; phone?: string; statusMessage?: string; isAvailable?: boolean;
    }): Promise<User> => {
        const res = await api.patch('/profile', payload);
        return res.data;
    },

    uploadPhoto: async (file: File): Promise<{ photoUrl: string }> => {
        const form = new FormData();
        form.append('photo', file);
        const res = await api.post('/profile/photo', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    removePhoto: async (): Promise<void> => {
        await api.delete('/profile/photo');
    },

    toggleAvailability: async (): Promise<{ isAvailable: boolean }> => {
        const res = await api.patch('/profile/availability/toggle');
        return res.data;
    },

    setAvailability: async (
        isAvailable: boolean,
        statusMessage?: string,
    ): Promise<{ isAvailable: boolean; statusMessage: string }> => {
        const res = await api.patch('/profile/availability', { isAvailable, statusMessage });
        return res.data;
    },

    changePassword: async (
        currentPassword: string,
        newPassword: string,
    ): Promise<{ message: string }> => {
        const res = await api.post('/profile/change-password', { currentPassword, newPassword });
        return res.data;
    },
};