export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What does Euroland IR provide?',
    answer:
      'Euroland IR delivers best-practice investor relations tools and services - from share graphs and interactive analysis to AI-assisted experiences - so listed companies can engage investors with clarity and confidence.',
  },
  {
    id: '2',
    question: 'How long does implementation take?',
    answer:
      'Depending on the scope, implementation typically takes between 4-6 weeks. AI solutions are quick to integrate, requiring only a few lines of code to be embedded into the IR section.',
  },
  {
    id: '3',
    question: 'Can solutions be embedded on our existing IR website?',
    answer:
      'Yes. Our tools are designed to embed cleanly into your IR site or microsite, matching your brand while keeping market data live, secure, and easy for investors to explore.',
  },
  {
    id: '4',
    question: 'Is my data secure with Euroland IR?',
    answer:
      'Security is foundational. We follow bank-grade protocols across hosting, access, and operations to protect data integrity, privacy, and uptime for every client engagement.',
  },
  {
    id: '5',
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Absolutely. Every client gets a dedicated account manager plus 24/7 global service coverage, so your IR experience stays reliable long after go-live.',
  },
]
