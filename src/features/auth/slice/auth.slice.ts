import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authInitialState } from '../types/auth.types';
// import type { AuthState } from '../types/auth.types';

import {
    registerSuperOwner,
    login,
    logout,
    fetchMe,
    fetchOrgUsers,
    updateProfile,
    uploadPhoto,
    removePhoto,
    toggleAvailability,
    setAvailability,
} from '../thunks/auth.thunks'; //API call from thunks folder

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        // ── Sync actions ────────────────────────────────────────────────────────
        /**
         * Called by the Axios interceptor (api.ts) when a silent token
         * refresh succeeds. Keeps tokens and expiry in sync with the server.
         */
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
        // ── Register ─────────────────────────────────────────────────────────────
        builder
            .addCase(registerSuperOwner.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(registerSuperOwner.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerSuperOwner.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload as string; });

        // ── Login ─────────────────────────────────────────────────────────────────
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload.user;
                state.accessToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.expiresAt = Date.now() + payload.expiresIn * 1000;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload as string;
            });

        // ── Logout ────────────────────────────────────────────────────────────────
        builder.addCase(logout.fulfilled, () => ({ ...authInitialState }));

        // ── Fetch me ──────────────────────────────────────────────────────────────
        builder
            .addCase(fetchMe.fulfilled, (state, { payload }) => { state.user = payload; })
            .addCase(fetchMe.rejected, (state) => { Object.assign(state, authInitialState); });

        // ── Org users ─────────────────────────────────────────────────────────────
        builder
            .addCase(fetchOrgUsers.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrgUsers.fulfilled, (state, { payload }) => { state.status = 'succeeded'; state.orgUsers = payload; })
            .addCase(fetchOrgUsers.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload as string; });

        // ── Profile ───────────────────────────────────────────────────────────────
        builder.addCase(updateProfile.fulfilled, (state, { payload }) => { state.user = payload; });

        // ── Photo ─────────────────────────────────────────────────────────────────
        builder
            .addCase(uploadPhoto.fulfilled, (state, { payload }) => { if (state.user) state.user.photoUrl = payload.photoUrl; })
            .addCase(removePhoto.fulfilled, (state) => { if (state.user) state.user.photoUrl = null; });

        // ── Availability ──────────────────────────────────────────────────────────
        builder
            .addCase(toggleAvailability.fulfilled, (state, { payload }) => { if (state.user) state.user.isAvailable = payload.isAvailable; })
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