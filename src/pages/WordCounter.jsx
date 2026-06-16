import { useState, useCallback } from 'react'
import RelatedTools from '../components/RelatedTools'

export default function WordCounter() {
  const [text, setText] = useState('')

  const getStats = useCallback((t) => {
    const words = t.trim() ? t.trim().split(/\s+/).length : 0
    const chars = t.length
    const charsNoSpaces = t.replace(/\s/g, '').length
    const sentences = t.trim() ? t.split(/[.!?]+/).filter(Boolean).length : 0
    const paragraphs = t.trim() ? t.split(/\n\s*\n/).filter(Boolean).length : 0
    const readingTime = Math.ceil(words / 200)
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime }
  }, [])

  const stats = getStats(text)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Word Counter</h1>
        <p className="text-gray-500">Count words, characters, sentences, and paragraphs instantly</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'No Spaces', value: stats.charsNoSpaces },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
          { label: 'Read Time', value: `${stats.readingTime} min` },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <RelatedTools currentPath="/word-counter" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Word Counter</h2>
        <p className="text-gray-600 text-sm">
          Our free word counter tool helps you quickly count words, characters, sentences, and paragraphs in any text. 
          It also estimates reading time based on an average reading speed of 200 words per minute. 
          Simply paste or type your text and see the statistics update in real-time. Perfect for essays, 
          articles, social media posts, and any writing where word count matters.
        </p>
      </div>
    </div>
  )
}
