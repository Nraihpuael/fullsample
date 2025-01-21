import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../hocs/layouts/AuthLayout';
import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import useAuthStore from '../store/authStore';

import Home from '../pages/comun/Home';
import Login from '../pages/comun/Login';
import Register from '../pages/comun/Register';
import MyCategoriesPage from '../pages/category/MyCategoriesPage';
import MyNotesPage from '../pages/note/MyNotesPage';
import NoteDetailsPage from '../pages/note/NoteDetailsPage';
import FormNotePage from '../pages/note/FormNotePage';
import MyNotesArchivedPage from '../pages/note/MyNotesArchivedPage';

import Error404 from '../pages/comun/Error404';

export const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Routes>
      <Route path='/' element={<FullWithLayout />}>
        {/* Public */}
        <Route index element={<Home />} />
        <Route path='*' element={<Error404 />} />
        
        {/* Protected */}        
        <Route path='note/:id' element={<ProtectedRoute> <NoteDetailsPage /> </ProtectedRoute>} />
        <Route path='notes' element={<ProtectedRoute> <MyNotesPage /> </ProtectedRoute>} />
        <Route path='note' element={<ProtectedRoute> <FormNotePage /> </ProtectedRoute>} />
        <Route path='archived' element={<ProtectedRoute> <MyNotesArchivedPage /> </ProtectedRoute>} />
        <Route path='categories' element={<ProtectedRoute> <MyCategoriesPage /> </ProtectedRoute>} />
      </Route>

      {/* Authenticated */}
      <Route path='/auth' element={isAuthenticated() ? <Navigate to='/' replace /> : <AuthLayout />}      >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
};