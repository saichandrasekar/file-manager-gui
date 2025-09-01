// File: app/api/files/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FileItem, ListFilesResponse } from '../../../../types/model';

// Mock files for search (same as above, but would typically be from database)
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
    id: '3',
    name: 'presentation.pdf',
    type: 'file',
    size: 2456789,
    mimeType: 'application/pdf',
    createdAt: '2024-01-18T11:00:00Z',
    modifiedAt: '2024-01-18T11:00:00Z',
    path: '/presentation.pdf',
  },
  // ... other mock files
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') as 'file' | 'folder' | 'all' | null;
  const mimeType = searchParams.get('mimeType');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '50');

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Filter files based on search criteria
  let filteredFiles = mockFiles.filter(file => {
    const matchesQuery = file.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = !type || type === 'all' || file.type === type;
    const matchesMimeType = !mimeType || file.mimeType === mimeType;
    
    return matchesQuery && matchesType && matchesMimeType;
  });

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

