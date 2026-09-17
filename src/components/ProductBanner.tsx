import type { ProductContent } from '../data/products'
import { TextAnimate } from './TextAnimate'

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
        <TextAnimate
          as="h1"
          className="hero__subtitle"
          animation="fadeIn"
          by="line"
          startOnView={false}
          once
          accessible={false}
          duration={0.4}
        >
          {product.subtitle}
        </TextAnimate>

        <a className="hero__cta" href="#enquiry" data-hero="cta">
          Let's Talk
          <img src="/assets/arrow-white.svg" alt="" width={15} height={13} aria-hidden />
        </a>
      </div>
    </section>
  )
}
