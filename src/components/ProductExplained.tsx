import { useRef } from 'react'
import type { ProductContent } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductExplainedProps = {
  product: ProductContent
}

export function ProductExplained({ product }: ProductExplainedProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const section = product.explained

  useProductScrollReveal(sectionRef, {
    header: '.product-explained__heading',
    items: '.product-explained__text, .product-explained__examples',
    media: '.product-explained__media',
  })

  if (!section) return null

  return (
    <section
      className="product-explained"
      ref={sectionRef}
      aria-labelledby="product-explained-heading"
    >
      <div className="product-explained__inner">
        <div className="product-explained__copy">
          <h2
            className="product-explained__heading"
            id="product-explained-heading"
          >
            {section.heading.join(' ')}
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="product-explained__text">
              {paragraph}
            </p>
          ))}

          {section.liveExamples?.length ? (
            <div className="product-explained__examples">
              <p className="product-explained__examples-label">Live Example</p>
              <ul className="product-explained__logos" aria-label="Live examples">
                {section.liveExamples.map((logo) => (
                  <li key={logo.src} className="product-explained__logo">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      height={logo.height ?? 28}
                      style={{ height: logo.height ?? 28 }}
                      loading="lazy"
                      draggable={false}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="product-explained__media">
          <img
            src={section.image}
            alt={section.imageAlt}
            width={707}
            height={477}
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
