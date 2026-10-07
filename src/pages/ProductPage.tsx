import { useEffect, useRef, type ReactNode } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { PRODUCTS, type ProductSlug } from '../data/products'
import { SiteHeader } from '../components/SiteHeader'
import { FloatingPills } from '../components/FloatingPills'
import { ProductBanner } from '../components/ProductBanner'
import { ProductIntro } from '../components/ProductIntro'
import { ProductFeatures } from '../components/ProductFeatures'
import { ProductLiveExamples } from '../components/ProductLiveExamples'
import { ProductExplained } from '../components/ProductExplained'
import { Faq } from '../components/Faq'
import { Enquiry } from '../components/Enquiry'
import { Footer } from '../components/Footer'
import { useStickyChrome } from '../hooks/useStickyChrome'
import { FAQS, PRODUCT_FAQS } from '../data/faqs'

const SLUGS = Object.keys(PRODUCTS) as ProductSlug[]

function isProductSlug(value: string | undefined): value is ProductSlug {
  return !!value && SLUGS.includes(value as ProductSlug)
}

function ProductDetailBand({ children }: { children: ReactNode }) {
  return <div className="product-detail-band">{children}</div>
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const headerRef = useRef<HTMLElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const enquiryRef = useRef<HTMLElement>(null)
  const enquiryFormRef = useRef<HTMLFormElement>(null)
  const enquiryWaveRef = useRef<HTMLImageElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const product = isProductSlug(slug) ? PRODUCTS[slug] : null

  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        window.dispatchEvent(new Event('scroll'))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  const { isLight, isPillsLight, isPillsHidden, isPastHero } = useStickyChrome({
    aboutRef: introRef,
    enquiryRef,
    footerRef,
    pillsRef,
    enabled: true,
  })

  if (!isProductSlug(slug) || !product) {
    return <Navigate to="/" replace />
  }

  const lead = product.pageIntro

  return (
    <main className="landing product-page">
      <SiteHeader
        headerRef={headerRef}
        isLight={isLight}
        homeHref="/"
        contactHref="#enquiry"
        activePath={product.path}
      />
      <FloatingPills
        pillsRef={pillsRef}
        isLight={isPillsLight}
        isHidden={isPillsHidden}
        isPastHero={isPastHero}
        activePath={product.path}
      />

      <ProductBanner product={product} />

      <section id="product-details" ref={introRef} className="product-page__body">
        <ProductIntro
          product={product}
          variant="page"
          eyebrow={lead?.eyebrow ?? product.introEyebrow}
          heading=""
          description={lead?.description ?? product.description}
          sectionId={`product-page-lead-${product.slug}`}
          headingId={`product-page-lead-heading-${product.slug}`}
        />

        <ProductDetailBand>
          {(product.pageIntroFollowUps ?? []).map((followUp, index) => (
            <ProductIntro
              key={`${product.slug}-follow-up-${index}`}
              product={product}
              variant="panel"
              eyebrow={followUp.eyebrow}
              heading=""
              description={followUp.description}
              sectionId={`product-page-lead-${product.slug}-follow-${index}`}
              headingId={`product-page-lead-heading-${product.slug}-follow-${index}`}
            />
          ))}
          {product.detailImage ? (
            <figure className="product-detail-media">
              <img
                src={product.detailImage}
                alt={product.detailImageAlt ?? `${product.label} preview`}
                loading="lazy"
              />
            </figure>
          ) : null}
          <ProductFeatures product={product} hideHeader />
          <ProductLiveExamples product={product} />
        </ProductDetailBand>
      </section>

      <ProductExplained product={product} />

      <Faq items={PRODUCT_FAQS[product.slug] ?? FAQS} />

      <Enquiry
        sectionRef={enquiryRef}
        formRef={enquiryFormRef}
        waveRef={enquiryWaveRef}
      />
      <Footer sectionRef={footerRef} />

      <p className="sr-only">
        <Link to="/">Return to Euroland IR home</Link>
      </p>
    </main>
  )
}
