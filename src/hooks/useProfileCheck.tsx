import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabaseClient';

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

        const { data, error } = await supabase
          .from('profiles')
          .select('is_profile_complete')
          .eq('id', user.id)
          .single();

        if (error) {
          // If profile doesn't exist, create it
          if (error.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || user.user_metadata?.display_name,
                phone_number: user.user_metadata?.phone,
                is_profile_complete: false
              });

            if (insertError) {
              setError(insertError.message);
            } else {
              setIsComplete(false);
            }
          } else {
            setError(error.message);
          }
        } else {
          setIsComplete(data?.is_profile_complete || false);
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