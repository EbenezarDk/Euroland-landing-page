import type { RefObject } from 'react'
import { TextAnimate } from './TextAnimate'

type HeroProps = {
  sectionRef: RefObject<HTMLElement | null>
  bgRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  overlayRef?: RefObject<HTMLDivElement | null>
  textReady?: boolean
}

export function Hero({
  sectionRef,
  bgRef,
  contentRef,
  overlayRef,
  textReady = false,
}: HeroProps) {
  return (
    <section className="hero" id="hero" ref={sectionRef} aria-label="Euroland IR hero">
      <div className="hero__bg" ref={bgRef} aria-hidden>
        <img
          className="hero__video"
          src="/assets/50.png"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero__veil" aria-hidden />
      <div className="hero__text-overlay" ref={overlayRef} aria-hidden />

      <div className="hero__content" ref={contentRef}>
        {textReady ? (
          <TextAnimate
            as="h1"
            className="hero__title"
            data-hero="title"
            animation="fadeIn"
            by="line"
            startOnView={false}
            once
            accessible={false}
            duration={0.45}
          >
            TELL YOUR EQUITY STORY
          </TextAnimate>
        ) : (
          <h1 className="hero__title" data-hero="title" aria-hidden style={{ opacity: 0 }}>
            TELL YOUR EQUITY STORY
          </h1>
        )}

        {textReady ? (
          <TextAnimate
            as="p"
            className="hero__subtitle"
            data-hero="subtitle"
            animation="fadeIn"
            by="line"
            startOnView={false}
            once
            accessible={false}
            duration={0.4}
            delay={0.12}
          >
            ENGAGE INVESTORS
          </TextAnimate>
        ) : (
          <p className="hero__subtitle" data-hero="subtitle" aria-hidden style={{ opacity: 0 }}>
            ENGAGE INVESTORS
          </p>
        )}

        <a
          className="hero__cta"
          href="#enquiry"
          data-hero="cta"
          style={textReady ? undefined : { opacity: 0 }}
        >
          Let's Talk
          <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
        </a>
      </div>
    </section>
  )
}
