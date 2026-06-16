import Navbar from './Navbar'
import Footer from './Footer'
import AdSense from './AdSense'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>

      {/* Bottom Ad Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center">
          <AdSense slot="1111111111" format="horizontal" />
        </div>
      </div>

      <div className="pb-[110px]">
        {/* Sidebar Ad (shows on tool pages) */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSense slot="2222222222" format="auto" />
        </div>
        <Footer />
      </div>
    </div>
  )
}
