import { useState } from 'react'
import RelatedTools from '../components/RelatedTools'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
]

function generateParagraph(wordCount) {
  const words = []
  for (let i = 0; i < wordCount; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  const sentences = []
  let sentence = []
  words.forEach((word, i) => {
    sentence.push(word)
    if ((i + 1) % (8 + Math.floor(Math.random() * 5)) === 0 || i === words.length - 1) {
      sentences.push(sentence.join(' ') + '.')
      sentence = []
    }
  })
  return sentences.join(' ')
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3)
  const [wordsPer, setWordsPer] = useState(50)
  const [output, setOutput] = useState('')

  const generate = () => {
    const result = []
    for (let i = 0; i < paragraphs; i++) {
      result.push(generateParagraph(wordsPer))
    }
    setOutput(result.join('\n\n'))
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-500">Generate placeholder text for your designs and mockups</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paragraphs: {paragraphs}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Words per paragraph: {wordsPer}
            </label>
            <input
              type="range"
              min="10"
              max="150"
              value={wordsPer}
              onChange={(e) => setWordsPer(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors mb-6"
        >
          Generate
        </button>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {output.split(/\s+/).length} words, {paragraphs} paragraphs
              </span>
              <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-700">Copy All</button>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">
              {output}
            </div>
          </div>
        )}
      </div>

      <RelatedTools currentPath="/lorem-ipsum" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Lorem Ipsum Generator</h2>
        <p className="text-gray-600 text-sm">
          Generate placeholder text (lorem ipsum) for your designs, mockups, and layouts. 
          Customize the number of paragraphs and words per paragraph.
        </p>
      </div>
    </div>
  )
}
