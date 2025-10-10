import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfileCheck } from '../hooks/useProfileCheck';
import { useAuth } from '../hooks/useAuth';
import { LoadingScreen } from './LoadingScreen';

interface ProfileGuardProps {
  children: React.ReactNode;
}

export const ProfileGuard: React.FC<ProfileGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const { isComplete, loading, error } = useProfileCheck();
  const navigate = useNavigate();
  const location = useLocation();

  // Routes where profile check should be skipped
  const skipProfileCheckRoutes = [
    '/personalization',
    '/profile',
    '/login',
    '/signup',
    '/auth/callback',
    '/',
    '/complaint-deletion'
  ];

  const shouldSkipCheck = skipProfileCheckRoutes.includes(location.pathname);

  const bypassOnce = (location.state as any)?.profileCompleted === true;
  const skippedPersonalization = typeof window !== 'undefined' && (user?.id ? localStorage.getItem(`skip_personalization_${user.id}`) === 'true' : false);

  useEffect(() => {
    if (!loading && user && !shouldSkipCheck && !isComplete) {
      if (bypassOnce || skippedPersonalization) {
        return;
      }
      // Store the current path to redirect back after profile completion
      const currentPath = location.pathname;
      if (currentPath !== '/personalization') {
        navigate('/personalization', { 
          replace: true,
          state: { returnTo: currentPath }
        });
      }
    }
  }, [loading, user, isComplete, shouldSkipCheck, navigate, location.pathname, bypassOnce, skippedPersonalization]);

  // Show loading screen while checking profile status
  if (!shouldSkipCheck && user && loading) {
    return <LoadingScreen />;
  }

  // Show error if there's an issue checking profile
  if (!shouldSkipCheck && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Profile Check Error
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};