import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../modules/dashboard/pages/LandingPage';
import Dashboard from '../modules/dashboard/pages/mainDashboard';
import Register from '../modules/auth/pages/Register';
import { UserLogin } from '../modules/auth/pages/userLogin';
import { VerifyEmailPending } from '../modules/auth/pages/VerifyEmailPending';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
// import { Role } from '../types/shared.types';
// import ManageGoats from '../modules/herd-management/pages/ManageGoats';
// import AnimalPanel from '../modules/herd-management/pages/AnimalPanel';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify-email/pending" element={<VerifyEmailPending />} />
        <Route path="/auth/login" element={<UserLogin />} />

        {/* Protected Dashboard Routes (Authenticated Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard/AnimalPanel" element={<AnimalPanel />} /> extra page */}
        </Route>

        {/* Role-Restricted Routes (Super Owner, Manager) */}
        {/* <Route element={<ProtectedRoute allowedRoles={[Role.SUPER_OWNER, Role.MANAGER]} />}>
          <Route path="/dashboard/ManageGoats" element={<ManageGoats />} />
        </Route> */}

        {/* <Route path="/auth/worker/login" element={<UserLogin />} />
        <Route path="/auth/verify-email" element={<UserLogin />} />
        <Route path="/auth/verify-email/success" element={<UserLogin />} />
        <Route path="/auth/verify-email/failure" element={<UserLogin />} />
        <Route path="/auth/verify-email/expired" element={<UserLogin />} />
        <Route path="/auth/verify-email/error" element={<UserLogin />} />
        <Route path="/auth/forgot-password" element={<UserLogin />} />
        <Route path="/auth/reset-password" element={<UserLogin />} />
        <Route path="/auth/reset-password/success" element={<UserLogin />} />
        <Route path="/auth/reset-password/failure" element={<UserLogin />} />
        <Route path="/auth/reset-password/expired" element={<UserLogin />} />
        <Route path="/auth/reset-password/error" element={<UserLogin />} /> */}
      </Routes>
    </Router>
  );
};
