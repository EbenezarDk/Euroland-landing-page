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

/** Shared scrubbed reveal used across product intro / features / explained. */
export function useProductScrollReveal(
  sectionRef: RefObject<HTMLElement | null>,
  { header, items, media }: ProductScrollRevealOptions,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerEl = header ? section.querySelector<HTMLElement>(header) : null
    const itemEls = items ? section.querySelectorAll<HTMLElement>(items) : []
    const mediaEl = media ? section.querySelector<HTMLElement>(media) : null
    const compact = isCompactViewport()
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduced) {
        const targets = [headerEl, ...itemEls, mediaEl].filter(Boolean)
        if (targets.length) {
          gsap.from(targets, {
            opacity: 0,
            duration: 0.35,
            stagger: 0.05,
            scrollTrigger: { trigger: section, start: 'top 80%' },
          })
        }
        return
      }

      if (headerEl) {
        gsap.fromTo(
          headerEl,
          { y: compact ? 32 : 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'top 42%',
              scrub: compact ? 0.5 : 0.7,
            },
          },
        )
      }

      if (itemEls.length) {
        itemEls.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: compact ? 36 : 48 + index * 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                end: 'top 30%',
                scrub: compact ? 0.5 : 0.7,
              },
            },
          )
        })
      }

      if (mediaEl) {
        gsap.fromTo(
          mediaEl,
          { y: compact ? 28 : 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: mediaEl,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.6,
            },
          },
        )
      }
    }, section)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [sectionRef, header, items, media])
}
