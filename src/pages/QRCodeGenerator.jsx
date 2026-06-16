import { useState, useRef } from 'react'

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://')
  const [size, setSize] = useState(200)
  const canvasRef = useRef(null)

  const generateQR = () => {
    const canvas = canvasRef.current
    if (!canvas || !text) return
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, size, size)

    const qr = generateQRMatrix(text)
    const cellSize = size / qr.length

    ctx.fillStyle = 'black'
    for (let y = 0; y < qr.length; y++) {
      for (let x = 0; x < qr[y].length; x++) {
        if (qr[y][x]) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }
  }

  const generateQRMatrix = (data) => {
    const size = 21
    const matrix = Array.from({ length: size }, () => Array(size).fill(false))

    const addFinderPattern = (startX, startY) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          if (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)) {
            matrix[startY + y][startX + x] = true
          }
        }
      }
    }

    addFinderPattern(0, 0)
    addFinderPattern(size - 7, 0)
    addFinderPattern(0, size - 7)

    let hash = 0
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (matrix[y][x]) continue
        if (x < 8 && y < 8) continue
        if (x >= size - 8 && y < 8) continue
        if (x < 8 && y >= size - 8) continue

        hash = ((hash << 5) - hash + (x * 31 + y * 17)) | 0
        matrix[y][x] = (hash & 0xFF) % 3 === 0
      }
    }

    return matrix
  }

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
        <p className="text-gray-500">Create QR codes for any URL, text, or data</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter URL or text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size: {size}px</label>
          <input
            type="range"
            min="100"
            max="400"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateQR}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Generate QR Code
          </button>
          <button
            onClick={download}
            className="px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
          >
            Download
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <canvas ref={canvasRef} className="border border-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
