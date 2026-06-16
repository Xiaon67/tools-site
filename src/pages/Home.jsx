import { Link } from 'react-router-dom'

const tools = [
  { path: '/word-counter', name: 'Word Counter', icon: '📝', desc: 'Count words, characters, and sentences instantly' },
  { path: '/password-generator', name: 'Password Generator', icon: '🔐', desc: 'Generate strong, secure passwords' },
  { path: '/qr-code-generator', name: 'QR Code Generator', icon: '📱', desc: 'Create QR codes for any URL or text' },
  { path: '/unit-converter', name: 'Unit Converter', icon: '⚖️', desc: 'Convert between length, weight, temperature & more' },
  { path: '/text-case-converter', name: 'Text Case Converter', icon: '🔤', desc: 'Convert text to uppercase, lowercase, title case' },
  { path: '/base64-encoder', name: 'Base64 Encoder/Decoder', icon: '🔄', desc: 'Encode and decode Base64 strings' },
  { path: '/json-formatter', name: 'JSON Formatter', icon: '{ }', desc: 'Format, validate & beautify JSON data' },
  { path: '/lorem-ipsum', name: 'Lorem Ipsum Generator', icon: '📄', desc: 'Generate placeholder text for your projects' },
  { path: '/color-picker', name: 'Color Picker', icon: '🎨', desc: 'Pick colors, get HEX/RGB/HSL values' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Online Tools
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Everything you need, right in your browser. No sign-up, no downloads, 100% free.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* AdSense placeholder */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-lg h-[250px] flex items-center justify-center text-gray-400 text-sm">
          Ad Space (728x250)
        </div>
      </div>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Free Tools?</h2>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
          <p>
            ToolBox offers a collection of free online utilities designed to save you time. 
            Whether you need to count words in an essay, generate a secure password, or 
            format JSON data — we've got you covered.
          </p>
          <p>
            All tools run directly in your browser. Your data never leaves your device, 
            ensuring complete privacy. No account required, no usage limits.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 pt-4">Built for Everyone</h3>
          <p>
            Students, developers, writers, and professionals use our tools daily. 
            Each tool is designed to be simple yet powerful — get results in seconds 
            without any learning curve.
          </p>
        </div>
      </section>
    </div>
  )
}
