import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ProductContent } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

type ProductMediaProps = {
  product: ProductContent
}

type ChromeInsets = {
  top: number
  bottom: number
  band: number
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isCompactViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

function readCssPx(el: Element, prop: string, fallback: number) {
  const raw = getComputedStyle(el).getPropertyValue(prop).trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

/** Top (header + subtabs) and bottom (floating pills) chrome around the video stack. */
function getChromeInsets(options?: { forceDockReserve?: boolean }): ChromeInsets {
  const header = document.querySelector('.hero__header')
  let top =
    header instanceof HTMLElement
      ? Math.round(header.getBoundingClientRect().height)
      : window.matchMedia('(max-width: 1100px)').matches
        ? 80
        : 100

  const subtabs = document.querySelector('.product-subtabs')
  if (subtabs instanceof HTMLElement) {
    top += Math.round(subtabs.getBoundingClientRect().height)
  }

  let bottom = 0
  const dock = document.querySelector('.hero__pills-dock')
  if (dock instanceof HTMLElement && getComputedStyle(dock).display !== 'none') {
    const dockHidden = dock.classList.contains('hero__pills-dock--hidden')
    // Pin distance must stay stable when the dock hides over the footer.
    if (options?.forceDockReserve || !dockHidden) {
      const dockHeight = Math.max(Math.round(dock.getBoundingClientRect().height), 58)
      const dockBottom = readCssPx(document.documentElement, '--floating-dock-bottom', 40)
      bottom = dockHeight + Math.round(dockBottom)
    }
  }

  const band = Math.max(window.innerHeight - top - bottom, 280)
  return { top, bottom, band }
}

function applyChromeVars(root: HTMLElement, chrome: ChromeInsets) {
  root.style.setProperty('--product-chrome-top', `${chrome.top}px`)
  root.style.setProperty('--product-chrome-bottom', `${chrome.bottom}px`)
  root.style.setProperty('--product-chrome-height', `${chrome.top}px`)
  root.style.setProperty('--product-media-band', `${chrome.band}px`)
}

export function ProductMedia({ product }: ProductMediaProps) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)
  const isImage = product.mediaType === 'image'

  // Pin in the band between sticky chrome and floating pills; expand to fill that stack.
  useLayoutEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const frame = frameRef.current
    const media = mediaRef.current
    if (!root || !stage || !frame || !media) return

    const ctx = gsap.context(() => {
      const syncViewport = () => {
        const chrome = getChromeInsets()
        applyChromeVars(root, chrome)
        return chrome
      }

      if (prefersReducedMotion()) {
        const chrome = syncViewport()
        gsap.set([frame, media, stage], { clearProps: 'all' })
        gsap.set(frame, {
          width: '100%',
          height: chrome.band,
          borderRadius: 0,
        })
        return
      }

      const compact = isCompactViewport()
      const startRadius = compact ? '16px' : '24px'

      const measurePort = () => {
        const chrome = syncViewport()
        const width = stage.clientWidth || window.innerWidth
        const height = chrome.band
        // Slightly inset start so one scroll attaches flush to the port
        const inset = compact ? 0.92 : 0.9
        return {
          chrome,
          portW: width,
          portH: height,
          startW: width * inset,
          startH: height * inset,
        }
      }

      const port = measurePort()

      gsap.set(stage, { paddingTop: 0 })
      gsap.set(frame, {
        width: port.startW,
        height: port.startH,
        borderRadius: startRadius,
        scale: 1,
        opacity: 1,
      })
      gsap.set(media, { clearProps: 'transform', scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: () => `top ${getChromeInsets({ forceDockReserve: true }).top}px`,
          // One viewport of scroll: attach to port, then release.
          // Always reserve dock space so pin-spacer height never jumps when
          // floating pills hide over the footer.
          end: () => `+=${Math.round(getChromeInsets({ forceDockReserve: true }).band)}`,
          scrub: compact ? 0.35 : 0.4,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const next = measurePort()
            if (tl.progress() < 0.2) {
              gsap.set(frame, {
                width: next.startW,
                height: next.startH,
              })
            }
          },
        },
      })

      // Single motion: attach frame to the full video port
      tl.to(
        frame,
        {
          width: () => stage.clientWidth || window.innerWidth,
          height: () => getChromeInsets().band,
          borderRadius: '0px',
          duration: 0.7,
          ease: 'none',
        },
        0,
      )

      // Brief hold while attached, then pin ends
      tl.to({}, { duration: 0.3 })
    }, rootRef)

    applyChromeVars(root, getChromeInsets())
    requestAnimationFrame(() => ScrollTrigger.refresh())

    const onResize = () => {
      applyChromeVars(root, getChromeInsets())
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    // Pills dock show/hide changes bottom chrome CSS vars for the live band.
    // Do NOT ScrollTrigger.refresh() here: refreshing after the pin has released
    // rewrites pin-spacer height (band grows when pills hide), which jumps the
    // document and causes the enquiry→footer scroll glitch.
    const dock = document.querySelector('.hero__pills-dock')
    const mo =
      dock instanceof HTMLElement
        ? new MutationObserver(() => {
            applyChromeVars(root, getChromeInsets())
          })
        : null
    if (dock instanceof HTMLElement && mo) {
      mo.observe(dock, { attributes: true, attributeFilter: ['class', 'style'] })
    }

    return () => {
      window.removeEventListener('resize', onResize)
      mo?.disconnect()
      ctx.revert()
    }
  }, [product.slug, isImage])

  useLayoutEffect(() => {
    if (isImage) return

    const video = mediaRef.current
    const root = rootRef.current
    if (!(video instanceof HTMLVideoElement) || !root) return
    if (prefersReducedMotion()) return

    let inView = false
    let audioUnlocked = false

    const playInView = () => {
      if (!inView) return
      video.muted = false
      void video.play().catch(() => {
        // Autoplay with sound blocked until a user gesture.
        video.muted = true
        void video.play().catch(() => {})
      })
    }

    const stopOutOfView = () => {
      video.muted = true
      video.pause()
    }

    const unlockAudio = () => {
      audioUnlocked = true
      if (inView) {
        video.muted = false
        void video.play().catch(() => {})
      }
    }

    window.addEventListener('pointerdown', unlockAudio)
    window.addEventListener('keydown', unlockAudio)

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) {
          if (audioUnlocked) {
            video.muted = false
            void video.play().catch(() => {})
          } else {
            playInView()
          }
        } else {
          stopOutOfView()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(root)
    return () => {
      observer.disconnect()
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      stopOutOfView()
    }
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
              {...(product.videoPoster ? { poster: product.videoPoster } : {})}
              muted
              loop
              playsInline
              preload={product.videoPoster ? 'metadata' : 'auto'}
              disablePictureInPicture
              aria-label={`${product.label} preview video`}
            />
          )}
        </div>
      </div>
    </section>
  )
}
