import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SEO from './components/SEO'
import Home from './pages/Home'
import WordCounter from './pages/WordCounter'
import PasswordGenerator from './pages/PasswordGenerator'
import QRCodeGenerator from './pages/QRCodeGenerator'
import UnitConverter from './pages/UnitConverter'
import TextCaseConverter from './pages/TextCaseConverter'
import Base64Encoder from './pages/Base64Encoder'
import JsonFormatter from './pages/JsonFormatter'
import LoremIpsum from './pages/LoremIpsum'
import ColorPicker from './pages/ColorPicker'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <SEO />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/text-case-converter" element={<TextCaseConverter />} />
          <Route path="/base64-encoder" element={<Base64Encoder />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}
