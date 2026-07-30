import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../modules/dashboard/pages/LandingPage';
import Dashboard from '../modules/dashboard/pages/mainDashboard';
import AnimalPanel from '../modules/herd-management/pages/AnimalPanel';
import ManageGoats from '../modules/herd-management/pages/ManageGoats';
import Register from '../modules/auth/pages/Register';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/AnimalPanel" element={<AnimalPanel />} />
        <Route path="/dashboard/ManageGoats" element={<ManageGoats />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
