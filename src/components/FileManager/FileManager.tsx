"use client";
// File: components/FileManager/FileManager.tsx
import React, { useState, useCallback } from 'react';
import { FileItem } from '../../types/model';
import { useFileManager } from '../../hooks/useFileManager';
import { apiClient } from '../../lib/api';
import { Header } from './Header';
import { Breadcrumb } from './Breadcrumb';
import { FileGrid } from './FileGrid';
import { UploadModal } from './UploadModal';
import { CreateFolderModal } from './CreateFolderModal';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';
import { Pagination } from './Pagination';

export const FileManager: React.FC = () => {
  const {
    files,
    loading,
    error,
    currentPath,
    selectedFiles,
    uploadProgress,
    totalCount,
    currentPage,
    pageSize,
    loadFiles,
    searchFiles,
    uploadFiles,
    deleteSelectedFiles,
    toggleFileSelection,
    selectAllFiles,
    clearSelection,
    setCurrentPath,
  } = useFileManager();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (query.trim()) {
      setIsSearchMode(true);
      await searchFiles({ query: query.trim(), page: 1, pageSize });
    } else {
      setIsSearchMode(false);
      await loadFiles(currentPath);
    }
  }, [searchFiles, loadFiles, currentPath, pageSize]);

  const handleFileDoubleClick = useCallback((file: FileItem) => {
    if (file.type === 'folder') {
      const newPath = file.path;
      setCurrentPath(newPath);
      loadFiles(newPath);
      setIsSearchMode(false);
      clearSelection();
    }
  }, [setCurrentPath, loadFiles, clearSelection]);

  const handleNavigate = useCallback((path: string) => {
    setCurrentPath(path);
    loadFiles(path);
    setIsSearchMode(false);
    clearSelection();
  }, [setCurrentPath, loadFiles, clearSelection]);

  const handleDownload = useCallback(async (fileId: string) => {
    try {
      const blob = await apiClient.downloadFile(fileId);
      if (blob) {
        const file = files.find(f => f.id === fileId);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file?.name || 'download';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, [files]);

  const handleUpload = useCallback((fileList: FileList) => {
    uploadFiles(fileList);
  }, [uploadFiles]);

  const handleCreateFolder = useCallback(async (name: string) => {
    try {
      const response = await apiClient.createFolder(`${currentPath}/${name}`);
      await loadFiles(currentPath);
    } catch (err) {
      console.error('Failed to create folder:', err);
    }
  }, [currentPath, loadFiles]);

  const handlePageChange = useCallback((page: number) => {
    if (isSearchMode) {
      // Re-run last search with new page
      // In a real app, you'd store the last search params
      return;
    }
    loadFiles(currentPath, page);
  }, [isSearchMode, loadFiles, currentPath]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onUpload={() => setIsUploadModalOpen(true)}
        onCreateFolder={() => setIsCreateFolderModalOpen(true)}
        onDeleteSelected={deleteSelectedFiles}
        onRefresh={() => loadFiles(currentPath)}
        selectedCount={selectedFiles.size}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        loading={loading}
      />

      {/* Breadcrumb */}
      {!isSearchMode && (
        <Breadcrumb
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {loading ? (
          <LoadingSpinner />
        ) : files.length === 0 ? (
          <EmptyState 
            isSearchResult={isSearchMode}
            onUpload={() => setIsUploadModalOpen(true)}
          />
        ) : (
          <>
            <FileGrid
              files={files}
              selectedFiles={selectedFiles}
              onFileSelect={toggleFileSelection}
              onFileDoubleClick={handleFileDoubleClick}
              onDownload={handleDownload}
              viewMode={viewMode}
            />
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        uploadProgress={uploadProgress}
      />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
};

