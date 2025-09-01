// File: app/api/files/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FileItem } from '../../../../types/model';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const path = formData.get('path') as string || '/';

    // Simulate upload processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create mock file items for uploaded files
    const uploadedFiles: FileItem[] = files.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      type: 'file' as const,
      size: file.size,
      mimeType: file.type,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      path: `${path}${file.name}`,
    }));

    return NextResponse.json({
      success: true,
      data: uploadedFiles,
      message: `Successfully uploaded ${files.length} file(s)`,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Upload failed',
    }, { status: 500 });
  }
}

