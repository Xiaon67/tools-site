import { useState } from 'react'
import RelatedTools from '../components/RelatedTools'

const cases = [
  { name: 'lowercase', fn: (t) => t.toLowerCase() },
  { name: 'UPPERCASE', fn: (t) => t.toUpperCase() },
  { name: 'Title Case', fn: (t) => t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { name: 'sentence case', fn: (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() },
  { name: 'camelCase', fn: (t) => t.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toLowerCase()) },
  { name: 'PascalCase', fn: (t) => t.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toUpperCase()) },
  { name: 'snake_case', fn: (t) => t.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '') },
  { name: 'kebab-case', fn: (t) => t.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') },
  { name: 'CONSTANT_CASE', fn: (t) => t.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '') },
]

export default function TextCaseConverter() {
  const [text, setText] = useState('hello world example text')
  const [copied, setCopied] = useState(false)

  const copy = (val) => {
    navigator.clipboard.writeText(val)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Case Converter</h1>
        <p className="text-gray-500">Convert text between different cases instantly</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 mb-6"
        />

        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xs font-mono text-gray-400 w-32 shrink-0">{c.name}</span>
              <code className="flex-1 text-sm text-gray-700 break-all">{c.fn(text)}</code>
              <button
                onClick={() => copy(c.fn(text))}
                className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
              >
                {copied ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <RelatedTools currentPath="/text-case-converter" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Text Case Converter</h2>
        <p className="text-gray-600 text-sm">
          Convert text between different cases: lowercase, UPPERCASE, Title Case, sentence case, 
          camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.
        </p>
      </div>
    </div>
  )
}
