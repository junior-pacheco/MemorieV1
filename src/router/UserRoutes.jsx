import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UsersTable from  '../pages/Users'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<UsersTable/>} />
      <Route path="/*" element={<Navigate to="/users" />} />
    </Routes>
  )
}

export default UserRoutes