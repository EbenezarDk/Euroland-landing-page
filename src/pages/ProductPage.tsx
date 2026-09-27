import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  PRODUCTS,
  type ProductContent,
  type ProductSlug,
  type ProductTabSection,
} from '../data/products'
import { SiteHeader } from '../components/SiteHeader'
import { FloatingPills } from '../components/FloatingPills'
import { ProductBanner } from '../components/ProductBanner'
import { ProductIntro } from '../components/ProductIntro'
import { ProductFeatures } from '../components/ProductFeatures'
import { ProductLiveExamples } from '../components/ProductLiveExamples'
import { ProductExplained } from '../components/ProductExplained'
import { ProductMedia } from '../components/ProductMedia'
import { ProductSubTabs } from '../components/ProductSubTabs'
import { Enquiry } from '../components/Enquiry'
import { Footer } from '../components/Footer'
import { useStickyChrome } from '../hooks/useStickyChrome'

const SLUGS = Object.keys(PRODUCTS) as ProductSlug[]

const AI_SUB_TABS = [
  { id: 'ai-assistant', label: 'AI Assistant' },
  { id: 'podcast-series', label: 'AI-Powered Podcast Series' },
] as const

type AiSubTabId = (typeof AI_SUB_TABS)[number]['id']

function isProductSlug(value: string | undefined): value is ProductSlug {
  return !!value && SLUGS.includes(value as ProductSlug)
}

function isAiSubTabId(value: string): value is AiSubTabId {
  return AI_SUB_TABS.some((tab) => tab.id === value)
}

function readAiTabFromHash(): AiSubTabId {
  const hash = window.location.hash.replace(/^#/, '')
  return isAiSubTabId(hash) ? hash : 'ai-assistant'
}

function readProductTabFromHash(tabs: readonly ProductTabSection[]): string {
  const hash = window.location.hash.replace(/^#/, '')
  return tabs.some((tab) => tab.id === hash) ? hash : tabs[0]!.id
}

function ProductPageLead({
  product,
  mediaKey,
}: {
  product: ProductContent
  mediaKey: string
}) {
  const lead = product.pageIntro
  return (
    <>
      <ProductIntro
        product={product}
        variant="page"
        eyebrow={lead?.eyebrow ?? product.introEyebrow}
        heading=""
        description={lead?.description ?? product.description}
        sectionId={`product-page-lead-${mediaKey}`}
        headingId={`product-page-lead-heading-${mediaKey}`}
      />
      <ProductMedia key={mediaKey} product={product} />
    </>
  )
}

function ProductDetailBand({ children }: { children: ReactNode }) {
  return <div className="product-detail-band">{children}</div>
}

function ProductFollowBand({
  children,
  tone = 'white',
}: {
  children: ReactNode
  tone?: 'white' | 'gray'
}) {
  return (
    <div
      className={`product-follow-band${
        tone === 'gray' ? ' product-follow-band--gray' : ''
      }`}
    >
      {children}
    </div>
  )
}

function renderTabDetail(product: ProductContent, tab: ProductTabSection) {
  const hasPanel =
    Boolean(tab.introEyebrow) ||
    Boolean(tab.introHeading) ||
    Boolean(tab.description?.length)

  const panelDescription = [
    ...(tab.introHeading ? [tab.introHeading] : []),
    ...(tab.description ?? []),
  ]

  return (
    <>
      <ProductDetailBand>
        {hasPanel ? (
          <ProductIntro
            product={product}
            variant="panel"
            eyebrow={tab.introEyebrow}
            heading=""
            description={panelDescription}
            sectionId={`product-intro-${tab.id}`}
            headingId={`product-intro-heading-${tab.id}`}
          />
        ) : null}
        {tab.featuresSection ? (
          <ProductFeatures
            product={product}
            section={tab.featuresSection}
            headingId={`product-features-heading-${tab.id}`}
            hideHeader
            layout={
              tab.featuresSection.features.every((f) => !f.description)
                ? 'titleOnly'
                : 'default'
            }
          />
        ) : null}
        {tab.liveExamples?.length ? (
          <ProductLiveExamples
            product={product}
            headingId={`product-live-examples-heading-${tab.id}`}
            logos={tab.liveExamples}
            static
          />
        ) : null}
      </ProductDetailBand>

      {tab.blocks?.map((block, blockIndex) => {
        const blockKey = `${tab.id}-block-${blockIndex}`
        const tone = blockIndex % 2 === 0 ? 'white' : 'gray'
        return (
          <ProductFollowBand key={blockKey} tone={tone}>
            {block.introHeading ||
            block.introEyebrow ||
            block.description?.length ? (
              <ProductIntro
                product={product}
                variant={block.eyebrowAsFeatures ? 'card' : 'panel'}
                eyebrow={block.introEyebrow}
                heading={block.introHeading ?? ''}
                headingAsLiveExamples={block.headingAsLiveExamples}
                description={block.description ?? []}
                sectionId={`product-intro-${blockKey}`}
                headingId={`product-intro-heading-${blockKey}`}
              />
            ) : null}
            {block.featuresSection ? (
              <ProductFeatures
                product={product}
                section={block.featuresSection}
                headingId={`product-features-heading-${blockKey}`}
                hideHeader
              />
            ) : null}
            {block.liveExamples?.length ? (
              <ProductLiveExamples
                product={product}
                headingId={`product-live-examples-heading-${blockKey}`}
                logos={block.liveExamples}
                static
              />
            ) : null}
          </ProductFollowBand>
        )
      })}
    </>
  )
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
  const [aiTab, setAiTab] = useState<AiSubTabId>(() =>
    typeof window !== 'undefined' ? readAiTabFromHash() : 'ai-assistant',
  )
  const [productTab, setProductTab] = useState<string>('')

  const product = isProductSlug(slug) ? PRODUCTS[slug] : null
  const productTabs = product?.tabs
  const hasProductTabs = Boolean(productTabs?.length)
  const hasAiSubTabs =
    slug === 'share-graph' && Boolean(product?.secondaryFeatures)
  const hasSubTabs = hasAiSubTabs || hasProductTabs

  useEffect(() => {
    if (!productTabs?.length) {
      setProductTab('')
      return
    }
    setProductTab(readProductTabFromHash(productTabs))
  }, [slug, productTabs])

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#/, '')
      if (slug === 'share-graph' && isAiSubTabId(hash)) {
        setAiTab(hash)
        window.dispatchEvent(new Event('scroll'))
        return
      }
      if (productTabs?.some((tab) => tab.id === hash)) {
        setProductTab(hash)
        window.dispatchEvent(new Event('scroll'))
        return
      }
      const target = document.querySelector(window.location.hash)
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        window.dispatchEvent(new Event('scroll'))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug, productTabs])

  useEffect(() => {
    if (slug !== 'share-graph' && !hasProductTabs) return

    const onHashChange = () => {
      if (slug === 'share-graph') {
        setAiTab(readAiTabFromHash())
        return
      }
      if (productTabs?.length) {
        setProductTab(readProductTabFromHash(productTabs))
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [slug, hasProductTabs, productTabs])

  useEffect(() => {
    if (!hasSubTabs) return
    let cancelled = false
    void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      if (!cancelled) {
        requestAnimationFrame(() => ScrollTrigger.refresh())
      }
    })
    return () => {
      cancelled = true
    }
  }, [aiTab, productTab, hasSubTabs])

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

  const handleAiTabChange = (id: AiSubTabId) => {
    setAiTab(id)
    const nextHash = `#${id}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`)
    }
  }

  const handleProductTabChange = (id: string) => {
    setProductTab(id)
    const nextHash = `#${id}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${nextHash}`)
    }
  }

  const activeProductTab =
    productTab || (productTabs?.length ? productTabs[0]!.id : '')

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

      {hasAiSubTabs ? (
        <ProductSubTabs
          tabs={AI_SUB_TABS}
          activeTab={aiTab}
          onChange={handleAiTabChange}
          ariaLabel="Purpose-Built AI for IR sections"
        />
      ) : null}

      {hasProductTabs && productTabs ? (
        <ProductSubTabs
          tabs={productTabs}
          activeTab={activeProductTab}
          onChange={handleProductTabChange}
          ariaLabel={`${product.label} sections`}
        />
      ) : null}

      <section
        id="product-details"
        ref={introRef}
        className={`product-page__body${hasSubTabs ? ' product-page__body--with-subtabs' : ''}`}
      >
        {hasAiSubTabs ? (
          <>
            <div
              role="tabpanel"
              id="product-panel-ai-assistant"
              aria-labelledby="product-tab-ai-assistant"
              className="product-page__panel"
              hidden={aiTab !== 'ai-assistant'}
              tabIndex={aiTab === 'ai-assistant' ? 0 : -1}
            >
              <ProductPageLead product={product} mediaKey={`${product.slug}-ai`} />
              <ProductDetailBand>
                <ProductIntro
                  product={product}
                  variant="panel"
                  eyebrow={product.introEyebrow}
                  heading=""
                  description={product.description}
                  sectionId="product-intro-ai-assistant"
                  headingId="product-intro-heading-ai-assistant"
                />
                <ProductFeatures
                  product={product}
                  hideHeader
                  headingId="product-features-heading"
                />
                <ProductLiveExamples product={product} static />
              </ProductDetailBand>
            </div>

            <div
              role="tabpanel"
              id="product-panel-podcast-series"
              aria-labelledby="product-tab-podcast-series"
              className="product-page__panel"
              hidden={aiTab !== 'podcast-series'}
              tabIndex={aiTab === 'podcast-series' ? 0 : -1}
            >
              <ProductPageLead
                product={product}
                mediaKey={`${product.slug}-podcast`}
              />
              {product.secondaryFeatures ? (
                <ProductDetailBand>
                  <ProductIntro
                    product={product}
                    variant="panel"
                    eyebrow={product.secondaryFeatures.heading}
                    heading=""
                    description={
                      product.secondaryFeatures.title
                        ? [product.secondaryFeatures.title]
                        : product.secondaryFeatures.description
                          ? [product.secondaryFeatures.description]
                          : []
                    }
                    sectionId="product-intro-podcast-series"
                    headingId="product-intro-heading-podcast-series"
                  />
                  <ProductFeatures
                    product={product}
                    section={{
                      heading: product.secondaryFeatures.heading,
                      features: product.secondaryFeatures.features,
                    }}
                    headingId="product-secondary-features-heading"
                    hideHeader
                    layout="podcast"
                  />
                  {product.secondaryLiveExamples?.length ? (
                    <ProductLiveExamples
                      product={product}
                      headingId="product-secondary-live-examples-heading"
                      logos={product.secondaryLiveExamples}
                      static
                    />
                  ) : null}
                </ProductDetailBand>
              ) : null}
            </div>
          </>
        ) : hasProductTabs && productTabs ? (
          productTabs.map((tab) => {
            const selected = activeProductTab === tab.id
            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`product-panel-${tab.id}`}
                aria-labelledby={`product-tab-${tab.id}`}
                className="product-page__panel"
                hidden={!selected}
                tabIndex={selected ? 0 : -1}
              >
                <ProductPageLead
                  product={product}
                  mediaKey={`${product.slug}-${tab.id}`}
                />
                {tab.explained ? (
                  <ProductExplained
                    product={product}
                    section={tab.explained}
                    headingId={`product-explained-heading-${tab.id}`}
                  />
                ) : null}
                {renderTabDetail(product, tab)}
              </div>
            )
          })
        ) : product.blocks?.length ? (
          product.blocks.map((block, blockIndex) => {
            const blockKey = `${product.slug}-block-${blockIndex}`
            return (
              <div key={blockKey} className="product-tab-block">
                {block.introHeading ||
                block.introEyebrow ||
                block.description?.length ? (
                  <ProductIntro
                    product={product}
                    eyebrow={block.introEyebrow ?? ''}
                    eyebrowAsFeatures={block.eyebrowAsFeatures}
                    heading={block.introHeading ?? ''}
                    headingAsLiveExamples={block.headingAsLiveExamples}
                    description={block.description ?? []}
                    sectionId={`product-intro-${blockKey}`}
                    headingId={`product-intro-heading-${blockKey}`}
                  />
                ) : null}
                {block.featuresSection ? (
                  <ProductFeatures
                    product={product}
                    section={block.featuresSection}
                    headingId={`product-features-heading-${blockKey}`}
                  />
                ) : null}
                {block.liveExamples?.length ? (
                  <ProductLiveExamples
                    product={product}
                    headingId={`product-live-examples-heading-${blockKey}`}
                    logos={block.liveExamples}
                    static
                  />
                ) : null}
              </div>
            )
          })
        ) : (
          <>
            <ProductPageLead product={product} mediaKey={product.slug} />
            <ProductDetailBand>
              <ProductFeatures product={product} hideHeader />
              <ProductLiveExamples product={product} />
            </ProductDetailBand>
          </>
        )}
      </section>

      <ProductExplained product={product} />

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
