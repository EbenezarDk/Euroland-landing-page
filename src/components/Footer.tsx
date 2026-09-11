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
            width={214}
            height={20}
          />
          <nav className="footer__nav" aria-label="Footer">
            <Link to="/share-graph">Share Graph</Link>
            <Link to="/interactive-analysis-tool">Interactive Analysis Tool</Link>
            <Link to="/artificial-intelligence">Artificial Intelligence</Link>
          </nav>
        </div>

        <div className="footer__meta">
          <div className="footer__support">
            <p className="footer__support-text">
              Supported by the European Cybersecurity
              <br />
              Competence Center with its member states
            </p>
            <div className="footer__badges">
              <img
                className="footer__badge-eu"
                src="/assets/eu-funded.png"
                alt="EU co-funded"
                width={38}
                height={40}
              />
              <img
                className="footer__badge-eccc"
                src="/assets/eccc-logo.svg"
                alt="European Cybersecurity Competence Center"
                width={104}
                height={40}
              />
            </div>
          </div>

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
