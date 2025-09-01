// File: components/FileManager/LoadingSpinner.tsx
import React from 'react';
import { RefreshCw } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-6 h-6 text-orange-600 animate-spin" />
        <span className="text-gray-600">Loading files...</span>
      </div>
    </div>
  );
};

