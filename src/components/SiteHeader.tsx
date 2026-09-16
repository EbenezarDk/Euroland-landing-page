import { useEffect, useId, useState, type RefObject } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../data/nav'

type SiteHeaderProps = {
  headerRef: RefObject<HTMLElement | null>
  isLight?: boolean
  homeHref?: string
  contactHref?: string
  activePath?: string
}

export function SiteHeader({
  headerRef,
  isLight = false,
  homeHref = '/',
  contactHref = '#enquiry',
  activePath,
}: SiteHeaderProps) {
  const location = useLocation()
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHashHome = homeHref.startsWith('#')
  const isHashContact = contactHref.startsWith('#')
  const currentPath = activePath ?? location.pathname

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`hero__header${isLight ? ' hero__header--light' : ''}${menuOpen ? ' hero__header--menu-open' : ''}`}
      ref={headerRef}
      data-animate="hero-header"
      data-node-id="120:6"
    >
      <div className="hero__brand" data-node-id="120:7">
        {isHashHome ? (
          <a href={homeHref} aria-label="Euroland IR home" onClick={closeMenu}>
            <img
              className="hero__logo hero__logo--white"
              src="/assets/logo-white.svg"
              alt="Euroland IR"
              width={385}
              height={36}
              data-node-id="120:8"
            />
            <img
              className="hero__logo hero__logo--blue"
              src="/assets/logo-blue.svg"
              alt=""
              aria-hidden
              width={385}
              height={36}
            />
          </a>
        ) : (
          <Link to={homeHref} aria-label="Euroland IR home" onClick={closeMenu}>
            <img
              className="hero__logo hero__logo--white"
              src="/assets/logo-white.svg"
              alt="Euroland IR"
              width={385}
              height={36}
              data-node-id="120:8"
            />
            <img
              className="hero__logo hero__logo--blue"
              src="/assets/logo-blue.svg"
              alt=""
              aria-hidden
              width={385}
              height={36}
            />
          </Link>
        )}
      </div>

      <div className="hero__header-actions">
        {isHashContact ? (
          <a
            className="hero__contact"
            href={contactHref}
            data-node-id="88:2069"
            onClick={closeMenu}
          >
            <span className="hero__contact-glow" aria-hidden data-node-id="88:2067">
              <img src="/assets/contact-glow.svg" alt="" width={36} height={36} />
            </span>
            <span className="hero__contact-label" data-node-id="88:2060">
              Get a call back
            </span>
          </a>
        ) : (
          <Link
            className="hero__contact"
            to={contactHref}
            data-node-id="88:2069"
            onClick={closeMenu}
          >
            <span className="hero__contact-glow" aria-hidden data-node-id="88:2067">
              <img src="/assets/contact-glow.svg" alt="" width={36} height={36} />
            </span>
            <span className="hero__contact-label" data-node-id="88:2060">
              Get a call back
            </span>
          </Link>
        )}

        <button
          type="button"
          className={`hero__menu-toggle${menuOpen ? ' hero__menu-toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hero__menu-toggle-bar" aria-hidden />
          <span className="hero__menu-toggle-bar" aria-hidden />
          <span className="hero__menu-toggle-bar" aria-hidden />
        </button>
      </div>

      <div
        className={`hero__mobile-menu${menuOpen ? ' hero__mobile-menu--open' : ''}`}
        id={menuId}
        hidden={!menuOpen}
      >
        <nav className="hero__mobile-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.match
            const hash = 'hash' in item ? item.hash : undefined

            return (
              <Link
                key={item.label}
                className={`hero__mobile-link${active ? ' hero__mobile-link--active' : ''}`}
                to={hash ? { pathname: item.to, hash } : item.to}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hero__mobile-cta">
          {isHashContact ? (
            <a
              className="hero__mobile-contact"
              href={contactHref}
              onClick={closeMenu}
            >
              Get a call back
              <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
            </a>
          ) : (
            <Link
              className="hero__mobile-contact"
              to={contactHref}
              onClick={closeMenu}
            >
              Get a call back
              <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
            </Link>
          )}
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="hero__mobile-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  )
}
