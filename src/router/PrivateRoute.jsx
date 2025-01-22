import React from 'react'
import {  Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
  const status = useAuthStore((state) => state.status); 

  return (status === 'authorized')
    ? children
    : <Navigate to="/login" />
}

export default PrivateRoute