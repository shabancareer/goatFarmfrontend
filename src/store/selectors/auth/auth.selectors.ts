import type { RootState } from '../../../store/store';
import { Permission, Role } from '../../../types';

// ─────────────────────────────────────────────────────────────────────────────
// Auth selectors
// ─────────────────────────────────────────────────────────────────────────────
export const selectUser = (s: RootState) => s.auth.user;
export const selectAccessToken = (s: RootState) => s.auth.accessToken;
export const selectRefreshToken = (s: RootState) => s.auth.refreshToken;
export const selectIsLoggedIn = (s: RootState) => !!s.auth.accessToken;
export const selectTokenExpiresAt = (s: RootState) => s.auth.expiresAt;
export const selectAuthStatus = (s: RootState) => s.auth.status;
export const selectAuthError = (s: RootState) => s.auth.error;
export const selectOrgUsers = (s: RootState) => s.auth.orgUsers;

// ─────────────────────────────────────────────────────────────────────────────
// User / profile selectors
// ─────────────────────────────────────────────────────────────────────────────
export const selectUserId = (s: RootState) => s.auth.user?.id;
export const selectUserName = (s: RootState) => s.auth.user?.name;
export const selectUserEmail = (s: RootState) => s.auth.user?.email;
export const selectUserRole = (s: RootState) => s.auth.user?.role;
export const selectUserPhone = (s: RootState) => s.auth.user?.phone;
export const selectUserPhotoUrl = (s: RootState) => s.auth.user?.photoUrl;
export const selectIsSuperOwner = (s: RootState) => s.auth.user?.isSuperOwner ?? false;
export const selectIsAvailable = (s: RootState) => s.auth.user?.isAvailable ?? false;
export const selectStatusMessage = (s: RootState) => s.auth.user?.statusMessage;
export const selectPermissions = (s: RootState) => s.auth.user?.permissions ?? [];

// ─────────────────────────────────────────────────────────────────────────────
// Derived / computed selectors
// ─────────────────────────────────────────────────────────────────────────────

/**
 * selectHasPermission(Permission.CREATE_USER)(state)
 * Use in components to conditionally show/hide buttons.
 * Super Owner always returns true.
 */
export const selectHasPermission =
    (permission: Permission) =>
        (s: RootState): boolean =>
            s.auth.user?.isSuperOwner === true ||
            (s.auth.user?.permissions ?? []).includes(permission);

/**
 * selectIsMinRole(Role.MANAGER)(state)
 * Returns true if user's role is at least the given level.
 */
const ROLE_LEVEL: Record<Role, number> = {
    [Role.SUPER_OWNER]: 100,
    [Role.OWNER]: 80,
    [Role.MANAGER]: 60,
    [Role.WORKER]: 40,
    [Role.VIEWER]: 20,
};

export const selectIsMinRole =
    (minRole: Role) =>
        (s: RootState): boolean => {
            const role = s.auth.user?.role;
            if (!role) return false;
            if (s.auth.user?.isSuperOwner) return true;
            return (ROLE_LEVEL[role] ?? 0) >= (ROLE_LEVEL[minRole] ?? 0);
        };