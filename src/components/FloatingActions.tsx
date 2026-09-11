import { useEffect, useState } from 'react'

const SHOW_AFTER_PX = 420

export function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div
      className={`floating-actions${visible ? ' floating-actions--visible' : ''}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="floating-actions__top"
        onClick={scrollToTop}
        tabIndex={visible ? 0 : -1}
        aria-label="Go back to top"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
