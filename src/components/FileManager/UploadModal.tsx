// File: components/FileManager/UploadModal.tsx
"use client";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { UploadProgress } from '../../types/model';
import { formatFileSize } from '../../utils/helpers';
import clsx from 'clsx';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList) => void;
  uploadProgress: UploadProgress[];
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  uploadProgress
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const fileList = new DataTransfer();
      selectedFiles.forEach(file => fileList.items.add(file));
      onUpload(fileList.files);
      setSelectedFiles([]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const hasUploads = uploadProgress?.length > 0;
  const isUploading = uploadProgress?.some(p => p.status === 'uploading');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Files" size="lg">
      <div className="space-y-6">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={clsx(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-300 hover:border-orange-400'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-gray-500">
            or click to select files from your computer
          </p>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Selected Files</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {hasUploads && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Upload Progress</h3>
            <div className="space-y-2">
              {uploadProgress.map((progress, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{progress.fileName}</span>
                    <div className="flex items-center space-x-2">
                      {progress.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {progress.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-500">{progress.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={clsx(
                        'h-2 rounded-full transition-all',
                        progress.status === 'error' ? 'bg-red-500' : 'bg-orange-500'
                      )}
                      style={{ width: `${progress.progress}%` }}
                    />
                  </div>
                  {progress.error && (
                    <p className="text-xs text-red-600">{progress.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
          >
            Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

