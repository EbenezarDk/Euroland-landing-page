import { useEffect, useRef } from 'react'
import type { ProductContent, ProductLiveExample } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductLiveExamplesProps = {
  product: ProductContent
  headingId?: string
  /** When set, use this logo list instead of the primary liveExamples */
  logos?: ProductLiveExample[]
  /** Static row — no marquee, no repetition */
  static?: boolean
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type LiveExamplesMarqueeProps = {
  logos: ProductLiveExample[]
  direction?: 'rtl' | 'ltr'
  label?: string
}

function LiveExampleLogo({
  logo,
  alt,
}: {
  logo: ProductLiveExample
  alt: string
}) {
  const img = (
    <img
      src={logo.src}
      alt={alt}
      height={logo.height ?? 36}
      style={{ height: logo.height ?? 36 }}
      loading="lazy"
      draggable={false}
    />
  )

  if (!logo.href) return img

  return (
    <a
      className="product-explained__logo-link"
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {img}
    </a>
  )
}

function LiveExamplesMarquee({
  logos,
  direction = 'rtl',
  label = 'Live examples',
}: LiveExamplesMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const track = root?.querySelector<HTMLElement>('[data-logos-track]')
    if (!root || !track || logos.length === 0) return

    const reduced = prefersReducedMotion()
    let raf = 0
    let lastTs = 0
    let offset = direction === 'ltr' ? -180 : 0
    let halfWidth = 0
    let scrollDirection = direction === 'ltr' ? 1 : -1
    let dragging = false
    let paused = false
    let pointerId: number | null = null
    let dragStartX = 0
    let dragStartOffset = 0
    let resumeTimer = 0

    const measure = () => {
      halfWidth = track.scrollWidth / 2
    }

    const wrapOffset = () => {
      if (halfWidth <= 0) return
      while (offset <= -halfWidth) offset += halfWidth
      while (offset > 0) offset -= halfWidth
    }

    const render = () => {
      wrapOffset()
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    const speed = () => (halfWidth > 0 ? halfWidth / 90000 : 0.02)

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts
      const delta = ts - lastTs
      lastTs = ts

      if (!reduced && !dragging && !paused) {
        offset += scrollDirection * speed() * delta
        render()
      }

      raf = requestAnimationFrame(tick)
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
      root.classList.add('product-explained__logos--dragging')
      root.setPointerCapture(event.pointerId)
      window.clearTimeout(resumeTimer)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return
      offset = dragStartOffset + (event.clientX - dragStartX)
      render()
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return
      const dx = event.clientX - dragStartX
      if (Math.abs(dx) > 4) scrollDirection = dx > 0 ? 1 : -1
      dragging = false
      pointerId = null
      root.classList.remove('product-explained__logos--dragging')
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
      paused = true
      window.clearTimeout(resumeTimer)
      offset += delta
      render()
      if (Math.abs(delta) > 0.5) scrollDirection = delta > 0 ? 1 : -1
      scheduleResume()
    }

    const onPointerEnter = () => {
      paused = true
      window.clearTimeout(resumeTimer)
    }

    const onPointerLeave = () => {
      if (!dragging) paused = false
    }

    measure()
    render()
    raf = requestAnimationFrame(tick)

    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove)
    root.addEventListener('pointerup', endDrag)
    root.addEventListener('pointercancel', endDrag)
    root.addEventListener('pointerenter', onPointerEnter)
    root.addEventListener('pointerleave', onPointerLeave)
    root.addEventListener('wheel', onWheel, { passive: false })

    const ro = new ResizeObserver(() => {
      const ratio = halfWidth > 0 ? offset / halfWidth : 0
      measure()
      offset = ratio * halfWidth
      render()
    })
    ro.observe(track)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer)
      ro.disconnect()
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', endDrag)
      root.removeEventListener('pointercancel', endDrag)
      root.removeEventListener('pointerenter', onPointerEnter)
      root.removeEventListener('pointerleave', onPointerLeave)
      root.removeEventListener('wheel', onWheel)
      root.classList.remove('product-explained__logos--dragging')
      track.style.transform = ''
    }
  }, [logos, direction])

  if (logos.length === 0) return null

  return (
    <div className="product-explained__logos" ref={rootRef} aria-label={label}>
      <div
        className="product-explained__logos-track"
        data-logos-track
        data-direction={direction}
      >
        {[0, 1].map((copy) => (
          <ul
            className="product-explained__logos-set"
            key={copy}
            aria-hidden={copy === 1}
          >
            {logos.map((logo, index) => (
              <li key={`${copy}-${index}-${logo.src}`} className="product-explained__logo">
                <LiveExampleLogo logo={logo} alt={copy === 0 ? logo.alt : ''} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function ProductLiveExamples({
  product,
  headingId = 'product-live-examples-heading',
  logos: logosProp,
  static: isStatic = false,
}: ProductLiveExamplesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const logos =
    logosProp ?? product.liveExamples ?? product.explained?.liveExamples ?? []

  useProductScrollReveal(sectionRef, {
    items: '.product-explained__live-heading, .product-explained__logos',
  })

  if (logos.length === 0) return null

  return (
    <section
      className={`product-live-examples${isStatic ? ' product-live-examples--static' : ''}`}
      ref={sectionRef}
      aria-labelledby={headingId}
    >
      <div className="product-explained__live">
        <h2 className="product-explained__live-heading" id={headingId}>
          Live examples
        </h2>
        {isStatic ? (
          <ul className="product-explained__logos product-explained__logos--static" aria-label="Live examples">
            {logos.map((logo) => (
              <li key={logo.src} className="product-explained__logo">
                <LiveExampleLogo logo={logo} alt={logo.alt} />
              </li>
            ))}
          </ul>
        ) : (
          <LiveExamplesMarquee logos={logos} direction="rtl" />
        )}
      </div>
    </section>
  )
}
