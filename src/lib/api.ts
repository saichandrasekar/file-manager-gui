// File: lib/api.ts
import { FileItem, ApiResponse, ListFilesResponse, SearchFilesParams } from '../types/model';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:18000/api/ftp';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async listFiles(
    page: number = 1,
    pageSize: number = 50,
    path: string = '/'
  ): Promise<ApiResponse<ListFilesResponse>> {
    return this.request<ListFilesResponse>(
      `/list?page=${page}&pageSize=${pageSize}&path=${encodeURIComponent(path)}`
    );
  }

  async searchFiles(params: SearchFilesParams): Promise<ApiResponse<ListFilesResponse>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    return this.request<ListFilesResponse>(`/files/search?${searchParams.toString()}`);
  }

  async uploadFiles(files: FileList, path: string = '/'): Promise<ApiResponse<FileItem[]>> {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    formData.append('path', path);

    return this.request<FileItem[]>('/files/upload', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async deleteFiles(fileIds: string[]): Promise<ApiResponse<{ deletedCount: number }>> {
    return this.request<{ deletedCount: number }>('/files/delete', {
      method: 'DELETE',
      body: JSON.stringify({ fileIds }),
    });
  }

  async createFolder(name: string, path: string = '/'): Promise<ApiResponse<FileItem>> {
    return this.request<FileItem>('/files/folder', {
      method: 'POST',
      body: JSON.stringify({ name, path }),
    });
  }

  async downloadFile(fileId: string): Promise<Blob | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${fileId}/download`);
      if (!response.ok) throw new Error('Download failed');
      return await response.blob();
    } catch (error) {
      console.error('Download error:', error);
      return null;
    }
  }
}

export const apiClient = new ApiClient();

