// File: components/FileManager/EmptyState.tsx
import React from 'react';
import { FolderOpen, Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface EmptyStateProps {
  isSearchResult?: boolean;
  onUpload: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isSearchResult = false,
  onUpload
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <FolderOpen className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isSearchResult ? 'No files found' : 'This folder is empty'}
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        {isSearchResult 
          ? 'Try adjusting your search terms or browse through folders'
          : 'Get started by uploading some files or creating a new folder'
        }
      </p>
      {!isSearchResult && (
        <Button variant="primary" onClick={onUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      )}
    </div>
  );
};

