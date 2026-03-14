// Test page to debug video loading
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL, getMediaUrl } from '@/lib/api'

export default function TestVideos() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/videos`)
      console.log('API Response:', response.data)
      setVideos(response.data)
      setLoading(false)
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className="p-8 bg-[#0F0F0F] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Video Test Page</h1>
      <p className="mb-4">Total Videos: {videos.length}</p>
      
      {videos.map((video, index) => (
        <div key={video._id} className="mb-8 p-4 bg-[#272727] rounded">
          <h2 className="text-xl font-bold mb-2">{index + 1}. {video.title}</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Video URL:</strong> {video.videoUrl}</p>
            <p><strong>Thumbnail URL:</strong> {video.thumbnail || 'No thumbnail'}</p>
            <p><strong>Views:</strong> {video.views}</p>
            
            {video.thumbnail && (
              <div className="mt-4">
                <p className="mb-2">Thumbnail Preview:</p>
                <img 
                  src={getMediaUrl(video.thumbnail)}
                  alt={video.title}
                  className="max-w-xs"
                  onError={(e) => {
                    console.error('Image load error for:', video.thumbnail)
                    e.currentTarget.style.border = '2px solid red'
                  }}
                  onLoad={() => {
                    console.log('Image loaded:', video.thumbnail)
                  }}
                />
              </div>
            )}
            
            <div className="mt-4">
              <p className="mb-2">Video Player:</p>
              <video
                controls
                className="max-w-md"
                src={getMediaUrl(video.videoUrl)}
                onError={(e) => {
                  console.error('Video load error for:', video.videoUrl)
                  e.currentTarget.style.border = '2px solid red'
                }}
                onLoadStart={() => {
                  console.log('Video loading:', video.videoUrl)
                }}
                onCanPlay={() => {
                  console.log('Video can play:', video.videoUrl)
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
