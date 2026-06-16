import { useState } from 'react'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch {
      setError('Invalid input for this operation')
      setOutput('')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder / Decoder</h1>
        <p className="text-gray-500">Encode and decode Base64 strings</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('encode')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
          />
        </div>

        <button
          onClick={process}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors mb-4"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">Result</label>
              <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-700">Copy</button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-32 p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}
