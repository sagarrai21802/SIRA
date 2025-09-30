// src/hooks/useAuth.tsx
import { useEffect, useState, useContext, createContext } from "react";
import * as Realm from "realm-web";
import { getRealmApp } from "../lib/realm";

// New AuthContextType with updated signUp signature
interface AuthContextType {
  user: Realm.User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, options?: { displayName?: string; phone?: string }) => Promise<{ isConfirmed: boolean }>;
  signOut: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = getRealmApp();
    // Initialize current user if present
    const current = app.currentUser ?? null;
    setUser(current);
    // Mirror into users via backend
    (async () => {
      try {
        if (current) {
          const email = (current as any)?.profile?.email ?? null;
          const apiBase =  'http://localhost:4000';
          await fetch(`${apiBase}/api/users/upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: current.id, email })
          });
        }
      } catch {}
    })();
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const app = getRealmApp();
    const credentials = Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
    setUser(app.currentUser ?? null);
    // Also call backend route to upsert (useful when client rules restrict writes)
    try {
      const apiBase = 'http://localhost:4000';
      await fetch(`${apiBase}/api/users/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: app.currentUser!.id, email })
      });
    } catch {}
  };

  const signOut = async () => {
    const app = getRealmApp();
    if (app.currentUser) {
      await app.currentUser.logOut();
    }
    setUser(null);
  };

  const signUp = async (email: string, password: string, _options: { displayName?: string; phone?: string } = {}) => {
    const app = getRealmApp();
    await app.emailPasswordAuth.registerUser({ email, password });
    const apiBase = 'http://localhost:4000';
    // Try to log in immediately to obtain user id for upserts.
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      await app.logIn(credentials);
      const current = app.currentUser;
      if (current) {
        // Upsert user record
        await fetch(`${apiBase}/api/users/upsert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: current.id, email: (current as any)?.profile?.email ?? email ?? null })
        });
        // Upsert profile with extra fields
        const profilePayload: any = {
          id: current.id,
          email: (current as any)?.profile?.email ?? email ?? null,
          full_name: _options?.displayName ?? null,
          phone: _options?.phone ?? null
        };
        await fetch(`${apiBase}/api/profiles/upsert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profilePayload)
        });
        // Log out to keep signup flow consistent (user will log in next)
        await app.currentUser?.logOut();
      }
      return { isConfirmed: true };
    } catch (err: any) {
      // Likely email confirmation required, can't log in yet
      return { isConfirmed: false };
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
