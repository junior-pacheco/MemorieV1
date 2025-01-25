import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ProfilePage from '../pages/ProfilePage';
import UserRoutes from './UserRoutes';
import Login from '../pages/LoginPage';
import MemoriesPage from '../pages/MemoriesPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <UserRoutes />
          </PrivateRoute>
        }
      />
      <Route path="/crear-perfil" element={<MemoriesPage />} />
      <Route path="/profile/:profileId" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRouter;
