import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { AuthProvider, RequireAuth, RequireNotAuthed } from './services/auth';
import { HomeScreen } from './views/HomeScreen';

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
                <HomeScreen />
              </RequireAuth>
            }
          />
          <Route
            path="*"
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
