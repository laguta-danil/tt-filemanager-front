import { BrowserRouter, Link, Navigate, redirect, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { AuthProvider, RequireAuth, RequireNotAuthed } from './services/auth';
import { HomeScreen } from './views/HomeScreen';
import React from 'react';

export default function RealSoftRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <RequireNotAuthed>
                <Login />
              </RequireNotAuthed>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/home" state={{ from: '/' }} replace></Navigate>
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomeScreen />
              </RequireAuth>
            }>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <HomeScreen />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/*"
            element={
              <RequireAuth>
                <main>
                  <p>Theres nothing here!</p>
                </main>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
