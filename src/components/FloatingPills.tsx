import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../data/nav'

type FloatingPillsProps = {
  pillsRef: RefObject<HTMLDivElement | null>
  isLight?: boolean
  isHidden?: boolean
  isPastHero?: boolean
  activePath?: string
}

export function FloatingPills({
  pillsRef,
  isLight = false,
  isHidden = false,
  isPastHero = false,
  activePath = '/',
}: FloatingPillsProps) {
  return (
    <div
      className={[
        'hero__pills-dock',
        isLight ? 'hero__pills-dock--light' : '',
        isHidden ? 'hero__pills-dock--hidden' : '',
        isPastHero && !isHidden ? 'hero__pills-dock--dimmed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      ref={pillsRef}
      aria-hidden={isHidden || undefined}
    >
      <nav className="hero__pills" aria-label="Product areas">
        {NAV_ITEMS.map((pill) => {
          const active = activePath === pill.match
          const hash = 'hash' in pill ? pill.hash : undefined

          return (
            <Link
              key={pill.label}
              className={`hero__pill${active ? ' hero__pill--active' : ''}`}
              to={hash ? { pathname: pill.to, hash } : pill.to}
              tabIndex={isHidden ? -1 : 0}
              onClick={() => {
                // Same-route /#hero click is a no-op for the router — force top scroll.
                if (hash === 'hero' && window.location.pathname === pill.to) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  window.dispatchEvent(new Event('scroll'))
                }
              }}
            >
              {pill.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
