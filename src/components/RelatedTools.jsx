import { Link } from 'react-router-dom'

const allTools = [
  { path: '/word-counter', name: 'Word Counter', icon: '📝' },
  { path: '/password-generator', name: 'Password Generator', icon: '🔐' },
  { path: '/qr-code-generator', name: 'QR Code Generator', icon: '📱' },
  { path: '/unit-converter', name: 'Unit Converter', icon: '⚖️' },
  { path: '/text-case-converter', name: 'Text Case Converter', icon: '🔤' },
  { path: '/base64-encoder', name: 'Base64 Encoder', icon: '🔄' },
  { path: '/json-formatter', name: 'JSON Formatter', icon: '{ }' },
  { path: '/lorem-ipsum', name: 'Lorem Ipsum', icon: '📄' },
  { path: '/color-picker', name: 'Color Picker', icon: '🎨' },
]

export default function RelatedTools({ currentPath }) {
  const related = allTools.filter((t) => t.path !== currentPath).slice(0, 4)

  return (
    <div className="mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h3>
      <div className="grid grid-cols-2 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="text-sm font-medium text-gray-700">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
