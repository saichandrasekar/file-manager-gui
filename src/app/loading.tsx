// File: app/loading.tsx (Global Loading UI)
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="text-gray-600">Loading...</span>
      </div>
    </div>
  )
}