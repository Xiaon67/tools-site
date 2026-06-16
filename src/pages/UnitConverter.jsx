import { useState } from 'react'
import RelatedTools from '../components/RelatedTools'

const categories = {
  length: {
    label: 'Length',
    units: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
    base: {
      Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001,
      Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254,
    },
  },
  weight: {
    label: 'Weight',
    units: ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce', 'Ton'],
    base: {
      Kilogram: 1, Gram: 0.001, Milligram: 0.000001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000,
    },
  },
  temperature: {
    label: 'Temperature',
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
  },
  volume: {
    label: 'Volume',
    units: ['Liter', 'Milliliter', 'Gallon', 'Quart', 'Cup', 'Fluid Ounce'],
    base: {
      Liter: 1, Milliliter: 0.001, Gallon: 3.78541, Quart: 0.946353, Cup: 0.236588, 'Fluid Ounce': 0.0295735,
    },
  },
}

function convertTemperature(value, from, to) {
  let celsius
  if (from === 'Celsius') celsius = value
  else if (from === 'Fahrenheit') celsius = (value - 32) * 5 / 9
  else celsius = value - 273.15

  if (to === 'Celsius') return celsius
  if (to === 'Fahrenheit') return celsius * 9 / 5 + 32
  return celsius + 273.15
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('Meter')
  const [toUnit, setToUnit] = useState('Foot')
  const [inputValue, setInputValue] = useState('1')

  const cat = categories[category]
  const value = parseFloat(inputValue) || 0

  let result
  if (category === 'temperature') {
    result = convertTemperature(value, fromUnit, toUnit)
  } else {
    const baseValue = value * cat.base[fromUnit]
    result = baseValue / cat.base[toUnit]
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit Converter</h1>
        <p className="text-gray-500">Convert between different units of measurement</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(categories).map(([key, val]) => (
              <button
                key={key}
                onClick={() => { setCategory(key); setFromUnit(val.units[0]); setToUnit(val.units[1]) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl"
            >
              {cat.units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div className="flex justify-center pb-2">
            <span className="text-2xl text-gray-400">→</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 font-semibold text-lg text-blue-600">
              {typeof result === 'number' ? result.toFixed(6).replace(/\.?0+$/, '') : '0'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl"
            >
              {cat.units.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/unit-converter" />

      <div className="mt-8 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900">About Unit Converter</h2>
        <p className="text-gray-600 text-sm">
          Convert between different units of measurement including length, weight, temperature, and volume. 
          Supports metric and imperial units with instant results.
        </p>
      </div>
    </div>
  )
}
