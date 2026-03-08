import { useState, useEffect } from 'react';

export function useTheme() {
  // Force dark mode only - no light mode
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Always use dark mode
    setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, [theme]);

  // Theme toggle disabled - dark mode only
  const toggleTheme = () => {
    // No-op - dark mode only
  };

  return { theme: 'dark' as const, toggleTheme };
}