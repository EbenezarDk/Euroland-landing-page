export const NAV_ITEMS = [
  { label: 'About Us', to: '/', hash: 'hero', match: '/' },
  { label: 'Share Graph', to: '/share-graph', match: '/share-graph' },
  {
    label: 'Interactive Analysis Tool',
    to: '/interactive-analysis-tool',
    match: '/interactive-analysis-tool',
  },
  {
    label: 'Artificial Intelligence',
    to: '/artificial-intelligence',
    match: '/artificial-intelligence',
  },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
