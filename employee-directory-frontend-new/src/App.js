import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/login' replace />;
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      } />
      <Route path="/employee/:id" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
