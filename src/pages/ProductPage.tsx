import { useEffect, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { PRODUCTS, type ProductSlug } from '../data/products'
import { SiteHeader } from '../components/SiteHeader'
import { FloatingPills } from '../components/FloatingPills'
import { ProductBanner } from '../components/ProductBanner'
import { ProductIntro } from '../components/ProductIntro'
import { ProductFeatures } from '../components/ProductFeatures'
import { ProductExplained } from '../components/ProductExplained'
import { Faq } from '../components/Faq'
import { Enquiry } from '../components/Enquiry'
import { Footer } from '../components/Footer'
import { useStickyChrome } from '../hooks/useStickyChrome'

const SLUGS = Object.keys(PRODUCTS) as ProductSlug[]

function isProductSlug(value: string | undefined): value is ProductSlug {
  return !!value && SLUGS.includes(value as ProductSlug)
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

  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        // Ensure sticky chrome re-samples after programmatic scroll
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

  if (!isProductSlug(slug)) {
    return <Navigate to="/" replace />
  }

  const product = PRODUCTS[slug]

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
        <ProductIntro product={product} />
        <ProductFeatures product={product} />
        <ProductExplained product={product} />
      </section>

      <Faq />

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
