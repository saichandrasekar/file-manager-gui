// File: app/api/files/route.ts (Mock API for demonstration)
import { NextRequest, NextResponse } from 'next/server';
import { FileItem, ListFilesResponse } from '../../../types/model';

// Mock data - in a real app, this would come from a database
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    size: 0,
    createdAt: '2024-01-15T10:30:00Z',
    modifiedAt: '2024-01-20T14:45:00Z',
    path: '/Documents',
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    size: 0,
    createdAt: '2024-01-10T09:15:00Z',
    modifiedAt: '2024-01-25T16:20:00Z',
    path: '/Images',
  },
  {
    id: '3',
    name: 'presentation.pdf',
    type: 'file',
    size: 2456789,
    mimeType: 'application/pdf',
    createdAt: '2024-01-18T11:00:00Z',
    modifiedAt: '2024-01-18T11:00:00Z',
    path: '/presentation.pdf',
  },
  {
    id: '4',
    name: 'report.docx',
    type: 'file',
    size: 1234567,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    createdAt: '2024-01-19T13:30:00Z',
    modifiedAt: '2024-01-22T09:45:00Z',
    path: '/report.docx',
  },
  {
    id: '5',
    name: 'screenshot.png',
    type: 'file',
    size: 987654,
    mimeType: 'image/png',
    createdAt: '2024-01-21T15:20:00Z',
    modifiedAt: '2024-01-21T15:20:00Z',
    path: '/screenshot.png',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '50');
  const path = searchParams.get('path') || '/';

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter files by path (in a real app, this would be a database query)
  let filteredFiles = mockFiles.filter(file => 
    file.path.startsWith(path) && file.path !== path
  );

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  const response: ListFilesResponse = {
    files: paginatedFiles,
    totalCount: filteredFiles.length,
    page,
    pageSize,
  };

  return NextResponse.json({
    success: true,
    data: response,
  });
}

