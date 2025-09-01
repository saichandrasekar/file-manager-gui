// File: app/api/files/folder/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FileItem } from '../../../../types/model';

export async function POST(request: NextRequest) {
  try {
    const { name, path } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Folder name is required',
      }, { status: 400 });
    }

    // Simulate folder creation
    await new Promise(resolve => setTimeout(resolve, 300));

    const newFolder: FileItem = {
      id: `folder-${Date.now()}`,
      name: name.trim(),
      type: 'folder',
      size: 0,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      path: `${path}${name.trim()}`,
    };

    return NextResponse.json({
      success: true,
      data: newFolder,
      message: 'Folder created successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create folder',
    }, { status: 500 });
  }
}

