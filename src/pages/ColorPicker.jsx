import { useState } from 'react'
import RelatedTools from '../components/RelatedTools'

function hslToRgb(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

const presetColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F1948A', '#82E0AA', '#F8C471', '#AED6F1', '#D2B4DE',
]

export default function ColorPicker() {
  const [hue, setHue] = useState(210)
  const [saturation, setSaturation] = useState(70)
  const [lightness, setLightness] = useState(50)
  const [hex, setHex] = useState('#3399ff')
  const [copied, setCopied] = useState('')

  const rgb = hslToRgb(hue, saturation, lightness)
  const computedHex = rgbToHex(...rgb)

  const updateFromHSL = (h, s, l) => {
    setHue(h); setSaturation(s); setLightness(l)
    setHex(rgbToHex(...hslToRgb(h, s, l)))
  }

  const updateFromHex = (val) => {
    setHex(val)
    const match = val.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    if (match) {
      const r = parseInt(match[1], 16)
      const g = parseInt(match[2], 16)
      const b = parseInt(match[3], 16)
      const [h, s, l] = rgbToHsl(r, g, b)
      setHue(h); setSaturation(s); setLightness(l)
    }
  }

  const copy = (val, label) => {
    navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Picker</h1>
        <p className="text-gray-500">Pick colors and get HEX, RGB, and HSL values</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* Color Preview */}
        <div
          className="w-full h-40 rounded-xl mb-6 border border-gray-200"
          style={{ backgroundColor: computedHex }}
        />

        {/* HSL Sliders */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hue: {hue}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => updateFromHSL(Number(e.target.value), saturation, lightness)}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), 
                  hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))`
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saturation: {saturation}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => updateFromHSL(hue, Number(e.target.value), lightness)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lightness: {lightness}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => updateFromHSL(hue, saturation, Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Values */}
        <div className="space-y-2 mb-6">
          {[
            { label: 'HEX', value: computedHex.toUpperCase() },
            { label: 'RGB', value: `rgb(${rgb.join(', ')})` },
            { label: 'HSL', value: `hsl(${hue}, ${saturation}%, ${lightness}%)` },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-xs text-gray-400 mr-2">{item.label}</span>
                <span className="font-mono text-sm">{item.value}</span>
              </div>
              <button
                onClick={() => copy(item.value, item.label)}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                {copied === item.label ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>

        {/* Preset Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Preset Colors</label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => updateFromHex(c)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/color-picker" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Color Picker</h2>
        <p className="text-gray-600 text-sm">
          Pick colors and get HEX, RGB, and HSL values. Choose from preset colors or use 
          HSL sliders to find the perfect color. Copy values with one click.
        </p>
      </div>
    </div>
  )
}
