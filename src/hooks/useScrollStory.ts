import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollStoryRefs = {
  heroRef: RefObject<HTMLElement | null>
  heroBgRef: RefObject<HTMLDivElement | null>
  heroContentRef: RefObject<HTMLDivElement | null>
  heroPillsRef: RefObject<HTMLDivElement | null>
  aboutRef: RefObject<HTMLElement | null>
  aboutCardsRef: RefObject<HTMLDivElement | null>
  aboutLogosRef: RefObject<HTMLDivElement | null>
  enquiryRef: RefObject<HTMLElement | null>
  enquiryFormRef: RefObject<HTMLFormElement | null>
  enquiryWaveRef: RefObject<HTMLImageElement | null>
  footerRef: RefObject<HTMLElement | null>
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isCompactViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

export function useScrollStory(refs: ScrollStoryRefs, enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return

    const ctx = gsap.context(() => {
      const {
        heroRef,
        heroContentRef,
        heroPillsRef,
        aboutRef,
        aboutCardsRef,
        enquiryRef,
        enquiryFormRef,
        enquiryWaveRef,
        footerRef,
      } = refs

      const hero = heroRef.current
      const heroContent = heroContentRef.current
      const heroPills = heroPillsRef.current
      const about = aboutRef.current
      const aboutCards = aboutCardsRef.current
      const enquiry = enquiryRef.current
      const enquiryForm = enquiryFormRef.current
      const enquiryWave = enquiryWaveRef.current
      const footer = footerRef.current

      if (!hero || !heroContent) return

      const reduced = prefersReducedMotion()
      const compact = isCompactViewport()

      const title = heroContent.querySelector('[data-hero="title"]')
      const subtitle = heroContent.querySelector('[data-hero="subtitle"]')
      const desc = heroContent.querySelector('[data-hero="desc"]')
      const aboutCopy = about?.querySelector('[data-animate="about-copy"]')
      const aboutTexts = about?.querySelectorAll<HTMLElement>('.about__text')
      const cards = aboutCards?.querySelectorAll('[data-card]')
      const aboutLogos = about?.querySelector<HTMLElement>('.about__logos')
      const enquiryHeader = enquiry?.querySelector('[data-animate="enquiry-header"]')

      // Title/subtitle/desc must exist (kinetic or placeholder), but GSAP must NOT
      // tween those nodes — Motion owns their opacity/filter. Scrub the wrapper only.
      if (!title || !subtitle || !desc) return

      gsap.set(heroContent, { clearProps: 'filter' })
      gsap.set(heroContent, { opacity: 1, y: 0 })
      // Floating pills keep CSS centering — don't let GSAP overwrite transform
      if (heroPills) gsap.set(heroPills, { opacity: 1, clearProps: 'x,y' })

      if (reduced) {
        if (aboutCopy && about) {
          gsap.from(aboutCopy, {
            opacity: 0,
            duration: 0.4,
            scrollTrigger: { trigger: about, start: 'top 80%' },
          })
        }
        if (enquiryForm && enquiry) {
          gsap.from(enquiryForm, {
            opacity: 0,
            duration: 0.4,
            scrollTrigger: { trigger: enquiry, start: 'top 80%' },
          })
        }
        return
      }

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: compact ? '+=70%' : '+=120%',
          scrub: compact ? 0.45 : 0.65,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      heroTl.fromTo(
        heroContent,
        { y: 0, opacity: 1, filter: 'blur(0px)' },
        {
          y: compact ? -28 : -56,
          opacity: 0,
          filter: compact ? 'blur(0px)' : 'blur(6px)',
          ease: 'none',
        },
        0,
      )
      // Floating pills stay fixed — do not scrub them away

      // About: scrubbed reveal while the section scrolls through the viewport
      if (aboutCopy && about) {
        const heading = aboutCopy.querySelector(':scope > div')
        if (heading) {
          gsap.fromTo(
            heading,
            { y: compact ? 40 : 72, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: about,
                start: 'top 88%',
                end: 'top 42%',
                scrub: compact ? 0.5 : 0.7,
              },
            },
          )
        }

        if (aboutTexts?.length) {
          gsap.fromTo(
            aboutTexts,
            { y: compact ? 36 : 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: about,
                start: 'top 78%',
                end: 'top 32%',
                scrub: compact ? 0.5 : 0.7,
              },
            },
          )
        }
      }

      if (cards?.length && aboutCards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: compact ? 48 : 80 + index * 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: aboutCards,
                start: 'top 90%',
                end: 'top 40%',
                scrub: compact ? 0.5 : 0.65,
              },
            },
          )
        })
      }

      if (aboutLogos && about) {
        gsap.fromTo(
          aboutLogos,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: aboutLogos,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 0.55,
            },
          },
        )
      }

      if (enquiryHeader && enquiry) {
        gsap.fromTo(
          enquiryHeader,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: enquiry,
              start: 'top 82%',
              end: 'top 50%',
              scrub: 0.5,
            },
          },
        )
      }

      if (enquiryWave && enquiry) {
        gsap.fromTo(
          enquiryWave,
          { xPercent: -6, opacity: 0.4 },
          {
            xPercent: 3,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: enquiry,
              start: 'top 90%',
              end: 'bottom 45%',
              scrub: 0.65,
            },
          },
        )
      }

      if (enquiryForm) {
        gsap.fromTo(
          enquiryForm,
          {
            y: compact ? 28 : 48,
            opacity: 0,
            scale: compact ? 0.99 : 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: enquiryForm,
              start: 'top 88%',
              end: 'top 52%',
              scrub: compact ? 0.4 : 0.55,
            },
          },
        )
      }

      if (footer) {
        gsap.fromTo(
          footer.children,
          { y: 20, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top 94%',
              end: 'top 75%',
              scrub: 0.4,
            },
          },
        )
      }
    })

    // Recalculate after pin + unlock so scrolling distances are correct
    requestAnimationFrame(() => ScrollTrigger.refresh())

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [refs, enabled])
}
