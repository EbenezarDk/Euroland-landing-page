import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { SiteHeader } from '../components/SiteHeader'
import { FloatingPills } from '../components/FloatingPills'
import { About } from '../components/About'
import { Faq } from '../components/Faq'
import { Enquiry } from '../components/Enquiry'
import { Footer } from '../components/Footer'
import { useScrollStory } from '../hooks/useScrollStory'
import { useHeroVideo } from '../hooks/useHeroVideo'
import { useStickyChrome } from '../hooks/useStickyChrome'

export function LandingPage() {
  const [introComplete, setIntroComplete] = useState(true)
  const [heroTextReady, setHeroTextReady] = useState(true)

  const heroRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const heroHeaderRef = useRef<HTMLElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroOverlayRef = useRef<HTMLDivElement>(null)
  const heroPillsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const aboutCardsRef = useRef<HTMLDivElement>(null)
  const aboutLogosRef = useRef<HTMLDivElement>(null)
  const enquiryRef = useRef<HTMLElement>(null)
  const enquiryFormRef = useRef<HTMLFormElement>(null)
  const enquiryWaveRef = useRef<HTMLImageElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const scrollRefs = useMemo(
    () => ({
      heroRef,
      heroBgRef,
      heroContentRef,
      heroPillsRef,
      aboutRef,
      aboutCardsRef,
      aboutLogosRef,
      enquiryRef,
      enquiryFormRef,
      enquiryWaveRef,
      footerRef,
    }),
    [],
  )

  const videoRefs = useMemo(
    () => ({
      heroRef,
      headerRef: heroHeaderRef,
      contentRef: heroContentRef,
      pillsRef: heroPillsRef,
      overlayRef: heroOverlayRef,
    }),
    [],
  )

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  const handleRevealStart = useCallback(() => {
    setHeroTextReady(true)
  }, [])

  useHeroVideo(videoRefs, {
    onIntroComplete: handleIntroComplete,
    onRevealStart: handleRevealStart,
  })
  useScrollStory(scrollRefs, introComplete)

  const location = useLocation()

  useEffect(() => {
    if (!introComplete || !location.hash) return

    const id = location.hash.replace(/^#/, '')
    if (!id) return

    const scrollToHash = () => {
      const target = document.getElementById(id)
      if (!(target instanceof HTMLElement)) return
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.dispatchEvent(new Event('scroll'))
    }

    const timers = [0, 120, 400, 800].map((ms) => window.setTimeout(scrollToHash, ms))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [introComplete, location.hash, location.pathname])

  const { isLight, isPillsLight, isPillsHidden, isPastHero } = useStickyChrome({
    aboutRef,
    enquiryRef,
    footerRef,
    pillsRef: heroPillsRef,
    enabled: introComplete,
  })

  return (
    <main className="landing">
      <SiteHeader
        headerRef={heroHeaderRef}
        isLight={isLight}
        homeHref="#hero"
        contactHref="#enquiry"
        activePath="/"
      />
      <FloatingPills
        pillsRef={heroPillsRef}
        isLight={isPillsLight}
        isHidden={isPillsHidden}
        isPastHero={isPastHero}
        activePath="/"
      />

      <Hero
        sectionRef={heroRef}
        bgRef={heroBgRef}
        contentRef={heroContentRef}
        overlayRef={heroOverlayRef}
        textReady={heroTextReady}
      />
      <About
        sectionRef={aboutRef}
        cardsRef={aboutCardsRef}
        logosRef={aboutLogosRef}
      />
      <Faq />
      <Enquiry
        sectionRef={enquiryRef}
        formRef={enquiryFormRef}
        waveRef={enquiryWaveRef}
      />
      <Footer sectionRef={footerRef} />
    </main>
  )
}
