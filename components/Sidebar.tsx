import { useRouter } from 'next/router'
import { FiHome, FiTrendingUp, FiMusic, FiFilm } from 'react-icons/fi'

export default function Sidebar() {
  const router = useRouter()

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiTrendingUp, label: 'Trending', path: '/' },
    { icon: FiMusic, label: 'Music', path: '/' },
    { icon: FiFilm, label: 'Movies', path: '/' },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-[#0F0F0F] border-r border-[#272727] overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <button
                  onClick={() => router.push(item.path)}
                  className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-[#272727] transition-colors text-left"
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
