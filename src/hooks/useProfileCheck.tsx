import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getMongoDb } from '../lib/realm';

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

        const dbName = import.meta.env.VITE_MONGODB_DB_NAME || 'sira';
        const db = await getMongoDb(dbName);
        const profiles = db.collection<any>('profiles');
        const existing = await profiles.findOne({ id: user.id });
        if (!existing) {
          await profiles.insertOne({
            id: user.id,
            email: user.profile?.email ?? user.id,
            full_name: undefined,
            phone_number: undefined,
            is_profile_complete: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          setIsComplete(false);
        } else {
          setIsComplete(Boolean(existing.is_profile_complete));
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