// File: components/FileManager/FileGrid.tsx
import React from 'react';
import { FileItem } from '../../types/model';
import { formatFileSize, formatDate, getFileIcon } from '../../utils/helpers';
import { MoreVertical, Download } from 'lucide-react';
import { clsx } from 'clsx';

interface FileGridProps {
  files: FileItem[];
  selectedFiles: Set<string>;
  onFileSelect: (fileId: string) => void;
  onFileDoubleClick: (file: FileItem) => void;
  onDownload: (fileId: string) => void;
  viewMode: 'grid' | 'list';
}

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  selectedFiles,
  onFileSelect,
  onFileDoubleClick,
  onDownload,
  viewMode
}) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  files.forEach(file => onFileSelect(file.id));
                } else {
                  files.forEach(file => {
                    if (selectedFiles.has(file.id)) onFileSelect(file.id);
                  });
                }
              }}
              checked={files.length > 0 && files.every(file => selectedFiles.has(file.id))}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
          </div>
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Modified</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* File Rows */}
        <div className="divide-y divide-gray-200">
          {files.map((file) => (
            <div
              key={file.id}
              className={clsx(
                'grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors',
                selectedFiles.has(file.id) && 'bg-orange-50'
              )}
            >
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.id)}
                  onChange={() => onFileSelect(file.id)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
              </div>
              
              <div 
                className="col-span-5 flex items-center space-x-3 cursor-pointer"
                onDoubleClick={() => onFileDoubleClick(file)}
              >
                <span className="text-2xl">{getFileIcon(file)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  {file.type === 'file' && file.mimeType && (
                    <p className="text-xs text-gray-500">{file.mimeType}</p>
                  )}
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-500">
                  {file.type === 'file' ? formatFileSize(file.size) : '—'}
                </span>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-500">{formatDate(file.modifiedAt)}</span>
              </div>

              <div className="col-span-2 flex items-center space-x-2">
                {file.type === 'file' && (
                  <button
                    onClick={() => onDownload(file.id)}
                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-6">
      {files.map((file) => (
        <div
          key={file.id}
          className={clsx(
            'relative group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer',
            selectedFiles.has(file.id) && 'ring-2 ring-orange-500 bg-orange-50'
          )}
          onClick={() => onFileSelect(file.id)}
          onDoubleClick={() => onFileDoubleClick(file)}
        >
          {/* Selection Checkbox */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <input
              type="checkbox"
              checked={selectedFiles.has(file.id)}
              onChange={(e) => {
                e.stopPropagation();
                onFileSelect(file.id);
              }}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
          </div>

          {/* File Icon */}
          <div className="flex justify-center mb-3">
            <span className="text-4xl">{getFileIcon(file)}</span>
          </div>

          {/* File Name */}
          <h3 className="text-sm font-medium text-gray-900 text-center truncate mb-1">
            {file.name}
          </h3>

          {/* File Info */}
          <div className="text-xs text-gray-500 text-center">
            {file.type === 'file' ? formatFileSize(file.size) : 'Folder'}
          </div>

          {/* Actions */}
          {file.type === 'file' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file.id);
              }}
              className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-orange-600"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

