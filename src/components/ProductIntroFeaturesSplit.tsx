import { useRef } from 'react'
import type { ProductContent, ProductFeaturesSection } from '../data/products'
import { ProductIntro } from './ProductIntro'
import { ProductFeatures } from './ProductFeatures'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductIntroFeaturesSplitProps = {
  product: ProductContent
  featuresSection?: ProductFeaturesSection
  introSectionId?: string
  introHeadingId?: string
  featuresHeadingId?: string
  /** Optional overrides for the intro column */
  introEyebrow?: string
  introHeading?: string
  introDescription?: string[]
}

/**
 * Split-studio composition: intro copy (left) + feature cards (right)
 * in one full-bleed band — used on AI Assistant and similar panels.
 */
export function ProductIntroFeaturesSplit({
  product,
  featuresSection,
  introSectionId = 'product-intro',
  introHeadingId = 'product-intro-heading',
  featuresHeadingId = 'product-features-heading',
  introEyebrow,
  introHeading,
  introDescription,
}: ProductIntroFeaturesSplitProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useProductScrollReveal(sectionRef, {
    items:
      '.product-intro__eyebrow, .product-intro__heading, .product-intro__copy p, .product-features__heading, .product-features__card',
  })

  return (
    <section
      className="product-split"
      ref={sectionRef}
      aria-label={`${product.label} overview`}
    >
      <div className="product-split__inner">
        <aside className="product-split__intro">
          <div className="product-split__intro-rail" aria-hidden="true" />
          <ProductIntro
            product={product}
            eyebrow={introEyebrow}
            heading={introHeading}
            description={introDescription}
            sectionId={introSectionId}
            headingId={introHeadingId}
            embedded
          />
        </aside>
        <div className="product-split__features">
          <ProductFeatures
            product={product}
            section={featuresSection}
            headingId={featuresHeadingId}
            embedded
          />
        </div>
      </div>
    </section>
  )
}
