import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/lib/api'
import VideoCard from '@/components/VideoCard'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  views: number
  createdAt: string
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/videos`)
      console.log('Videos fetched:', response.data.length)
      console.log('Sample video:', response.data[0])
      setVideos(response.data)
      setLoading(false)
    } catch (error: any) {
      console.error('Error fetching videos:', error)
      console.error('Error details:', error.response?.data || error.message)
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchVideos()
      return
    }
    try {
      const response = await axios.get(`${API_URL}/api/videos/search?q=${searchQuery}`)
      setVideos(response.data)
    } catch (error) {
      console.error('Error searching videos:', error)
    }
  }

  const handleLoadSamples = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/videos/seed`)
      alert(response.data.message || 'Sample videos added!')
      fetchVideos()
    } catch (error: any) {
      alert('Error: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center mt-20 max-w-md mx-auto">
              <p className="text-gray-400 text-xl mb-4">No videos found</p>
              <p className="text-gray-500 mb-6">Sample videos load karein ya apna video upload karein</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleLoadSamples}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  📹 Sample Videos Load Karo
                </button>
                <a
                  href="/upload"
                  className="border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
                >
                  Upload Video
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
