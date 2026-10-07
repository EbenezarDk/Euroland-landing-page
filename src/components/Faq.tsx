import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQS, type FaqItem } from '../data/faqs'
import { scrubRevealIn } from '../hooks/useProductScrollReveal'

gsap.registerPlugin(ScrollTrigger)

type FaqProps = {
  items?: FaqItem[]
}

export function Faq({ items = FAQS }: FaqProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setOpenId(items[0]?.id ?? null)
  }, [items])

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const header = section.querySelector<HTMLElement>('.faq__header')
    const items = Array.from(section.querySelectorAll<HTMLElement>('.faq__item'))
    const compact = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.from([header, ...items].filter(Boolean), {
          opacity: 0,
          y: 12,
          duration: 0.3,
          stagger: 0.05,
          scrollTrigger: { trigger: section, start: 'top 95%' },
        })
        return
      }

      // Per-element scrub: fully visible as soon as each block clears the bottom of the viewport
      if (header) scrubRevealIn(header, { y: compact ? 18 : 28, compact })

      items.forEach((item, index) => {
        scrubRevealIn(item, {
          y: compact ? 18 + index * 2 : 24 + index * 4,
          compact,
        })
      })
    }, section)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      ctx.revert()
    }
  }, [items])

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
            Frequently Asked Questions
          </h2>
        </header>

        <ul className="faq__list">
          {items.map((item, index) => {
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
      </div>
    </section>
  )
}
