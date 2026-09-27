import { useRef } from 'react'
import type { ProductContent, ProductFeaturesSection } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductFeaturesProps = {
  product: ProductContent
  section?: ProductFeaturesSection
  headingId?: string
  /** Render as a div for nesting inside a parent section */
  embedded?: boolean
  /** Hide the Features header — Figma detail bands use navy intro instead */
  hideHeader?: boolean
  /** podcast = 1 full-width + 2-col row; titleOnly = title cards without body */
  layout?: 'default' | 'podcast' | 'titleOnly'
}

const CARD_ACCENTS = ['cyan', 'cta', 'navy'] as const

export function ProductFeatures({
  product,
  section,
  headingId = 'product-features-heading',
  embedded = false,
  hideHeader = false,
  layout = 'default',
}: ProductFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const resolved: ProductFeaturesSection | null = section
    ? section
    : product.featuresHeading && product.features?.length
      ? {
          heading: product.featuresHeading,
          features: product.features,
        }
      : null

  useProductScrollReveal(embedded ? { current: null } : sectionRef, {
    items: `.product-features__heading, .product-features__title-block, .product-features__label, .product-features__card`,
  })

  if (!resolved?.features.length) {
    return null
  }

  const hasTitle = Boolean(resolved.title)
  const showHeader = !hideHeader
  const count = resolved.features.length
  const gridClass = [
    'product-features__grid',
    layout === 'podcast'
      ? 'product-features__grid--podcast'
      : layout === 'titleOnly'
        ? `product-features__grid--title-only product-features__grid--${count}`
        : `product-features__grid--${count}`,
  ].join(' ')

  const inner = (
    <div className="product-features__inner">
      {showHeader ? (
        <header className="product-features__header">
          <p className="product-features__heading">{resolved.heading}</p>
          {hasTitle ? (
            <h2 className="product-features__title-block" id={headingId}>
              {resolved.title}
            </h2>
          ) : (
            <h2
              className="product-features__title-block product-features__title-block--sr"
              id={headingId}
            >
              {resolved.heading}
            </h2>
          )}
          {resolved.description ? (
            <p className="product-features__lead">{resolved.description}</p>
          ) : null}
        </header>
      ) : (
        <h2
          className="product-features__title-block product-features__title-block--sr"
          id={headingId}
        >
          {resolved.heading || 'Features'}
        </h2>
      )}

      <div className="product-features__body">
        {resolved.featuresLabel && showHeader ? (
          <p className="product-features__label">{resolved.featuresLabel}</p>
        ) : null}
        <ul className={gridClass}>
          {resolved.features.map((feature, index) => {
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
            return (
              <li
                key={feature.title}
                className={`product-features__card product-features__card--${accent}${
                  layout === 'titleOnly' ? ' product-features__card--title-only' : ''
                }`}
              >
                <h3 className="product-features__title">{feature.title}</h3>
                {feature.description ? (
                  <p className="product-features__text">{feature.description}</p>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )

  const sectionClass = [
    'product-features',
    hasTitle && showHeader ? 'product-features--stacked' : '',
    hideHeader ? 'product-features--bare' : '',
    embedded ? 'product-features--embedded' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (embedded) {
    return (
      <div className={sectionClass} aria-labelledby={headingId}>
        {inner}
      </div>
    )
  }

  return (
    <section className={sectionClass} ref={sectionRef} aria-labelledby={headingId}>
      {inner}
    </section>
  )
}
