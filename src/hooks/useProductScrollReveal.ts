import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ProductScrollRevealOptions = {
  header?: string
  items?: string
  media?: string
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isCompactViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

/**
 * Scrub completes while the element is still near the bottom of the viewport,
 * so anything above the sticky chrome / “line” is already at full opacity.
 */
export function scrubRevealIn(
  el: HTMLElement,
  {
    y = 24,
    compact = false,
  }: {
    y?: number
    compact?: boolean
  } = {},
) {
  const start = 'top bottom'
  // Finish while still in the lower ~10–15% of the viewport
  const end = compact ? 'top 90%' : 'top 88%'
  const scrub = compact ? 0.25 : 0.35

  gsap.fromTo(
    el,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        // Snap to finished state if already past the end on load/refresh
        invalidateOnRefresh: true,
      },
    },
  )
}

/** Shared scrubbed reveal used across product intro / features / explained / live. */
export function useProductScrollReveal(
  sectionRef: RefObject<HTMLElement | null>,
  { header, items, media }: ProductScrollRevealOptions,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerEl = header ? section.querySelector<HTMLElement>(header) : null
    const itemEls = items
      ? Array.from(section.querySelectorAll<HTMLElement>(items))
      : []
    const mediaEl = media ? section.querySelector<HTMLElement>(media) : null
    const compact = isCompactViewport()
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduced) {
        const targets = [headerEl, ...itemEls, mediaEl].filter(Boolean) as HTMLElement[]
        if (targets.length) {
          gsap.from(targets, {
            opacity: 0,
            y: 12,
            duration: 0.28,
            stagger: 0.04,
            scrollTrigger: { trigger: section, start: 'top 95%' },
          })
        }
        return
      }

      if (headerEl) scrubRevealIn(headerEl, { y: compact ? 16 : 24, compact })

      itemEls.forEach((item, index) => {
        scrubRevealIn(item, {
          y: compact ? 16 + index * 2 : 22 + index * 4,
          compact,
        })
      })

      if (mediaEl) scrubRevealIn(mediaEl, { y: compact ? 16 : 24, compact })
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)

    window.addEventListener('resize', refresh)
    window.addEventListener('orientationchange', refresh)

    return () => {
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
      ctx.revert()
    }
  }, [sectionRef, header, items, media])
}
