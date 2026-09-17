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
    items: '.product-explained__text',
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
        </div>

        <div className="product-explained__media">
          <img
            src={section.image}
            alt={section.imageAlt}
            width={707}
            height={477}
            sizes="(max-width: 1100px) 100vw, min(707px, 50vw)"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
