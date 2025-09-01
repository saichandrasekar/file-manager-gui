// File: app/files/layout.tsx (Files-specific Layout)
import { Suspense } from 'react'
import { FileManagerSidebar } from '../../components/FileManager/Sidebar'

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
        <Suspense fallback={<div className="p-4">Loading sidebar...</div>}>
          <FileManagerSidebar />
        </Suspense>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}