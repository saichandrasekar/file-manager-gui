// File: app/not-found.tsx (404 Page)
import Link from 'next/link'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-300 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button variant="primary">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}