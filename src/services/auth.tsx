import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetUserMutation, useLoginMutation, useLogoutMutation } from '../store/auth';

interface AuthContextType {
  user: any;
  error: any;
  isError: boolean;
  signIn: (username: string, password: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
  googleSingIn: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>();
  const [isLoaded, setIsLoaded] = React.useState<any>(false);
  const [getUser, { error, isError }]: any = useGetUserMutation();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user } = await getUser();
        if (user) {
          setUser(user.email);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [getUser]);

  const signIn = async (email: string, password: string, callback: VoidFunction) => {
    await login({ email, password });
    const { data: user } = await getUser();
    setUser(user?.email);
    setIsLoaded(true);
    callback();
  };

  const signOut = async (callback: VoidFunction) => {
    await logout();
    setUser(null);
    callback();
  };

  const googleSingIn = async () => {
    const googleAuthUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/google/login`;
    window.location.href = googleAuthUrl;
  };

  const value = { user, signIn, signOut, error, isError, googleSingIn };

  return isLoaded && <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireNotAuthed({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
}
