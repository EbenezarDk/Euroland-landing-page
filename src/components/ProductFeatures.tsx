import { useRef } from 'react'
import type { ProductContent } from '../data/products'
import { useProductScrollReveal } from '../hooks/useProductScrollReveal'

type ProductFeaturesProps = {
  product: ProductContent
}

export function ProductFeatures({ product }: ProductFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useProductScrollReveal(sectionRef, {
    header: '.product-features__heading',
    items: '.product-features__card',
  })

  if (!product.featuresHeading || !product.features?.length) {
    return null
  }

  return (
    <section
      className="product-features"
      ref={sectionRef}
      aria-labelledby="product-features-heading"
    >
      <div className="product-features__inner">
        <header className="product-features__header">
          <h2 className="product-features__heading" id="product-features-heading">
            {product.featuresHeading}
          </h2>
        </header>

        <ul className="product-features__grid">
          {product.features.map((feature) => (
            <li key={feature.title} className="product-features__card">
              <div className="product-features__icon" aria-hidden>
                <img
                  src={feature.icon}
                  alt=""
                  width={88}
                  height={88}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <h3 className="product-features__title">{feature.title}</h3>
              <p className="product-features__text">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
