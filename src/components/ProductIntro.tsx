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
  /** Optional line flush under the card title */
  lead?: string
  description?: string[]
  sectionId?: string
  headingId?: string
  /** Render as a div for nesting inside a parent section (split layout) */
  embedded?: boolean
  /**
   * page  — white lead (cyan 28 / body 14)
   * panel — navy detail box
   * card  — light feature card with cyan top rule
   */
  variant?: 'default' | 'page' | 'panel' | 'card'
}

export function ProductIntro({
  product,
  eyebrow,
  eyebrowAsFeatures = false,
  heading,
  headingAsLiveExamples = false,
  lead,
  description,
  sectionId = 'product-intro',
  headingId = 'product-intro-heading',
  embedded = false,
  variant = 'default',
}: ProductIntroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const introEyebrow = eyebrow ?? product.introEyebrow
  const introHeading = heading ?? product.introHeading
  const introDescription = description ?? product.description
  const hasLead = Boolean(introEyebrow || introHeading || lead)
  const resolvedVariant =
    variant === 'default' && eyebrowAsFeatures ? 'card' : variant

  useProductScrollReveal(embedded ? { current: null } : sectionRef, {
    items:
      '.product-intro__eyebrow, .product-features__heading, .product-intro__heading, .product-explained__live-heading, .product-intro__lead-line, .product-intro__copy p',
  })

  const className = [
    'product-intro',
    resolvedVariant !== 'default' ? `product-intro--${resolvedVariant}` : '',
    embedded ? 'product-intro--embedded' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <div className="product-intro__inner">
      {hasLead ? (
        <div className="product-intro__lead">
          {introEyebrow ? (
            <p
              className={
                resolvedVariant === 'card' || eyebrowAsFeatures
                  ? 'product-features__heading product-intro__card-title'
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
          {lead ? <p className="product-intro__lead-line">{lead}</p> : null}
        </div>
      ) : null}
      {introDescription.length > 0 ? (
        <div className="product-intro__copy">
          {introDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  )

  if (embedded) {
    return (
      <div
        className={className}
        id={sectionId}
        {...(introHeading
          ? { 'aria-labelledby': headingId }
          : { 'aria-label': introEyebrow })}
      >
        {inner}
      </div>
    )
  }

  return (
    <section
      className={className}
      id={sectionId}
      ref={sectionRef}
      {...(introHeading
        ? { 'aria-labelledby': headingId }
        : { 'aria-label': introEyebrow })}
    >
      {inner}
    </section>
  )
}
