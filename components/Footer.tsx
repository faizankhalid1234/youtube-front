import { FiUser, FiPhone, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <div className="p-2 rounded-full bg-red-600/20">
              <FiUser className="w-5 h-5 text-red-500" />
            </div>
            <span className="font-semibold text-lg">Faizan Khalid</span>
          </div>
          <a
            href="tel:+92043029655325"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#272727] hover:bg-red-600/20 border border-gray-700 hover:border-red-600/50 text-gray-300 hover:text-white transition-all duration-300 group"
          >
            <FiPhone className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="font-mono font-medium">0430 29655325</span>
          </a>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
          <span>Made with passion · YouTube Clone Project</span>
          <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
        </div>
      </div>
    </footer>
  )
}
