import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../components/Login';
import Home from '../pages/Home';
import ProfilePage from '../pages/ProfilePage';
import UserRoutes from './UserRoutes';

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
      <Route path="/crear-perfil" element={<Home />} />
      <Route path="/profile/:profileId" element={<ProfilePage />} />
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;
