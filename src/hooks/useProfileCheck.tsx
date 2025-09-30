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

        const apiBase =  'http://localhost:4000';
        const res = await fetch(`${apiBase}/api/profiles/${encodeURIComponent(user.id)}`);
        if (!res.ok) {
          // No profile yet
          setIsComplete(false);
        } else {
          const data = await res.json();
          setIsComplete(Boolean(data.profile?.is_profile_complete));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  return { isComplete, loading, error };
};