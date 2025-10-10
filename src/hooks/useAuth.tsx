// src/hooks/useAuth.tsx
import { useEffect, useState, useContext, createContext } from "react";
import { API_BASE, API_ENDPOINTS } from "../lib/api";

interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  company_name?: string;
  industry?: string;
  business_type?: string;
  location?: string;
  company_size?: string;
  target_audience?: string;
  brand_voice?: string;
  goals?: string;
  linkedin_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  primary_brand_color?: string;
  brand_logo_url?: string;
  brand_logo_public_id?: string;
  brand_motto?: string;
  brand_mission?: string;
  brand_about?: string;
  is_premium?: boolean;
  image_prefs?: {
    include_brand_logo_by_default?: boolean;
    apply_brand_theme_by_default?: boolean;
  };
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, options?: { displayName?: string; phone?: string }) => Promise<{ isConfirmed: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = API_BASE;

  const fetchWithTimeout = async (input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(id);
    }
  };

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await fetchWithTimeout(`${apiBase}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }, 8000);
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('auth_token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiBase}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Preserve special flags like needsPasswordSetup when present
        const error: any = new Error(data.error || 'Login failed');
        if (data && typeof data === 'object' && 'needsPasswordSetup' in data) {
          error.needsPasswordSetup = Boolean(data.needsPasswordSetup);
        }
        throw error;
      }

      // Store token and user data
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signUp = async (email: string, password: string, options: { displayName?: string; phone?: string } = {}) => {
    try {
      const response = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          full_name: options.displayName,
          phone: options.phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // For now, we'll assume registration is successful and user can log in immediately
      // In a real app, you might want to implement email verification
      return { isConfirmed: true };
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch(`${apiBase}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};