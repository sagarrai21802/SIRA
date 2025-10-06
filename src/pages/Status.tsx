import React from 'react';

export default function Status() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Status Page</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Real-time status of SYRA.io services and systems.
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Service status and incident reports will be displayed here.
      </p>
    </div>
  );
}