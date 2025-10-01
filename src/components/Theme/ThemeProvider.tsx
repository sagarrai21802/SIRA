import React, { createContext, useContext, useEffect } from 'react';
import { theme, cssVariables } from '../../lib/theme';

interface ThemeContextType {
  theme: typeof theme;
  applyTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const applyTheme = () => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Add theme class to body for global styling
    document.body.classList.add('sira-theme');
  };

  useEffect(() => {
    applyTheme();
  }, []);

  const value = {
    theme,
    applyTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
