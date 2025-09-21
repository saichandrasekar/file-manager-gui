// File: types/file.ts
export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  mimeType?: string;
  createdAt: string;
  modifiedAt: string;
  path: string;
  thumbnail?: string;
  isSelected?: boolean;
  
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ListFilesResponse {
  fileList: FileItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface SearchFilesParams {
  query: string;
  type?: 'file' | 'folder' | 'all';
  mimeType?: string;
  page?: number;
  pageSize?: number;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

