// File: hooks/useFileManager.ts
'use client'


import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react';
import { FileItem, SearchFilesParams, UploadProgress } from '../types/model';
import { apiClient } from '../lib/api';

export const useFileManager = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);

  const loadFiles = useCallback(async (path: string = currentPath, page: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.listFiles(page, pageSize, path);
      if (response.success) {
        setFiles(response.data.files);
        setTotalCount(response.data.totalCount);
        setCurrentPage(response.data.page);
        setCurrentPath(path);
      } else {
        setError(response.error || 'Failed to load files');
      }
    } catch (err) {
      setError('Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [currentPath, pageSize]);

  const searchFiles = useCallback(async (params: SearchFilesParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.searchFiles(params);
      if (response.success) {
        setFiles(response.data.files);
        setTotalCount(response.data.totalCount);
        setCurrentPage(response.data.page);
      } else {
        setError(response.error || 'Search failed');
      }
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFiles = useCallback(async (fileList: FileList) => {
    const progressItems: UploadProgress[] = Array.from(fileList).map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'pending'
    }));
    
    setUploadProgress(progressItems);

    try {
      // Simulate upload progress (in real app, you'd track actual upload progress)
      progressItems.forEach((item, index) => {
        setTimeout(() => {
          setUploadProgress(prev => 
            prev.map((p, i) => i === index ? { ...p, status: 'uploading', progress: 50 } : p)
          );
        }, index * 100);
      });

      const response = await apiClient.uploadFiles(fileList, currentPath);
      
      if (response.success) {
        setUploadProgress(prev => 
          prev.map(p => ({ ...p, status: 'completed', progress: 100 }))
        );
        // Refresh file list
        await loadFiles(currentPath);
        // Clear progress after 2 seconds
        setTimeout(() => setUploadProgress([]), 2000);
      } else {
        setUploadProgress(prev => 
          prev.map(p => ({ ...p, status: 'error', error: response.error }))
        );
        setError(response.error || 'Upload failed');
      }
    } catch (err) {
      setUploadProgress(prev => 
        prev.map(p => ({ ...p, status: 'error', error: 'Upload failed' }))
      );
      setError('Upload failed');
    }
  }, [currentPath, loadFiles]);

  const deleteSelectedFiles = useCallback(async () => {
    if (selectedFiles.size === 0) return;

    try {
      const response = await apiClient.deleteFiles(Array.from(selectedFiles));
      if (response.success) {
        setSelectedFiles(new Set());
        await loadFiles(currentPath);
      } else {
        setError(response.error || 'Delete failed');
      }
    } catch (err) {
      setError('Delete failed');
    }
  }, [selectedFiles, currentPath, loadFiles]);

  const toggleFileSelection = useCallback((fileId: string) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  }, []);

  const selectAllFiles = useCallback(() => {
    setSelectedFiles(new Set(files.map(f => f.id)));
  }, [files]);

  const clearSelection = useCallback(() => {
    setSelectedFiles(new Set());
  }, []);

  useEffect(() => {
    loadFiles();
  }, []);

  return {
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
  };
};

