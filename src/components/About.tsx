import { useEffect, type RefObject } from 'react'
import { Link } from 'react-router-dom'

const CLIENT_LOGOS_SET_1 = Array.from({ length: 31 }, (_, i) => ({
  src: `/assets/clients/logo-${String(i + 1).padStart(3, '0')}.png`,
  alt: `Client logo ${i + 1}`,
  height: 42,
}))

const CLIENT_LOGOS_SET_2 = Array.from({ length: 30 }, (_, i) => ({
  src: `/assets/clients/set-2/logo-${String(i + 1).padStart(3, '0')}.png`,
  alt: `Client logo ${i + 32}`,
  height: 42,
}))

const PRODUCT_ENTRIES = [
  {
    path: '/share-graph',
    tag: 'Purpose-Built AI for IR',
    title: 'The IR team just got bigger.',
    description:
      'Let AI handle the routine so you can focus on strategy, relationships and what matters most.',
    image: '/assets/products/ai-assistant-card.png',
    imageAlt: 'Stacked IR service cubes with AI highlighted',
  },
  {
    path: '/interactive-analysis-tool',
    tag: 'BEST-PRACTICE IR SOLUTIONS',
    title: 'Transform your IR website into an intelligent Investor Hub.',
    description:
      'Tell your equity story more effectively, improve the investor experience and strengthen your AI readiness.',
    image: '/assets/products/iat-card.jpg',
    imageAlt: 'Analytics dashboard with charts and graphs',
  },
  {
    path: '/artificial-intelligence',
    tag: 'ESG SOLUTIONS',
    title: 'Turn ESG into a compelling investor story.',
    description:
      'Present measurable performance and connect the numbers with your sustainability strategy, targets and commitments.',
    image: '/assets/products/esg-card.jpg',
    imageAlt: 'ESG pillars on a glowing Earth sustainability path',
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
    logos: typeof CLIENT_LOGOS_SET_1,
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
              Euroland IR is your strategic partner for digital Investor Relations
              solutions designed to strengthen credibility, improve investor access,
              and communicate company value with clarity.
            </p>
            <p className="about__text">
              Trusted by more than 1,400 listed companies worldwide, including 250+
              across the Middle East and GCC, we deliver a comprehensive suite of IR
              solutions—from real-time market data and AI Assistant to mobile IR apps,
              Sustainability Performance solutions and specialized digital services.
            </p>
            <p className="about__text">
              Our integrated approach helps listed companies enhance transparency,
              elevate investor experience, and communicate more effectively across
              increasingly competitive global capital markets.
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
