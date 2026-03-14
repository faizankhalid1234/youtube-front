import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { API_URL, getMediaUrl } from '@/lib/api'
import Header from '@/components/Header'

const Plyr = dynamic(() => import('plyr-react').then((mod) => mod.Plyr), { ssr: false })

interface Video {
  _id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  views: number
  createdAt: string
}

function getVideoType(url: string): string {
  if (url.includes('.webm')) return 'video/webm'
  if (url.includes('.ogg')) return 'video/ogg'
  return 'video/mp4'
}

export default function Watch() {
  const router = useRouter()
  const { id } = router.query
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchVideo()
    }
  }, [id])

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/videos/${id}`)
      setVideo(response.data)
      setLoading(false)
      
      // Increment view count
      await axios.put(`${API_URL}/api/videos/${id}/views`)
    } catch (error) {
      console.error('Error fetching video:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex justify-center items-center">
        <p className="text-gray-400 text-xl">Video not found</p>
      </div>
    )
  }

  const videoSrc = getMediaUrl(video.videoUrl)
  const posterUrl = video.thumbnail ? getMediaUrl(video.thumbnail) : undefined

  const plyrSource = {
    type: 'video' as const,
    sources: [
      {
        src: videoSrc,
        type: getVideoType(video.videoUrl),
      },
    ],
    poster: posterUrl,
  }

  const plyrOptions = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'pip',
      'airplay',
      'fullscreen',
    ],
    ratio: '16:9',
    hideControls: true,
    clickToPlay: true,
    keyboard: { focused: true, global: true },
    tooltips: { controls: true, seek: true },
    fullscreen: { enabled: true, fallback: true, iosNative: true },
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Header searchQuery="" setSearchQuery={() => {}} onSearch={() => {}} />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              {videoSrc ? (
                <div className="[&_.plyr]:rounded-lg [&_.plyr--video]:rounded-lg video-player-wrapper">
                  <Plyr source={plyrSource} options={plyrOptions} />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-[#1a1a1a] text-gray-400 p-8">
                  <p className="text-xl">Video URL available nahi hai</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              <div className="flex items-center text-gray-400 text-sm">
                <span>{video.views} views</span>
                <span className="mx-2">•</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="bg-[#272727] rounded-lg p-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{video.description || 'No description available.'}</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#272727] rounded-lg p-4">
              <h3 className="font-semibold mb-4">Video Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Views:</span>
                  <span className="ml-2">{video.views}</span>
                </div>
                <div>
                  <span className="text-gray-400">Uploaded:</span>
                  <span className="ml-2">{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
