import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { HERO_OVERLAY_TARGET_OPACITY } from '../lib/heroIntroTiming'

type HeroIntroRefs = {
  heroRef: RefObject<HTMLElement | null>
  headerRef: RefObject<HTMLElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  pillsRef: RefObject<HTMLDivElement | null>
  overlayRef: RefObject<HTMLDivElement | null>
}

type UseHeroIntroOptions = {
  onIntroComplete?: () => void
  onRevealStart?: () => void
}

/**
 * Instant hero reveal for the static background — header, pills, and
 * kinetic text appear immediately with no load/wait gate.
 */
export function useHeroVideo(
  refs: HeroIntroRefs,
  { onIntroComplete, onRevealStart }: UseHeroIntroOptions = {},
) {
  useLayoutEffect(() => {
    const { headerRef, contentRef, pillsRef, overlayRef } = refs
    const header = headerRef.current
    const content = contentRef.current
    const pills = pillsRef.current
    const overlay = overlayRef.current

    if (!header || !content || !pills || !overlay) return

    gsap.killTweensOf([header, pills, overlay])
    // Reveal immediately; clear GSAP inline opacity so CSS hide class can win later.
    gsap.set([header, pills], { opacity: 1, y: 0, clearProps: 'transform,opacity' })
    gsap.set(overlay, { opacity: HERO_OVERLAY_TARGET_OPACITY })

    onRevealStart?.()
    onIntroComplete?.()
  }, [refs, onIntroComplete, onRevealStart])
}
