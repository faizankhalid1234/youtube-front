export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://youtube-back-iota.vercel.app'

export function getMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`
}
