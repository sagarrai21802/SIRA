import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseClient';

export function AuthCallback() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Clear any existing session to ensure user needs to log in
      await supabase.auth.signOut();
      
      navigate('/login', { 
        replace: true,
        state: { message: 'Email confirmed! Please log in with your credentials.' } 
      });
    };

    handleAuthCallback();
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
