import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authInitialState } from '../types/auth/auth.types';

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
} from '../thunks/auth/auth.thunks';

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
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
        builder
            .addCase(registerSuperOwner.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(registerSuperOwner.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerSuperOwner.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload as string; });

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

        builder.addCase(logout.fulfilled, () => ({ ...authInitialState, status: 'idle' }));

        builder
            .addCase(fetchMe.fulfilled, (state, { payload }) => { state.user = payload; })
            .addCase(fetchMe.rejected, (state) => { Object.assign(state, { ...authInitialState, status: 'idle' }); });

        builder
            .addCase(fetchOrgUsers.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrgUsers.fulfilled, (state, { payload }) => { state.status = 'succeeded'; state.orgUsers = payload; })
            .addCase(fetchOrgUsers.rejected, (state, { payload }) => { state.status = 'failed'; state.error = payload as string; });

        builder.addCase(updateProfile.fulfilled, (state, { payload }) => { state.user = payload; });

        builder
            .addCase(uploadPhoto.fulfilled, (state, { payload }) => { if (state.user) state.user.photoUrl = payload.photoUrl; })
            .addCase(removePhoto.fulfilled, (state) => { if (state.user) state.user.photoUrl = null; });

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
