import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse } from '../types';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/auth/session`,
        {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          setAccessToken(storedToken);
        } else {
          localStorage.removeItem('accessToken');
          setUser(null);
          setAccessToken(null);
        }
      } else {
        localStorage.removeItem('accessToken');
        setUser(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      localStorage.removeItem('accessToken');
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data: AuthResponse = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Login failed');
    }

    setUser(data.data.user);
    setAccessToken(data.data.accessToken);
    localStorage.setItem('accessToken', data.data.accessToken);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Signup failed');
    }

    // After signup, automatically log in
    await login(email, password);
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/auth/logout`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, signup, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
