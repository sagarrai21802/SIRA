// src/hooks/useAuth.tsx
import { useEffect, useState, useContext, createContext } from "react";
import * as Realm from "realm-web";
import { getRealmApp, getMongoDb } from "../lib/realm";
import { upsertAppUser } from "../lib/database";

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
    // Mirror into users collection if already authenticated
    (async () => {
      try {
        if (current) {
          const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
          const db = await getMongoDb(dbName);
          const email = (current as any)?.profile?.email ?? null;
          await db.collection('users').updateOne(
            { id: current.id },
            { $setOnInsert: { id: current.id, email, created_at: new Date().toISOString() } },
            { upsert: true }
          );
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
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
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
    // Depending on Realm config, email confirmation may be required.
    try {
      // If registration succeeds, mirror into users collection optimistically
      const current = app.currentUser;
      if (current) {
        await upsertAppUser(current.id, (current as any)?.profile?.email ?? email ?? null);
      }
    } catch {}
    return { isConfirmed: true };
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
