// File: app/files/[...path]/page.tsx (Dynamic Folder Routes)
import { FileManager } from '../../../components/FileManager/FileManager'
import { Metadata } from 'next'

interface PageProps {
  params: {
    path: string[]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const folderPath = params.path.join('/')
  return {
    title: `Files - ${folderPath}`,
    description: `Browse files in ${folderPath}`,
  }
}

export default function FolderPage({ params }: PageProps) {
  const folderPath = '/' + params.path.join('/')
  
  return (
    <FileManager initialPath={folderPath} />
  )
}