// File: components/FileManager/Header.tsx
import React, { useState } from 'react';
import { Search, Upload, FolderPlus, Trash2, Download, Grid, List, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import clsx from 'clsx';

interface HeaderProps {
  onSearch: (query: string) => void;
  onUpload: () => void;
  onCreateFolder: () => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  selectedCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  loading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onUpload,
  onCreateFolder,
  onDeleteSelected,
  onRefresh,
  selectedCount,
  viewMode,
  onViewModeChange,
  loading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={clsx(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={clsx(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className={clsx('w-4 h-4 mr-2', loading && 'animate-spin')} />
            Refresh
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onCreateFolder}
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onUpload}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>

          {selectedCount > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={onDeleteSelected}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

