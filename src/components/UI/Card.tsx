import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = false, style }: CardProps) {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm
        ${hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200' : ''}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg ${className}`}>
      {children}
    </div>
  );
}