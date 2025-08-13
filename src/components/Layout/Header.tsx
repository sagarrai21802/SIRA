import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SIRA</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/dashboard')
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/content"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/content')
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Content
                </Link>
                <Link
                  to="/template"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/content')
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Template
                </Link>
                <Link
                  to="/images"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/images')
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Images
                </Link>
                <Link
                  to="/seo"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/seo')
                      ? 'text-blue-600'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  SEO
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.email}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}