import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Role, type Role as RoleType } from '../../types/shared.types';

interface ProtectedRouteProps {
  allowedRoles?: RoleType[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, accessToken, status } = useSelector((state: RootState) => state.auth);

  // 1. Show loading spinner while silent session refresh is running on page reload
  if (status === 'loading' && !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-emerald-800 border-t-transparent" />
          <span className="text-sm font-medium text-emerald-950">Loading session...</span>
        </div>
      </div>
    );
  }

  // 2. Check authentication
  if (!accessToken || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2. Check Role authorization if allowedRoles is specified
  if (allowedRoles && allowedRoles.length > 0) {
    // Super Owner has global access to all protected routes
    const hasRole = user.isSuperOwner || allowedRoles.includes(user.role);

    if (!hasRole) {
      // Redirect unauthorized users to main dashboard or unauthorized page
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
};
