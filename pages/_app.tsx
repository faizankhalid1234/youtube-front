import '@/styles/globals.css'
import 'plyr-react/plyr.css'
import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
