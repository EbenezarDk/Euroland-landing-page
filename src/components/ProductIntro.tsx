import { useRef } from 'react'
import type { ProductContent } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductIntroProps = {
  product: ProductContent
  eyebrow?: string
  /** Features heading type (ink / 24 / 300) instead of cyan eyebrow */
  eyebrowAsFeatures?: boolean
  heading?: string
  /** Live examples typestyle (ink / 24 / 300) instead of body copy heading */
  headingAsLiveExamples?: boolean
  description?: string[]
  sectionId?: string
  headingId?: string
}

export function ProductIntro({
  product,
  eyebrow,
  eyebrowAsFeatures = false,
  heading,
  headingAsLiveExamples = false,
  description,
  sectionId = 'product-intro',
  headingId = 'product-intro-heading',
}: ProductIntroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const introEyebrow = eyebrow ?? product.introEyebrow
  const introHeading = heading ?? product.introHeading
  const introDescription = description ?? product.description

  useProductScrollReveal(sectionRef, {
    items:
      '.product-intro__eyebrow, .product-features__heading, .product-intro__heading, .product-explained__live-heading, .product-intro__copy p',
  })

  return (
    <section
      className="product-intro"
      id={sectionId}
      ref={sectionRef}
      {...(introHeading ? { 'aria-labelledby': headingId } : { 'aria-label': introEyebrow })}
    >
      <div className="product-intro__inner">
        {introEyebrow ? (
          <p
            className={
              eyebrowAsFeatures
                ? 'product-features__heading'
                : 'product-intro__eyebrow'
            }
          >
            {introEyebrow}
          </p>
        ) : null}
        {introHeading ? (
          <h2
            className={
              headingAsLiveExamples
                ? 'product-explained__live-heading'
                : 'product-intro__heading'
            }
            id={headingId}
          >
            {introHeading}
          </h2>
        ) : null}
        {introDescription.length > 0 ? (
          <div className="product-intro__copy">
            {introDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
