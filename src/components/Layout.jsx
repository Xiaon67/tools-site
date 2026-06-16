import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>

      {/* AdSense placeholder - replace with your AdSense code */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 text-center py-2 text-xs text-gray-400 z-40">
        {/* AdSense Ad Unit - Replace this with your AdSense code */}
        <div id="ad-banner-bottom" className="h-[90px] flex items-center justify-center">
          Ad Space (728x90)
        </div>
      </div>

      <div className="pb-[100px]">
        <Footer />
      </div>
    </div>
  )
}
