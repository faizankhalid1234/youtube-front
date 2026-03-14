import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@/lib/api'
import Header from '@/components/Header'

export default function Upload() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile || !title) {
      alert('Please fill in all required fields')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('video', videoFile)
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile)
    }

    try {
      const response = await axios.post(`${API_URL}/api/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percentCompleted)
          }
        },
      })

      alert('Video uploaded successfully!')
      router.push('/')
    } catch (error: any) {
      console.error('Error uploading video:', error)
      alert('Error uploading video: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Header searchQuery="" setSearchQuery={() => {}} onSearch={() => {}} />
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-[#272727] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-[#272727] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Video File *</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-4 py-2 bg-[#272727] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 bg-[#272727] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {uploading && (
            <div>
              <div className="w-full bg-[#272727] rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">Uploading... {progress}%</p>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  )
}
