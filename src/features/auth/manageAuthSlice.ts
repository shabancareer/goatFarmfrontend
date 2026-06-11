import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


export type UserRole = 'super_owner' | 'owner' | 'manager' | 'worker' | 'viewer';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isSuperOwner: boolean;
    phone?: string;
    photoUrl?: string;
    isAvailable: boolean;
    statusMessage?: string;
    permissions: string[];
    orgId: string;
}

export interface AuthState {
    user: UserProfile | null;
    accessToken: string | null;
    refreshToken: string | null;   // kept in memory for explicit logout only
    expiresAt: number | null;      // epoch ms when access token expires
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Called by the Axios interceptor when it silently refreshes the token */
        tokenRefreshed(
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string; expiresIn: number }>,
        ) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // ── Login ──
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.accessToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.expiresAt = Date.now() + payload.expiresIn * 1000;
                state.user = payload.user;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload as string;
            });

        // ── Refresh tokens ──
        builder
            .addCase(refreshTokens.fulfilled, (state, { payload }) => {
                state.accessToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.expiresAt = Date.now() + payload.expiresIn * 1000;
            })
            .addCase(refreshTokens.rejected, (state) => {
                // Refresh failed → force logout
                Object.assign(state, initialState);
            });

        // ── Logout ──
        builder
            .addCase(logout.fulfilled, () => initialState)
            .addCase(logoutAllDevices.fulfilled, () => initialState);

        // ── Profile ──
        builder
            .addCase(fetchProfile.fulfilled, (state, { payload }) => {
                state.user = payload;
            })
            .addCase(updateProfile.fulfilled, (state, { payload }) => {
                state.user = payload;
            });

        // ── Photo ──
        builder
            .addCase(uploadProfilePhoto.fulfilled, (state, { payload }) => {
                if (state.user) state.user.photoUrl = payload.photoUrl;
            })
            .addCase(removeProfilePhoto.fulfilled, (state) => {
                if (state.user) state.user.photoUrl = undefined;
            });

        // ── Availability ──
        builder
            .addCase(toggleAvailability.fulfilled, (state, { payload }) => {
                if (state.user) state.user.isAvailable = payload.isAvailable;
            })
            .addCase(setAvailability.fulfilled, (state, { payload }) => {
                if (state.user) {
                    state.user.isAvailable = payload.isAvailable;
                    state.user.statusMessage = payload.statusMessage;
                }
            });
    },
});

export const { tokenRefreshed, clearError } = authSlice.actions;
export default authSlice.reducer;
