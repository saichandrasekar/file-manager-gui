// File: components/FileManager/ContextMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Download, Trash2, Edit, Copy, Move } from 'lucide-react';
import { FileItem } from '@/types/file';

interface ContextMenuProps {
  file: FileItem | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onDownload: (fileId: string) => void;
  onDelete: (fileId: string) => void;
  onRename: (fileId: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  file,
  position,
  onClose,
  onDownload,
  onDelete,
  onRename
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (position) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [position, onClose]);

  if (!file || !position) return null;

  const menuItems = [
    ...(file.type === 'file' ? [{
      icon: Download,
      label: 'Download',
      action: () => {
        onDownload(file.id);
        onClose();
      }
    }] : []),
    {
      icon: Edit,
      label: 'Rename',
      action: () => {
        onRename(file.id);
        onClose();
      }
    },
    {
      icon: Copy,
      label: 'Copy',
      action: () => {
        // Implement copy functionality
        onClose();
      }
    },
    {
      icon: Move,
      label: 'Move',
      action: () => {
        // Implement move functionality
        onClose();
      }
    },
    {
      icon: Trash2,
      label: 'Delete',
      action: () => {
        onDelete(file.id);
        onClose();
      },
      className: 'text-red-600 hover:bg-red-50'
    }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-48"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${item.className || 'text-gray-700'}`}
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

