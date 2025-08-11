import React from 'react';
import { Sparkles } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-3 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          SIRA
        </h1>
        
        {/* Loading Text */}
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          AI-Powered Marketing Platform
        </p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-loading-bar"></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 animate-pulse">
            Loading your workspace...
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-md mx-auto">
          {['Content Generation', 'Image Creation', 'SEO Tools'].map((feature, index) => (
            <div
              key={feature}
              className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 animate-fade-in"
              style={{ animationDelay: `${1 + index * 0.2}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}