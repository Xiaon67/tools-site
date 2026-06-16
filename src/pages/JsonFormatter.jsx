import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter</h1>
        <p className="text-gray-500">Format, validate, and beautify JSON data</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full h-[400px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Output</label>
              {output && (
                <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-700">Copy</button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-[400px] p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>}

        <div className="flex gap-3 mt-6">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
              <option value={1}>Tab</option>
            </select>
          </div>
          <button
            onClick={format}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Format
          </button>
          <button
            onClick={minify}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
          >
            Minify
          </button>
        </div>
      </div>
    </div>
  )
}
