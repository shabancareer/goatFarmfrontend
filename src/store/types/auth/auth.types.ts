import type { User } from '../../../types/shared.types';

// ─────────────────────────────────────────────────────────────────────────────
// Auth slice state shape
// ─────────────────────────────────────────────────────────────────────────────
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;   // epoch ms when accessToken expires
    orgUsers: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const authInitialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    orgUsers: [],
    status: 'idle',
    error: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Thunk argument types — keeps thunk files clean
// ─────────────────────────────────────────────────────────────────────────────
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    organizationName: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ChangeUserRolePayload {
    userId: string;
    newRole: string;
}

export interface UpdateProfilePayload {
    name?: string;
    phone?: string;
    statusMessage?: string;
    isAvailable?: boolean;
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface SetAvailabilityPayload {
    isAvailable: boolean;
    statusMessage?: string;
}