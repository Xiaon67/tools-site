import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🔧</span>
              <span className="text-xl font-bold text-white">ToolBox</span>
            </div>
            <p className="text-sm">
              Free online tools to make your life easier. No sign-up required.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/word-counter" className="hover:text-white transition-colors">Word Counter</Link></li>
              <li><Link to="/password-generator" className="hover:text-white transition-colors">Password Generator</Link></li>
              <li><Link to="/qr-code-generator" className="hover:text-white transition-colors">QR Code Generator</Link></li>
              <li><Link to="/unit-converter" className="hover:text-white transition-colors">Unit Converter</Link></li>
              <li><Link to="/json-formatter" className="hover:text-white transition-colors">JSON Formatter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">More Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/text-case-converter" className="hover:text-white transition-colors">Text Case Converter</Link></li>
              <li><Link to="/base64-encoder" className="hover:text-white transition-colors">Base64 Encoder</Link></li>
              <li><Link to="/lorem-ipsum" className="hover:text-white transition-colors">Lorem Ipsum Generator</Link></li>
              <li><Link to="/color-picker" className="hover:text-white transition-colors">Color Picker</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ToolBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
