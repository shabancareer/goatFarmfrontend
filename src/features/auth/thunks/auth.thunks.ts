import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../../services/profileService';
import { authService } from '../../../services/authService';
import type {
    RegisterPayload,
    LoginPayload,
    CreateUserPayload,
    ChangeUserRolePayload,
    UpdateProfilePayload,
    ChangePasswordPayload,
    SetAvailabilityPayload,
} from '../types/auth.types';

// ─────────────────────────────────────────────────────────────────────────────
// Helper — extracts error message from axios errors consistently
// ─────────────────────────────────────────────────────────────────────────────
const errMsg = (err: any): string =>
    err?.response?.data?.message ?? err?.message ?? 'Something went wrong';

// ─────────────────────────────────────────────────────────────────────────────
// Auth thunks
// ─────────────────────────────────────────────────────────────────────────────

export const registerSuperOwner = createAsyncThunk(
    'auth/registerSuperOwner',
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try { return await authService.register(payload); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const login = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try { return await authService.login(payload.email, payload.password); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try { await authService.logout(); }
        catch { /* always clear local state */ }
    },
);

export const fetchMe = createAsyncThunk(
    'auth/fetchMe',
    async (_, { rejectWithValue }) => {
        try { return await authService.getMe(); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

// ─────────────────────────────────────────────────────────────────────────────
// User management thunks (Owner / Manager)
// ─────────────────────────────────────────────────────────────────────────────

export const fetchOrgUsers = createAsyncThunk(
    'auth/fetchOrgUsers',
    async (_, { rejectWithValue }) => {
        try { return await authService.listUsers(); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (payload: CreateUserPayload, { dispatch, rejectWithValue }) => {
        try {
            const result = await authService.createUser(payload);
            dispatch(fetchOrgUsers());
            return result;
        } catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const changeUserRole = createAsyncThunk(
    'auth/changeUserRole',
    async (payload: ChangeUserRolePayload, { dispatch, rejectWithValue }) => {
        try {
            const result = await authService.updateRole(payload.userId, payload.newRole);
            dispatch(fetchOrgUsers());
            return result;
        } catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const deactivateUser = createAsyncThunk(
    'auth/deactivateUser',
    async (userId: string, { dispatch, rejectWithValue }) => {
        try {
            const result = await authService.deactivateUser(userId);
            dispatch(fetchOrgUsers());
            return result;
        } catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

// ─────────────────────────────────────────────────────────────────────────────
// Profile thunks
// ─────────────────────────────────────────────────────────────────────────────

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (payload: UpdateProfilePayload, { rejectWithValue }) => {
        try { return await profileService.updateProfile(payload); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const uploadPhoto = createAsyncThunk(
    'auth/uploadPhoto',
    async (file: File, { rejectWithValue }) => {
        try { return await profileService.uploadPhoto(file); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const removePhoto = createAsyncThunk(
    'auth/removePhoto',
    async (_, { rejectWithValue }) => {
        try { await profileService.removePhoto(); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const toggleAvailability = createAsyncThunk(
    'auth/toggleAvailability',
    async (_, { rejectWithValue }) => {
        try { return await profileService.toggleAvailability(); }
        catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const setAvailability = createAsyncThunk(
    'auth/setAvailability',
    async (payload: SetAvailabilityPayload, { rejectWithValue }) => {
        try {
            return await profileService.setAvailability(
                payload.isAvailable, payload.statusMessage,
            );
        } catch (err) { return rejectWithValue(errMsg(err)); }
    },
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (payload: ChangePasswordPayload, { dispatch, rejectWithValue }) => {
        try {
            const result = await profileService.changePassword(
                payload.currentPassword, payload.newPassword,
            );
            dispatch(logout());
            return result;
        } catch (err) { return rejectWithValue(errMsg(err)); }
    },
);