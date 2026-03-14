import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiSearch, FiMenu, FiUpload } from 'react-icons/fi'

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch: () => void
}

export default function Header({ searchQuery, setSearchQuery, onSearch }: HeaderProps) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-[#272727]">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <span className="text-2xl font-bold text-red-600">YouTube</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 px-4 py-2 bg-[#272727] text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#272727] text-white rounded-r-full hover:bg-[#3F3F3F] transition-colors"
            >
              <FiSearch size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/upload')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <FiUpload size={20} />
            <span>Upload</span>
          </button>
        </div>
      </div>
    </header>
  )
}
