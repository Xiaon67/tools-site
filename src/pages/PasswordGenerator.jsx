import { useState, useCallback } from 'react'
import RelatedTools from '../components/RelatedTools'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    let chars = ''
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    setPassword(result)
    setCopied(false)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strength = password.length >= 16 ? 'Strong' : password.length >= 12 ? 'Good' : 'Weak'
  const strengthColor = password.length >= 16 ? 'text-green-600' : password.length >= 12 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Generator</h1>
        <p className="text-gray-500">Generate strong, secure passwords instantly</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click generate to create a password"
            className="flex-1 p-4 border border-gray-300 rounded-xl font-mono text-lg bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {password && (
          <div className="mb-6 text-center">
            <span className="text-sm text-gray-500">Strength: </span>
            <span className={`font-semibold ${strengthColor}`}>{strength}</span>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {[
            { label: 'Uppercase (A-Z)', checked: includeUppercase, onChange: setIncludeUppercase },
            { label: 'Lowercase (a-z)', checked: includeLowercase, onChange: setIncludeLowercase },
            { label: 'Numbers (0-9)', checked: includeNumbers, onChange: setIncludeNumbers },
            { label: 'Symbols (!@#$%)', checked: includeSymbols, onChange: setIncludeSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.onChange(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600"
              />
              <span className="text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors text-lg"
        >
          Generate Password
        </button>
      </div>

      <RelatedTools currentPath="/password-generator" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Password Generator</h2>
        <p className="text-gray-600 text-sm">
          Create strong, secure passwords with our free password generator. Customize length (8-64 characters), 
          include uppercase, lowercase, numbers, and symbols. Uses the Web Crypto API for true randomness. 
          Never use weak passwords like "password123" — generate a unique, strong password for every account.
        </p>
      </div>
    </div>
  )
}
