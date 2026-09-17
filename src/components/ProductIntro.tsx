import { useRef } from 'react'
import type { ProductContent } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductIntroProps = {
  product: ProductContent
}

export function ProductIntro({ product }: ProductIntroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useProductScrollReveal(sectionRef, {
    items: '.product-intro__eyebrow, .product-intro__heading, .product-intro__copy p',
  })

  return (
    <section
      className="product-intro"
      id="product-intro"
      ref={sectionRef}
      aria-labelledby="product-intro-heading"
    >
      <div className="product-intro__inner">
        <p className="product-intro__eyebrow">{product.introEyebrow}</p>
        <h2 className="product-intro__heading" id="product-intro-heading">
          {product.introHeading}
        </h2>
        {product.description.length > 0 ? (
          <div className="product-intro__copy">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
