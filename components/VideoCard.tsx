import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiPlay } from 'react-icons/fi'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  views: number
  createdAt: string
}

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    router.push(`/watch/${video._id}`)
  }

  const getThumbnailUrl = (): string | null => {
    if (!video.thumbnail) return null
    if (video.thumbnail.startsWith('http://') || video.thumbnail.startsWith('https://')) {
      return video.thumbnail
    }
    return `https://youtube-back-iota.vercel.app${video.thumbnail.startsWith('/') ? '' : '/'}${video.thumbnail}`
  }

  const thumbnailUrl = getThumbnailUrl()

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[#272727] rounded-lg overflow-hidden hover:bg-[#3F3F3F] transition-colors"
    >
      <div className="relative aspect-video bg-black">
        {thumbnailUrl && !imageError ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <FiPlay size={48} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-xs">{video.title.substring(0, 30)}...</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
          <div className="bg-black bg-opacity-60 rounded-full p-4 transform hover:scale-110 transition-transform">
            <FiPlay size={32} className="text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          ▶
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-2">{video.description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>{video.views.toLocaleString()} views</span>
          <span className="mx-2">•</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
