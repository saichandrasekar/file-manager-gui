// File: app/page.tsx (Home Page)
import { FileManager } from '../components/FileManager/FileManager'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to File Manager
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage your files efficiently with our modern file management system
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/files"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Files
          </Link>
          <Link
            href="/files/upload"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Upload Files
          </Link>
        </div>
      </div>

      {/* Quick Access File Manager */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Access</h2>
        </div>
        <FileManager />
      </div>
    </div>
  )
}