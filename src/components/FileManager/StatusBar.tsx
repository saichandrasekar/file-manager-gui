// File: components/FileManager/StatusBar.tsx
import React from 'react';
import { formatFileSize } from '@/utils/helpers';

interface StatusBarProps {
  totalFiles: number;
  selectedCount: number;
  totalSize: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  totalFiles,
  selectedCount,
  totalSize
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>{totalFiles} items</span>
          {selectedCount > 0 && (
            <span className="text-orange-600 font-medium">
              {selectedCount} selected
            </span>
          )}
        </div>
        
        {totalSize > 0 && (
          <span>Total size: {formatFileSize(totalSize)}</span>
        )}
      </div>
    </div>
  );
};
