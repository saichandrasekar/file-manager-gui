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
      let counter = 1;
      response.data.fileList.forEach((element) =>{
        element.id = counter.toString();
        element.type = element.type.toLocaleUpperCase()==='DIRECTORY'?'folder':'file';
        counter++;
      })
      setFiles(response.data.fileList);
      setTotalCount(response.data.fileList?.length);
      setCurrentPage(page);
      setCurrentPath(path);
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
        setFiles(response.data.fileList);
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
      
      console.log(`here 34534`)
      if (response?.data) {
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
    console.log(`Delete files or folders`);
    const deleteObjects = []
    selectedFiles.forEach(fileId =>{
      deleteObjects.push(...files.filter(file =>{return file.id==fileId}));
    });
    console.log(deleteObjects);

      try {
          const response:any = await apiClient.deleteFiles(deleteObjects);
          if (response?.data) {
            const results:any[] = response.data.results.filter((e:any) =>{return (!e.success)});
            
            
            if(results?.length>0){
              setError(JSON.stringify(results) || 'Delete failed');
            }
            setSelectedFiles(new Set());
          } else {
            setError(response.error || 'Delete failed');
          }
      } catch (err) {
        setError('Delete failed');
      }
      
    // });
    await loadFiles(currentPath);
    
  }, [selectedFiles, currentPath, loadFiles]);

  const toggleFileSelection = useCallback((file: FileItem) => {
    console.log(`File selected`)
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(file.id)) {
        newSet.delete(file.id);
      } else {
        newSet.add(file.id);
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

