import React, { useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, className = '', activeTab, setActiveTab }: TabsListProps & { activeTab?: string; setActiveTab?: (value: string) => void }) {
  return (
    <div className={`flex space-x-1 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '', activeTab, setActiveTab }: TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`
        flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-colors
        ${isActive
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '', activeTab }: TabsContentProps & { activeTab?: string }) {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
}