import React from 'react';

const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse flex items-center space-x-4">
        <div className="rounded bg-gray-300 dark:bg-gray-700 h-16 w-16" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader; 