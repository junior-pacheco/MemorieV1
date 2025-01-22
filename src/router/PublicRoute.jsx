import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const status = useAuthStore((state) => state.status);

  return status === 'authorized'
    ? <Navigate to="/users" /> 
    : children;
};

export default PublicRoute;
