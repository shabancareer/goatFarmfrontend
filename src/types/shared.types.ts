// ─────────────────────────────────────────────────────────────────────────────
// Role & Permission enums  (mirrors the NestJS backend exactly)
// ─────────────────────────────────────────────────────────────────────────────

// ==========================================
// 1. Roles Configuration
// ==========================================
export const Role = {
    SUPER_OWNER: 'super_owner',
    OWNER: 'owner',
    MANAGER: 'manager',
    WORKER: 'worker',
    VIEWER: 'viewer',
} as const;

// This generates a union type: 'super_owner' | 'owner' | 'manager' | 'worker' | 'viewer'
export type Role = typeof Role[keyof typeof Role];


// ==========================================
// 2. Permissions Configuration
// ==========================================
export const Permission = {
    CREATE_USER: 'create_user',
    READ_USER: 'read_user',
    UPDATE_USER: 'update_user',
    DELETE_USER: 'delete_user',
    ASSIGN_ROLE: 'assign_role',
    REVOKE_ROLE: 'revoke_role',
    MANAGE_ORG: 'manage_org',
    VIEW_ORG: 'view_org',
    CREATE_RESOURCE: 'create_resource',
    READ_RESOURCE: 'read_resource',
    UPDATE_RESOURCE: 'update_resource',
    DELETE_RESOURCE: 'delete_resource',
    VIEW_REPORTS: 'view_reports',
    EXPORT_REPORTS: 'export_reports',
    MANAGE_BILLING: 'manage_billing',
    VIEW_BILLING: 'view_billing',
    MANAGE_SETTINGS: 'manage_settings',
    VIEW_SETTINGS: 'view_settings',
} as const;

// This generates a union type of all permission strings
export type Permission = typeof Permission[keyof typeof Permission];


// ─────────────────────────────────────────────────────────────────────────────
// Shared API types
// ─────────────────────────────────────────────────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    isSuperOwner: boolean;
    isActive: boolean;
    orgId: string;
    phone: string | null;
    photoUrl: string | null;
    isAvailable: boolean;
    statusMessage: string | null;
    permissions: Permission[];
    createdAt?: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface LoginResponse extends TokenPair {
    user: User;
}

export interface ApiError {
    message: string;
    statusCode: number;
}