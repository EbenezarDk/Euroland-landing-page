import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'

export type ProductSubTab = {
  id: string
  label: string
}

type ProductSubTabsProps<T extends string> = {
  tabs: readonly ProductSubTab[]
  activeTab: T
  onChange: (id: T) => void
  ariaLabel?: string
}

const HEADER_FALLBACK = 100

function readHeaderOffset() {
  const header = document.querySelector('.hero__header')
  if (header instanceof HTMLElement) {
    return Math.round(header.getBoundingClientRect().height) || HEADER_FALLBACK
  }
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--product-chrome-height')
    .trim()
  // Variable lives on .product-page — fall back to measuring that node
  const page = document.querySelector('.product-page')
  if (page instanceof HTMLElement) {
    const fromPage = getComputedStyle(page)
      .getPropertyValue('--product-chrome-height')
      .trim()
    const n = parseFloat(fromPage)
    if (n) return n
  }
  return parseFloat(raw) || HEADER_FALLBACK
}

export function ProductSubTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = 'Product sections',
}: ProductSubTabsProps<T>) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const tablistRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [headerOffset, setHeaderOffset] = useState(HEADER_FALLBACK)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const measure = () => {
      setNavHeight(nav.getBoundingClientRect().height)
      setHeaderOffset(readHeaderOffset())
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(nav)
    const header = document.querySelector('.hero__header')
    if (header instanceof HTMLElement) ro.observe(header)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor) return

    const onScroll = () => {
      const top = anchor.getBoundingClientRect().top
      setIsStuck(top <= headerOffset + 0.5)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [headerOffset])

  useEffect(() => {
    const activeBtn = tablistRef.current?.querySelector<HTMLElement>(
      '.product-subtabs__trigger.is-active',
    )
    activeBtn?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeTab])

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index
    const lastIndex = tabs.length - 1

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = index === lastIndex ? 0 : index + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = index === 0 ? lastIndex : index - 1
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = lastIndex
        break
      default:
        return
    }

    const buttons =
      tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    const next = buttons?.[nextIndex]
    next?.focus()
    const tab = tabs[nextIndex]
    if (tab) onChange(tab.id as T)
  }

  return (
    <div
      className="product-subtabs-anchor"
      ref={anchorRef}
      style={isStuck && navHeight ? { height: navHeight } : undefined}
    >
      <nav
        ref={navRef}
        className={`product-subtabs${isStuck ? ' product-subtabs--stuck' : ''}`}
        style={
          isStuck
            ? ({ top: headerOffset } as CSSProperties)
            : undefined
        }
        aria-label={ariaLabel}
      >
        <div className="product-subtabs__inner">
          <div
            ref={tablistRef}
            className={`product-subtabs__list${tabs.length > 3 ? ' product-subtabs__list--many' : ''}`}
            role="tablist"
            aria-label={ariaLabel}
          >
            {tabs.map((tab, index) => {
              const selected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`product-tab-${tab.id}`}
                  className={`product-subtabs__trigger${selected ? ' is-active' : ''}`}
                  aria-selected={selected}
                  aria-controls={`product-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => onChange(tab.id as T)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className="product-subtabs__label">{tab.label}</span>
                  <span className="product-subtabs__indicator" aria-hidden />
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
