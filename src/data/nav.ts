export const NAV_ITEMS = [
  { label: 'About Us', to: '/', hash: 'about', match: '/' },
  { label: 'AI assistant', to: '/share-graph', match: '/share-graph' },
  {
    label: 'IR solutions',
    to: '/interactive-analysis-tool',
    match: '/interactive-analysis-tool',
  },
  {
    label: 'ESG solutions',
    to: '/artificial-intelligence',
    match: '/artificial-intelligence',
  },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
