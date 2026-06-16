import { useEffect, useRef } from 'react'

export default function AdSense({ slot, format = 'auto', responsive = true }) {
  const ref = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({})
      pushed.current = true
    }
  }, [])

  return (
    <div ref={ref} className="my-6 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
