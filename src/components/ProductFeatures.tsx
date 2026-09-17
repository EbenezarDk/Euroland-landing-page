import { useRef } from 'react'
import type { ProductContent, ProductFeaturesSection } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductFeaturesProps = {
  product: ProductContent
  section?: ProductFeaturesSection
  headingId?: string
}

export function ProductFeatures({
  product,
  section,
  headingId = 'product-features-heading',
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

  useProductScrollReveal(sectionRef, {
    items: `.product-features__heading, .product-features__title-block, .product-features__label, .product-features__card`,
  })

  if (!resolved?.features.length) {
    return null
  }

  const hasTitle = Boolean(resolved.title)

  return (
    <section
      className={`product-features${hasTitle ? ' product-features--stacked' : ''}`}
      ref={sectionRef}
      aria-labelledby={headingId}
    >
      <div className="product-features__inner">
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

        <div className="product-features__body">
          {resolved.featuresLabel ? (
            <p className="product-features__label">{resolved.featuresLabel}</p>
          ) : null}
          <ul
            className={`product-features__grid product-features__grid--${resolved.features.length}`}
          >
            {resolved.features.map((feature) => (
              <li key={feature.title} className="product-features__card">
                <h3 className="product-features__title">{feature.title}</h3>
                <p className="product-features__text">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
