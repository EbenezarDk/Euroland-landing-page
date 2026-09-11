import { useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQS } from '../data/faqs'

gsap.registerPlugin(ScrollTrigger)

export function Faq() {
  const sectionRef = useRef<HTMLElement>(null)
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(FAQS[1]?.id ?? null)
  const reduceMotion = useReducedMotion()

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const header = section.querySelector<HTMLElement>('.faq__header')
    const items = section.querySelectorAll<HTMLElement>('.faq__item')
    const cta = section.querySelector<HTMLElement>('.faq__cta')
    const compact = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.from([header, ...items, cta].filter(Boolean), {
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        })
        return
      }

      if (header) {
        gsap.fromTo(
          header,
          { y: compact ? 40 : 64, opacity: 0 },
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

      if (items.length) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: compact ? 40 : 56 + index * 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 28%',
                scrub: compact ? 0.5 : 0.7,
              },
            },
          )
        })
      }

      if (cta) {
        gsap.fromTo(
          cta,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: cta,
              start: 'top 94%',
              end: 'top 68%',
              scrub: 0.55,
            },
          },
        )
      }
    }, section)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="faq"
      id="faqs"
      ref={sectionRef}
      aria-labelledby="faq-heading"
    >
      <div className="faq__shell">
        <header className="faq__header">
          <h2 className="faq__heading" id="faq-heading">
            Frequently asked questions
          </h2>
        </header>

        <ul className="faq__list">
          {FAQS.map((item, index) => {
            const isOpen = openId === item.id
            const panelId = `${baseId}-panel-${item.id}`
            const buttonId = `${baseId}-button-${item.id}`

            return (
              <li key={item.id}>
                <div className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="faq__number" aria-hidden>
                      {index + 1}
                    </span>
                    <span className="faq__question">{item.question}</span>
                    <span className="faq__icon" aria-hidden>
                      <span className="faq__icon-mark">+</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="faq__panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={panelTransition}
                      >
                        <p className="faq__answer">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="faq__cta">
          Have any other questions?{' '}
          <a className="faq__cta-link" href="#enquiry">
            Contact Us
            <span className="faq__cta-arrow" aria-hidden>
              →
            </span>
          </a>
        </p>
      </div>
    </section>
  )
}
