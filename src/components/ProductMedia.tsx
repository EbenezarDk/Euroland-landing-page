import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ProductContent } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

type ProductMediaProps = {
  product: ProductContent
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isCompactViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

/** Sticky header height — excluded from the product media "content viewport". */
function getChromeHeight() {
  const header = document.querySelector('.hero__header')
  if (header instanceof HTMLElement) {
    return Math.round(header.getBoundingClientRect().height)
  }
  return window.matchMedia('(max-width: 1100px)').matches ? 80 : 100
}

export function ProductMedia({ product }: ProductMediaProps) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  const isImage = product.mediaType === 'image'

  // Pin below the sticky header and expand into the content viewport
  // (full window minus header). Further scroll releases into Book a Service.
  useLayoutEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const frame = frameRef.current
    const media = mediaRef.current
    if (!root || !stage || !frame || !media) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([frame, media, stage], { clearProps: 'all' })
        return
      }

      const compact = isCompactViewport()
      const startRadius = compact ? '20px' : '32px'

      const syncViewport = () => {
        const chrome = getChromeHeight()
        root.style.setProperty('--product-chrome-height', `${chrome}px`)
        return chrome
      }

      const measureCard = () => {
        const chrome = syncViewport()
        const contentH = Math.max(window.innerHeight - chrome, 320)
        const sidePad = compact ? 32 : 80
        const stageWidth = Math.max(stage.clientWidth - sidePad * 2, 280)
        const targetWidth = Math.min(1240, stageWidth)
        const ratio = compact ? 4 / 3 : 16 / 9
        const maxHeight = compact ? contentH * 0.62 : Math.min(contentH * 0.78, 720)
        const height = Math.min(targetWidth / ratio, maxHeight)
        const width = height * ratio
        return { width, height, chrome, contentH }
      }

      const card = measureCard()

      gsap.set(stage, { paddingTop: 0 })
      gsap.set(frame, {
        width: card.width,
        height: card.height,
        borderRadius: startRadius,
        scale: 0.94,
        opacity: 0.85,
      })
      gsap.set(media, { clearProps: 'transform', scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: () => `top ${getChromeHeight()}px`,
          end: compact ? '+=160%' : '+=200%',
          scrub: compact ? 0.55 : 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const next = measureCard()
            if (tl.progress() < 0.2) {
              gsap.set(frame, { width: next.width, height: next.height })
            }
          },
        },
      })

      tl.to(
        frame,
        {
          scale: 1,
          opacity: 1,
          duration: 0.22,
          ease: 'none',
        },
        0,
      )

      tl.to(
        frame,
        {
          width: () => stage.clientWidth || window.innerWidth,
          height: () => {
            const chrome = getChromeHeight()
            return Math.max(window.innerHeight - chrome, stage.clientHeight)
          },
          borderRadius: '0px',
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'none',
        },
        0.22,
      )

      tl.to({}, { duration: 0.23 })
    }, rootRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [product.slug, isImage])

  useLayoutEffect(() => {
    if (isImage) return

    const video = mediaRef.current
    const root = rootRef.current
    if (!(video instanceof HTMLVideoElement) || !root) return
    if (prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [product.slug, isImage])

  return (
    <section className="product-media" aria-label={`${product.label} preview`} ref={rootRef}>
      <div className="product-media__stage" ref={stageRef}>
        <div className="product-media__frame" ref={frameRef}>
          {isImage ? (
            <img
              ref={mediaRef as RefObject<HTMLImageElement>}
              className="product-media__video"
              src={product.videoSrc}
              alt={`${product.label} preview`}
              width={1600}
              height={900}
              loading="lazy"
            />
          ) : (
            <video
              ref={mediaRef as RefObject<HTMLVideoElement>}
              className="product-media__video"
              src={product.videoSrc}
              poster={product.videoPoster}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-label={`${product.label} preview video`}
            />
          )}
        </div>
      </div>
    </section>
  )
}
