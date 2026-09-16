import type { RefObject } from 'react'
import { Link } from 'react-router-dom'

type FooterProps = {
  sectionRef: RefObject<HTMLElement | null>
}

const SOCIAL = [
  {
    src: '/assets/social-x.svg',
    label: 'X',
    href: 'https://twitter.com/eurolandir',
  },
  {
    src: '/assets/social-fb.svg',
    label: 'Facebook',
    href: 'https://www.facebook.com/eurolandir',
  },
  {
    src: '/assets/social-li.svg',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eurolandir',
  },
] as const

export function Footer({ sectionRef }: FooterProps) {
  return (
    <footer className="footer" ref={sectionRef}>
      <div className="footer__top">
        <div className="footer__row">
          <img
            className="footer__logo"
            src="/assets/logo-footer.svg"
            alt="Euroland IR"
            width={407}
            height={38}
          />
          <nav className="footer__nav" aria-label="Footer">
            <Link to="/share-graph">AI assistant</Link>
            <Link to="/interactive-analysis-tool">IR solutions</Link>
            <Link to="/artificial-intelligence">ESG solutions</Link>
          </nav>
        </div>

        <div className="footer__meta">
          <div className="footer__social">
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.src} alt="" width={36} height={36} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <hr className="footer__rule" />
        <p className="footer__copy">2026 Euroland. All rights reserved</p>
      </div>
    </footer>
  )
}
