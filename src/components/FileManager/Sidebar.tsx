// File: components/FileManager/Sidebar.tsx (New component for layout)
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Folder, Upload, Search, Trash } from 'lucide-react'

export const FileManagerSidebar: React.FC = () => {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Files', href: '/files', icon: Folder },
    { name: 'Upload', href: '/files/upload', icon: Upload },
    { name: 'Search', href: '/files?tab=search', icon: Search },
    { name: 'Trash', href: '/files/trash', icon: Trash },
  ]

  return (
    <nav className="p-4 space-y-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}