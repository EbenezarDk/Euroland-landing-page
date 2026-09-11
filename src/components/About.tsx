import { useEffect, type RefObject } from 'react'
import { Link } from 'react-router-dom'

const CLIENT_LOGOS = [
  { src: '/assets/clients/carlsberg.png', alt: 'Carlsberg', height: 32 },
  { src: '/assets/clients/emaar.png', alt: 'Emaar', height: 28 },
  { src: '/assets/clients/atlas-copco.png', alt: 'Atlas Copco', height: 34 },
  { src: '/assets/clients/hkex.png', alt: 'HKEX', height: 34 },
  { src: '/assets/clients/prosiebensat1.png', alt: 'ProSiebenSat.1', height: 28 },
  { src: '/assets/clients/swisscom.png', alt: 'Swisscom', height: 34 },
  { src: '/assets/clients/standard-chartered.png', alt: 'Standard Chartered', height: 34 },
  { src: '/assets/clients/ing.png', alt: 'ING', height: 30 },
  { src: '/assets/clients/moncler.png', alt: 'Moncler Group', height: 32 },
  { src: '/assets/clients/assa-abloy.png', alt: 'ASSA ABLOY', height: 28 },
  { src: '/assets/clients/sanoma.png', alt: 'Sanoma', height: 26 },
  { src: '/assets/clients/magnum.png', alt: 'The Magnum Ice Cream Company', height: 34 },
  { src: '/assets/clients/santander.png', alt: 'Santander', height: 32 },
  { src: '/assets/clients/rio-tinto.png', alt: 'Rio Tinto', height: 30 },
  { src: '/assets/clients/etisalat.png', alt: 'e&', height: 36 },
  { src: '/assets/clients/experian.png', alt: 'Experian', height: 32 },
  { src: '/assets/clients/repsol.png', alt: 'Repsol', height: 32 },
  { src: '/assets/clients/eni.png', alt: 'Eni', height: 34 },
  { src: '/assets/clients/sony.png', alt: 'Sony', height: 26 },
  { src: '/assets/clients/asml.png', alt: 'ASML', height: 28 },
] as const

const PRODUCT_ENTRIES = [
  {
    path: '/share-graph',
    tag: 'Share Graph',
    tagTone: 'navy' as const,
    title: 'Share Graph',
    description:
      'Present share performance with interactive charts, peer benchmarks, and corporate events that tell your equity story.',
    image: '/assets/products/share-graph-card.jpg',
    imageAlt: 'Financial charts on a laptop screen',
  },
  {
    path: '/interactive-analysis-tool',
    tag: 'Interactive Analysis Tool',
    tagTone: 'navy' as const,
    title: 'Interactive Analysis Tool',
    description:
      'Let investors explore fundamentals, ratios, and historical data with self-serve filters built for clear insight.',
    image: '/assets/products/iat-card.jpg',
    imageAlt: 'Analytics dashboard with charts and graphs',
  },
  {
    path: '/artificial-intelligence',
    tag: 'Artificial Intelligence',
    tagTone: 'muted' as const,
    title: 'Artificial Intelligence',
    description:
      'Surface the signals that matter — summarising filings, highlighting market moves, and speeding IR responses.',
    image: '/assets/products/ai-card.jpg',
    imageAlt: 'Abstract artificial intelligence visualization',
  },
] as const

type AboutProps = {
  sectionRef: RefObject<HTMLElement | null>
  cardsRef: RefObject<HTMLDivElement | null>
  logosRef: RefObject<HTMLDivElement | null>
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function About({ sectionRef, cardsRef, logosRef }: AboutProps) {
  // Auto-marquee with pointer-drag + wheel scrubbing for the logo runner.
  useEffect(() => {
    const root = logosRef.current
    const track = root?.querySelector<HTMLElement>('[data-logos-track]')
    if (!root || !track) return

    const reduced = prefersReducedMotion()
    let offset = 0
    let halfWidth = 0
    let raf = 0
    let lastTs = 0
    let dragging = false
    let pointerId: number | null = null
    let dragStartX = 0
    let dragStartOffset = 0
    let resumeTimer = 0
    let paused = false
    // -1 = right → left (default), +1 = left → right
    let direction = -1

    const measure = () => {
      halfWidth = track.scrollWidth / 2
    }

    const wrapOffset = () => {
      if (halfWidth <= 0) return
      // Keep offset in (-halfWidth, 0] for a seamless loop in either direction.
      while (offset <= -halfWidth) offset += halfWidth
      while (offset > 0) offset -= halfWidth
    }

    const render = () => {
      wrapOffset()
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts
      const delta = ts - lastTs
      lastTs = ts

      if (!reduced && !dragging && !paused) {
        // Auto continues in the last swipe direction (default RTL).
        const speed = halfWidth > 0 ? halfWidth / 45000 : 0.04
        offset += direction * speed * delta
        render()
      }

      raf = requestAnimationFrame(tick)
    }

    const pauseAuto = () => {
      paused = true
      window.clearTimeout(resumeTimer)
    }

    const scheduleResume = () => {
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => {
        if (!dragging) paused = false
      }, 1200)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragging = true
      paused = true
      pointerId = event.pointerId
      dragStartX = event.clientX
      dragStartOffset = offset
      root.classList.add('about__logos--dragging')
      root.setPointerCapture(event.pointerId)
      window.clearTimeout(resumeTimer)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return
      const dx = event.clientX - dragStartX
      // Strip follows the swipe: L→R drag moves L→R, R→L drag moves R→L.
      offset = dragStartOffset + dx
      render()
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return
      const dx = event.clientX - dragStartX
      // Remember swipe direction so auto-scroll continues that way.
      if (Math.abs(dx) > 4) {
        direction = dx > 0 ? 1 : -1
      }
      dragging = false
      pointerId = null
      root.classList.remove('about__logos--dragging')
      try {
        root.releasePointerCapture(event.pointerId)
      } catch {
        /* already released */
      }
      scheduleResume()
    }

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (!delta) return
      event.preventDefault()
      pauseAuto()
      offset += delta
      if (Math.abs(delta) > 0.5) {
        direction = delta > 0 ? 1 : -1
      }
      render()
      scheduleResume()
    }

    measure()
    render()
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      const ratio = halfWidth > 0 ? offset / halfWidth : 0
      measure()
      offset = ratio * halfWidth
      render()
    })
    ro.observe(track)

    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove)
    root.addEventListener('pointerup', endDrag)
    root.addEventListener('pointercancel', endDrag)
    root.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer)
      ro.disconnect()
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', endDrag)
      root.removeEventListener('pointercancel', endDrag)
      root.removeEventListener('wheel', onWheel)
      root.classList.remove('about__logos--dragging')
      track.style.transform = ''
    }
  }, [logosRef])

  return (
    <section className="about" id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="about__inner">
        <div className="about__story">
          <div className="about__copy" data-animate="about-copy">
            <div>
              <p className="about__eyebrow">About Euroland IR</p>
              <h2 className="about__heading" id="about-heading">
                Empowering investor relations through digital innovation.
              </h2>
            </div>
            <p className="about__text">
              Euroland IR is a multinational company dedicated to providing best
              practice Investor Relations services. We are founded in 1986 and
              successfully evolved branches in London, Dubai, Tokyo, Shanghai,
              Hong Kong, and Chennai. Our customers are across the globe,
              including Asia, Europe, Middle-East, and the UK.
            </p>
            <p className="about__text">
              With over 30 years of experience, we have acquired the necessary
              knowledge and understanding to advise companies on best practice
              investor relations and corporate communications strategies.
              Euroland IR tools and services ensure that the Investor Relations
              department can build trust and understanding between management and
              the investor community.
            </p>
          </div>

          <div className="about__cards" ref={cardsRef}>
            <article className="about__card" data-card>
              <h3 className="about__card-title">1,400+ Clients</h3>
              <p className="about__card-text">
                Trusted by listed companies worldwide, our digital solutions
                deliver data-driven storytelling that builds confidence and
                strengthens investor communication.
              </p>
            </article>
            <article className="about__card" data-card>
              <h3 className="about__card-title">24/7 Support &amp; Services</h3>
              <p className="about__card-text">
                Every client is assigned a dedicated account manager, supported
                by our 24/7 global service team for seamless performance and
                rapid assistance.
              </p>
            </article>
            <article className="about__card" data-card>
              <h3 className="about__card-title">Bank-Grade Cybersecurity</h3>
              <p className="about__card-text">
                Our platforms follow bank-level security protocols, ensuring
                data integrity, privacy, and operational resilience at every
                layer.
              </p>
            </article>
          </div>
        </div>

        <div
          className="about__logos"
          ref={logosRef}
          aria-label="Trusted by leading companies"
        >
          <div className="about__logos-track" data-logos-track>
            {[0, 1].map((copy) => (
              <div
                className="about__logos-set"
                key={copy}
                aria-hidden={copy === 1}
              >
                {CLIENT_LOGOS.map((logo) => (
                  <img
                    key={`${copy}-${logo.alt}`}
                    className="about__logo"
                    src={logo.src}
                    alt={copy === 0 ? logo.alt : ''}
                    style={{ height: logo.height }}
                    loading="lazy"
                    draggable={false}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="about__solutions">
          <div className="about__solutions-copy">
            <h2 className="about__solutions-heading">Our Solution</h2>
            <p className="about__solutions-text">
              Explore Euroland IR tools designed to present your equity story
              with clarity — from interactive share performance and self-serve
              analysis to AI-assisted investor engagement.
            </p>
          </div>

          <nav className="about__entries" aria-label="Explore our solutions">
            {PRODUCT_ENTRIES.map((entry) => (
              <Link
                key={entry.path}
                to={entry.path}
                className="about__entry"
              >
                <div className="about__entry-media">
                  <img
                    src={entry.image}
                    alt={entry.imageAlt}
                    loading="lazy"
                  />
                </div>
                <div className="about__entry-body">
                  <span className={`about__entry-tag about__entry-tag--${entry.tagTone}`}>
                    {entry.tag}
                  </span>
                  <h3 className="about__entry-title">{entry.title}</h3>
                  <p className="about__entry-text">{entry.description}</p>
                  <span className="about__entry-cta">
                    Learn more
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
