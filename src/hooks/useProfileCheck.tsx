import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
// import { getMongoDb } from '../lib/realm';

export interface ProfileStatus {
  isComplete: boolean;
  loading: boolean;
  error: string | null;
}

export const useProfileCheck = (): ProfileStatus => {
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // If the user explicitly skipped personalization, bypass redirects
        const skipKey = `skip_personalization_${user.id}`;
        const skippedPersonalization = localStorage.getItem(skipKey) === 'true';
        if (skippedPersonalization) {
          setIsComplete(true);
          setLoading(false);
          return;
        }

        const apiBase = import.meta.env.VITE_API_BASE || 'https://sira-msb1.onrender.com';
        const authToken = localStorage.getItem('auth_token');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`, {
          headers: {
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
          // No profile yet
          setIsComplete(false);
        } else {
          const data = await res.json();
          setIsComplete(Boolean(data.profile?.is_profile_complete));
        }
      } catch (err: any) {
        // If network fails or times out, don't block the app — treat as complete to avoid loops
        setError(err.message);
        setIsComplete(true);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  return { isComplete, loading, error };
};