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

const CLIENT_LOGOS_SET_1 = CLIENT_LOGOS.slice(0, 10)
const CLIENT_LOGOS_SET_2 = CLIENT_LOGOS.slice(10)

const PRODUCT_ENTRIES = [
  {
    path: '/share-graph',
    tag: 'SHARE GRAPH',
    title: 'Share Graph',
    description:
      'Present your share performance through interactive charts, peer benchmarks, and corporate events that help investors understand how market and company events affect share performance.',
    image: '/assets/products/share-graph-card.jpg',
    imageAlt: 'Financial charts on a laptop screen',
  },
  {
    path: '/interactive-analysis-tool',
    tag: 'INTERACTIVE ANALYSIS TOOL',
    title: 'Interactive Analysis Tool',
    description:
      'Help investors explore financial fundamentals, ratios, and historical data using easy-to-use filters.',
    image: '/assets/products/iat-card.jpg',
    imageAlt: 'Analytics dashboard with charts and graphs',
  },
  {
    path: '/artificial-intelligence',
    tag: 'AI-POWERED INVESTOR RELATIONS',
    title: 'AI-Powered Investor Relations',
    description:
      'Use AI to summarise filings, identify key market developments, and help IR teams respond more efficiently.',
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
  // Dual-row marquee: each row scrolls and reacts independently.
  useEffect(() => {
    const root = logosRef.current
    const rowEls = root
      ? Array.from(root.querySelectorAll<HTMLElement>('.about__logos-row'))
      : []
    if (!root || rowEls.length === 0) return

    const reduced = prefersReducedMotion()
    let raf = 0
    let lastTs = 0

    type RowState = {
      rowEl: HTMLElement
      track: HTMLElement
      offset: number
      halfWidth: number
      dragStartOffset: number
      // -1 = right → left, +1 = left → right
      direction: number
      dragging: boolean
      pointerId: number | null
      dragStartX: number
      paused: boolean
      resumeTimer: number
    }

    const rows: RowState[] = rowEls.flatMap((rowEl, index) => {
      const track = rowEl.querySelector<HTMLElement>('[data-logos-track]')
      if (!track) return []
      const dirAttr = track.dataset.direction
      return [
        {
          rowEl,
          track,
          offset: index === 0 ? 0 : -220,
          halfWidth: 0,
          dragStartOffset: 0,
          direction: dirAttr === 'ltr' ? 1 : -1,
          dragging: false,
          pointerId: null,
          dragStartX: 0,
          paused: false,
          resumeTimer: 0,
        },
      ]
    })

    if (rows.length === 0) return

    const measure = (row: RowState) => {
      row.halfWidth = row.track.scrollWidth / 2
    }

    const wrapOffset = (row: RowState) => {
      if (row.halfWidth <= 0) return
      while (row.offset <= -row.halfWidth) row.offset += row.halfWidth
      while (row.offset > 0) row.offset -= row.halfWidth
    }

    const render = (row: RowState) => {
      wrapOffset(row)
      row.track.style.transform = `translate3d(${row.offset}px, 0, 0)`
    }

    // One full logo-set loop ≈ 170s
    const speedFor = (row: RowState) =>
      row.halfWidth > 0 ? row.halfWidth / 170000 : 0.01

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts
      const delta = ts - lastTs
      lastTs = ts

      if (!reduced) {
        rows.forEach((row) => {
          if (row.dragging || row.paused) return
          row.offset += row.direction * speedFor(row) * delta
          render(row)
        })
      }

      raf = requestAnimationFrame(tick)
    }

    const scheduleResume = (row: RowState) => {
      window.clearTimeout(row.resumeTimer)
      row.resumeTimer = window.setTimeout(() => {
        if (!row.dragging) row.paused = false
      }, 1200)
    }

    const cleanups = rows.map((row) => {
      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return
        event.stopPropagation()
        row.dragging = true
        row.paused = true
        row.pointerId = event.pointerId
        row.dragStartX = event.clientX
        row.dragStartOffset = row.offset
        row.rowEl.classList.add('about__logos-row--dragging')
        row.rowEl.setPointerCapture(event.pointerId)
        window.clearTimeout(row.resumeTimer)
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!row.dragging || event.pointerId !== row.pointerId) return
        const dx = event.clientX - row.dragStartX
        row.offset = row.dragStartOffset + dx
        render(row)
      }

      const endDrag = (event: PointerEvent) => {
        if (!row.dragging || event.pointerId !== row.pointerId) return
        const dx = event.clientX - row.dragStartX
        if (Math.abs(dx) > 4) {
          row.direction = dx > 0 ? 1 : -1
        }
        row.dragging = false
        row.pointerId = null
        row.rowEl.classList.remove('about__logos-row--dragging')
        try {
          row.rowEl.releasePointerCapture(event.pointerId)
        } catch {
          /* already released */
        }
        scheduleResume(row)
      }

      const onWheel = (event: WheelEvent) => {
        const delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
        if (!delta) return
        event.preventDefault()
        event.stopPropagation()
        row.paused = true
        window.clearTimeout(row.resumeTimer)
        row.offset += delta
        render(row)
        if (Math.abs(delta) > 0.5) {
          row.direction = delta > 0 ? 1 : -1
        }
        scheduleResume(row)
      }

      measure(row)
      render(row)

      row.rowEl.addEventListener('pointerdown', onPointerDown)
      row.rowEl.addEventListener('pointermove', onPointerMove)
      row.rowEl.addEventListener('pointerup', endDrag)
      row.rowEl.addEventListener('pointercancel', endDrag)
      row.rowEl.addEventListener('wheel', onWheel, { passive: false })

      return () => {
        window.clearTimeout(row.resumeTimer)
        row.rowEl.removeEventListener('pointerdown', onPointerDown)
        row.rowEl.removeEventListener('pointermove', onPointerMove)
        row.rowEl.removeEventListener('pointerup', endDrag)
        row.rowEl.removeEventListener('pointercancel', endDrag)
        row.rowEl.removeEventListener('wheel', onWheel)
        row.rowEl.classList.remove('about__logos-row--dragging')
        row.track.style.transform = ''
      }
    })

    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      rows.forEach((row) => {
        const ratio = row.halfWidth > 0 ? row.offset / row.halfWidth : 0
        measure(row)
        row.offset = ratio * row.halfWidth
        render(row)
      })
    })
    rows.forEach((row) => ro.observe(row.track))

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cleanups.forEach((cleanup) => cleanup())
      root.classList.remove('about__logos--dragging')
    }
  }, [logosRef])

  const renderLogoRow = (
    rowKey: string,
    direction: 'rtl' | 'ltr',
    logos: readonly (typeof CLIENT_LOGOS)[number][],
  ) => (
    <div className="about__logos-row">
      <div
        className="about__logos-track"
        data-logos-track
        data-direction={direction}
      >
        {[0, 1].map((copy) => (
          <div
            className="about__logos-set"
            key={`${rowKey}-${copy}`}
            aria-hidden={copy === 1}
          >
            {logos.map((logo) => (
              <img
                key={`${rowKey}-${copy}-${logo.alt}`}
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
  )

  return (
    <section className="about" id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="about__inner">
        <div className="about__story">
          <div className="about__copy" data-animate="about-copy">
            <h2 className="about__eyebrow" id="about-heading">
              About Euroland IR
            </h2>
            <p className="about__text">
              Euroland IR provides investor relations solutions that help listed
              companies communicate effectively with investors and strengthen investor
              engagement.
            </p>
            <p className="about__text">
              Founded in 1986, Euroland IR has grown into a global investor relations
              partner with offices in London, Dubai, Tokyo, Shanghai, Hong Kong, and
              Chennai. We support listed companies across global markets, including
              Asia, Europe, and the Middle East. With decades of experience in investor
              relations and corporate communications, we bring industry knowledge and
              expertise to help companies communicate effectively with investors.
            </p>
            <p className="about__text">
              Our tools and services help IR teams communicate company information
              clearly and effectively with investors. Combining best-practice investor
              relations solutions with innovative financial technology to help companies
              engage investors more effectively. Our digital solutions help listed
              companies present financial and corporate information clearly, build
              investor confidence, and communicate more effectively.
            </p>
          </div>

          <div className="about__cards" ref={cardsRef}>
            <article className="about__card about__card--clients" data-card>
              <h3 className="about__card-title">
                <span className="about__card-stat">1,400+</span>
                <span className="about__card-label">Clients</span>
              </h3>
              <p className="about__card-text">
                Trusted by listed companies worldwide, our digital solutions
                deliver data-driven storytelling that builds confidence and
                strengthens investor communication.
              </p>
            </article>

            <article className="about__card about__card--support" data-card>
              <h3 className="about__card-title">
                <span className="about__card-stat">24/7</span>
                <span className="about__card-label">Support &amp; Services</span>
              </h3>
              <p className="about__card-text">
                Every client is supported by a dedicated Account Manager and our
                24/7 global service team, ensuring continuity, responsiveness
                and reliable performance.
              </p>
            </article>

            <article className="about__card about__card--security" data-card>
              <h3 className="about__card-title">
                <span className="about__card-stat about__card-stat--text">
                  Bank-Grade
                </span>
                <span className="about__card-label">Cybersecurity</span>
              </h3>
              <p className="about__card-text">
                Our platforms are built around robust, bank-grade security
                standards designed to protect data integrity, privacy and
                operational resilience.
              </p>
            </article>
          </div>
        </div>

        <div className="about__clients">
          <h2 className="about__clients-heading">Our Clients</h2>
          <div
            className="about__logos"
            ref={logosRef}
            aria-label="Trusted by leading companies"
          >
            {renderLogoRow('top', 'rtl', CLIENT_LOGOS_SET_1)}
            {renderLogoRow('bottom', 'ltr', CLIENT_LOGOS_SET_2)}
          </div>
        </div>

        <div className="about__solutions">
          <div className="about__solutions-copy">
            <h2 className="about__solutions-heading">Our solutions</h2>
            <p className="about__solutions-text">
              Explore solutions designed to help you present your company clearly —
              from interactive share performance and analysis to AI-powered IR tools.
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
                  <span className="about__entry-tag">{entry.tag}</span>
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
