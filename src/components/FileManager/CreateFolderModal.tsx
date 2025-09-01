// File: components/FileManager/CreateFolderModal.tsx
import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (name: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onCreateFolder
}) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    if (folderName.includes('/') || folderName.includes('\\')) {
      setError('Folder name cannot contain / or \\');
      return;
    }

    onCreateFolder(folderName.trim());
    setFolderName('');
    onClose();
  };

  const handleClose = () => {
    setFolderName('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Folder">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
          error={error}
          autoFocus
        />

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Folder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

