import { useRef } from 'react'
import type { ProductContent, ProductExplained as ProductExplainedContent } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'
import { Safari } from './Safari'

type ProductExplainedProps = {
  product: ProductContent
  /** Override product.explained (e.g. tab-specific Fact Sheet block) */
  section?: ProductExplainedContent
  headingId?: string
}

export function ProductExplained({
  product,
  section: sectionOverride,
  headingId = 'product-explained-heading',
}: ProductExplainedProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const section = sectionOverride ?? product.explained
  const hasMedia = Boolean(section?.image)

  useProductScrollReveal(sectionRef, {
    header: '.product-explained__heading, .product-explained__eyebrow',
    items: '.product-explained__text',
    media: hasMedia ? '.product-explained__media' : undefined,
  })

  if (!section) return null

  return (
    <section
      className={`product-explained${hasMedia ? '' : ' product-explained--text'}`}
      ref={sectionRef}
      aria-labelledby={headingId}
    >
      <div className="product-explained__inner">
        <div className="product-explained__copy">
          {section.eyebrow ? (
            <p className="product-explained__eyebrow">{section.eyebrow}</p>
          ) : null}
          <h2 className="product-explained__heading" id={headingId}>
            {section.heading.join(' ')}
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="product-explained__text">
              {paragraph}
            </p>
          ))}
        </div>

        {hasMedia && section.image ? (
          <div
            className={`product-explained__media${section.safariUrl ? ' product-explained__media--safari' : ''}`}
          >
            {section.safariUrl ? (
              <Safari
                url={section.safariUrl}
                imageSrc={section.image}
                imageAlt={section.imageAlt ?? ''}
              />
            ) : (
              <img
                src={section.image}
                alt={section.imageAlt ?? ''}
                width={707}
                height={477}
                sizes="(max-width: 1100px) 100vw, min(707px, 50vw)"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
