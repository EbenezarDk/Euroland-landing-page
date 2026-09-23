import { useEffect, useState, type RefObject } from 'react'

type StickyChromeOptions = {
  aboutRef: RefObject<HTMLElement | null>
  enquiryRef: RefObject<HTMLElement | null>
  footerRef: RefObject<HTMLElement | null>
  pillsRef?: RefObject<HTMLElement | null>
  enabled?: boolean
}

/**
 * Light chrome while over white page sections (About, Enquiry).
 * Dark chrome over hero / footer.
 *
 * Header and pills sit at opposite edges of the viewport, so each
 * samples the background at its own position.
 */
export function useStickyChrome({
  aboutRef,
  enquiryRef,
  footerRef,
  pillsRef,
  enabled = true,
}: StickyChromeOptions) {
  const [isLight, setIsLight] = useState(false)
  const [isPillsLight, setIsPillsLight] = useState(false)
  const [isPillsHidden, setIsPillsHidden] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIsLight(false)
      setIsPillsLight(false)
      setIsPillsHidden(false)
      setIsPastHero(false)
      return
    }

    const update = () => {
      const about = aboutRef.current
      const footer = footerRef.current
      if (!about) return

      const aboutTop = about.getBoundingClientRect().top
      const footerRect = footer?.getBoundingClientRect()
      const footerTop = footerRect?.top ?? Number.POSITIVE_INFINITY

      // Match sticky header height so CTA hash scroll (scroll-margin-top)
      // still lands in the filled / light chrome state.
      const header = document.querySelector('.hero__header')
      const headerOffset =
        header instanceof HTMLElement ? header.getBoundingClientRect().height : 100

      const nextLight = aboutTop <= headerOffset + 8 && footerTop > headerOffset + 40
      const pills = pillsRef?.current
      const pillsRect = pills?.getBoundingClientRect()
      const pillsSampleY = pillsRect
        ? pillsRect.top + pillsRect.height / 2
        : window.innerHeight - 50
      const nextPillsLight = aboutTop <= pillsSampleY && footerTop > pillsSampleY

      // Dim once the hero/banner has left and content sections enter view.
      const nextPastHero = aboutTop < window.innerHeight - 24

      // Hide as soon as the footer overlaps the floating pills band.
      const pillsBottom = pillsRect?.bottom ?? window.innerHeight - 80
      const nextPillsHidden = footerTop <= pillsBottom

      setIsLight((prev) => (prev === nextLight ? prev : nextLight))
      setIsPillsLight((prev) => (prev === nextPillsLight ? prev : nextPillsLight))
      setIsPastHero((prev) => (prev === nextPastHero ? prev : nextPastHero))
      setIsPillsHidden((prev) => (prev === nextPillsHidden ? prev : nextPillsHidden))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', update)
    }
  }, [aboutRef, enquiryRef, footerRef, pillsRef, enabled])

  return { isLight, isPillsLight, isPillsHidden, isPastHero }
}
