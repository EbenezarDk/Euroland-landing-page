import type { RefObject } from 'react'
import { KineticTextAnimate } from './KineticTextAnimate'

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
          <KineticTextAnimate
            as="h1"
            className="hero__title"
            data-hero="title"
            text={"TELL YOUR\nEQUITY STORY"}
            startOnView={false}
            once
            accessible={false}
            duration={0.525}
          />
        ) : (
          <h1 className="hero__title" data-hero="title" aria-hidden style={{ opacity: 0 }}>
            TELL YOUR EQUITY STORY
          </h1>
        )}
        {textReady ? (
          <KineticTextAnimate
            as="p"
            className="hero__subtitle"
            data-hero="subtitle"
            text="ENGAGE INVESTORS"
            startOnView={false}
            once
            accessible={false}
            duration={0.425}
            delay={0.06}
          />
        ) : (
          <p className="hero__subtitle" data-hero="subtitle" aria-hidden style={{ opacity: 0 }}>
            ENGAGE INVESTORS
          </p>
        )}
        <div className="hero__desc" data-hero="desc" style={textReady ? undefined : { opacity: 0 }}>
          {textReady ? (
            <>
              <KineticTextAnimate
                as="p"
                text="Combining Best Practice IR Solutions with state-of-the-art financial technology."
                startOnView={false}
                once
                accessible={false}
                duration={1.05}
              />
              <KineticTextAnimate
                as="p"
                text="Euroland IR creates IR Solutions that increase Investor Engagement."
                startOnView={false}
                once
                accessible={false}
                duration={1.05}
                delay={0.06}
              />
            </>
          ) : (
            <>
              <p>
                Combining Best Practice IR Solutions with state-of-the-art financial
                technology.
              </p>
              <p>Euroland IR creates IR Solutions that increase Investor Engagement.</p>
            </>
          )}
        </div>

        <a
          className="hero__cta"
          href="#enquiry"
          data-hero="cta"
          style={textReady ? undefined : { opacity: 0 }}
        >
          Get a call back
          <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
        </a>
      </div>
    </section>
  )
}
