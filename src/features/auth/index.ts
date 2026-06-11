// Slice default export + sync actions
export { default as authReducer, tokenRefreshed, clearError } from './slice/auth.slice';

// Async thunks
export {
    registerSuperOwner,
    login,
    logout,
    fetchMe,
    fetchOrgUsers,
    createUser,
    changeUserRole,
    deactivateUser,
    updateProfile,
    uploadPhoto,
    removePhoto,
    toggleAvailability,
    setAvailability,
    changePassword,
} from './thunks/auth.thunks';

// Selectors
export {
    selectUser,
    selectAccessToken,
    selectRefreshToken,
    selectIsLoggedIn,
    selectTokenExpiresAt,
    selectAuthStatus,
    selectAuthError,
    selectOrgUsers,
    selectUserId,
    selectUserName,
    selectUserEmail,
    selectUserRole,
    selectUserPhone,
    selectUserPhotoUrl,
    selectIsSuperOwner,
    selectIsAvailable,
    selectStatusMessage,
    selectPermissions,
    selectHasPermission,
    selectIsMinRole,
} from './selectors/auth.selectors';

// Types
export type {
    AuthState,
    RegisterPayload,
    LoginPayload,
    CreateUserPayload,
    ChangeUserRolePayload,
    UpdateProfilePayload,
    ChangePasswordPayload,
    SetAvailabilityPayload,
} from './types/auth.types';