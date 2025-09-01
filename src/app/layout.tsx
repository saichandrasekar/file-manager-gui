// File: app/layout.tsx (Root Layout)
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | File Manager',
    default: 'File Manager - Modern File Management System',
  },
  description: 'A modern, responsive file management application built with Next.js',
  keywords: ['file manager', 'upload', 'storage', 'files'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        
      </head>
      <body className={inter.className}>
        {/* Global header */}
        <header className="bg-white shadow-sm border-b-2 border-orange-500">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📁</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">File Manager</h1>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        {/* Global footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="px-6 text-center text-sm text-gray-500">
            © 2025 File Manager. Built with Next.js & TypeScript.
          </div>
        </footer>
      </body>
    </html>
  )
}