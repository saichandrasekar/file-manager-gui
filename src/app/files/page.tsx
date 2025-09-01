// File: app/files/page.tsx (Main File Manager Page)
import { FileManager } from '../../components/FileManager/FileManager'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Files',
  description: 'Browse and manage your files',
}

export default function FilesPage() {
  return <FileManager />
}