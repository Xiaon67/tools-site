import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const siteUrl = 'https://xiaon67.github.io/tools-site'

const pageMeta = {
  '/': {
    title: 'ToolBox - Free Online Tools | Word Counter, Password Generator & More',
    description: 'Free online tools for everyone. Word counter, password generator, QR code generator, unit converter, JSON formatter and more. No sign-up required.',
    keywords: 'free tools, online tools, word counter, password generator, QR code generator, unit converter',
  },
  '/word-counter': {
    title: 'Free Word Counter Online - Count Words, Characters & Sentences | ToolBox',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading time instantly. Free online word counter tool.',
    keywords: 'word counter, character counter, sentence counter, reading time calculator, word count tool',
  },
  '/password-generator': {
    title: 'Free Password Generator - Create Strong Secure Passwords | ToolBox',
    description: 'Generate strong, random passwords with customizable length and character options. Free online password generator.',
    keywords: 'password generator, strong password, secure password, random password generator',
  },
  '/qr-code-generator': {
    title: 'Free QR Code Generator - Create QR Codes Online | ToolBox',
    description: 'Generate QR codes for URLs, text, WiFi passwords and more. Download as PNG. Free online QR code generator.',
    keywords: 'QR code generator, create QR code, QR code maker, free QR code',
  },
  '/unit-converter': {
    title: 'Free Unit Converter - Convert Units Online | ToolBox',
    description: 'Convert between length, weight, temperature, and volume units. Free online unit converter with instant results.',
    keywords: 'unit converter, measurement converter, length converter, weight converter, temperature converter',
  },
  '/text-case-converter': {
    title: 'Free Text Case Converter - UPPERCASE, lowercase, camelCase | ToolBox',
    description: 'Convert text between uppercase, lowercase, title case, camelCase, snake_case and more. Free online tool.',
    keywords: 'text case converter, uppercase converter, lowercase converter, camelCase converter',
  },
  '/base64-encoder': {
    title: 'Free Base64 Encoder & Decoder - Encode Decode Online | ToolBox',
    description: 'Encode and decode Base64 strings instantly. Supports UTF-8. Free online Base64 encoder decoder tool.',
    keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, base64 converter',
  },
  '/json-formatter': {
    title: 'Free JSON Formatter & Validator - Beautify JSON Online | ToolBox',
    description: 'Format, validate, beautify, and minify JSON data instantly. Free online JSON formatter tool.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON minifier, format JSON',
  },
  '/lorem-ipsum': {
    title: 'Free Lorem Ipsum Generator - Placeholder Text | ToolBox',
    description: 'Generate lorem ipsum placeholder text for your designs and mockups. Customizable paragraphs and word count.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text, lorem ipsum maker',
  },
  '/color-picker': {
    title: 'Free Color Picker - HEX, RGB, HSL Color Values | ToolBox',
    description: 'Pick colors and get HEX, RGB, and HSL values. Free online color picker with presets.',
    keywords: 'color picker, HEX color picker, RGB color tool, HSL color picker, color selector',
  },
}

export default function SEO({ path }) {
  const location = useLocation()
  const currentPath = path || location.pathname
  const meta = pageMeta[currentPath] || pageMeta['/']

  useEffect(() => {
    document.title = meta.title

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', meta.description)
    setMeta('keywords', meta.keywords)
    setMeta('og:title', meta.title, true)
    setMeta('og:description', meta.description, true)
    setMeta('og:url', `${siteUrl}${currentPath}`, true)
    setMeta('og:type', 'website', true)
    setMeta('twitter:title', meta.title)
    setMeta('twitter:description', meta.description)
  }, [currentPath, meta])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'ToolBox',
          url: `${siteUrl}${currentPath}`,
          description: meta.description,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }),
      }}
    />
  )
}
