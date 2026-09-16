import type { ProductContent } from '../data/products'
import { KineticTextAnimate } from './KineticTextAnimate'

type ProductBannerProps = {
  product: ProductContent
}

export function ProductBanner({ product }: ProductBannerProps) {
  return (
    <section className="hero product-banner" aria-label={`${product.label} banner`}>
      <div className="hero__bg" aria-hidden>
        <img
          className="hero__video"
          src="/assets/50.png"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero__veil" aria-hidden />
      <div className="hero__text-overlay" aria-hidden style={{ opacity: 0.5 }} />

      <div className="hero__content product-banner__content">
        <p className="product-banner__eyebrow">{product.eyebrow}</p>
        <KineticTextAnimate
          as="h1"
          className="hero__title"
          text={"TELL YOUR\nEQUITY STORY"}
          startOnView={false}
          once
          accessible={false}
          duration={0.525}
        />
        <KineticTextAnimate
          as="p"
          className="hero__subtitle hero__subtitle--desktop"
          text={product.subtitle}
          startOnView={false}
          once
          accessible={false}
          duration={0.425}
          delay={0.06}
        />
        <p className="hero__subtitle hero__subtitle--mobile" aria-hidden>
          ENGAGE INVESTORS
        </p>
        <p className="product-banner__cta">
          <a
            href="#product-details"
            onClick={() => {
              // Re-sample sticky chrome after the hash scroll settles
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  window.dispatchEvent(new Event('scroll'))
                })
              })
            }}
          >
            Know more about {product.label}
          </a>
        </p>
      </div>
    </section>
  )
}
