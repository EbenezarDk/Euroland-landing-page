export type ProductSlug =
  | 'share-graph'
  | 'interactive-analysis-tool'
  | 'artificial-intelligence'

export type ProductFeature = {
  title: string
  /** Optional line flush under the title (e.g. product names list) */
  lead?: string
  description?: string
}

export type ProductFeaturesSection = {
  heading: string
  title?: string
  description?: string
  /** Optional cyan label shown directly above the feature cards */
  featuresLabel?: string
  features: ProductFeature[]
}

export type ProductPageIntro = {
  eyebrow: string
  description: string[]
}

export type ProductLiveExample = {
  src: string
  alt: string
  height?: number
  /** Optional external URL â€” logo/preview becomes a link */
  href?: string
  /** Full-width screenshot preview (e.g. Fact Sheet live example) */
  preview?: boolean
}

export type ProductExplained = {
  heading: string[]
  body: string[]
  image?: string
  imageAlt?: string
  /** Optional cyan label above the heading (e.g. Fact Sheet) */
  eyebrow?: string
  /** When set, image is shown inside a Safari browser frame */
  safariUrl?: string
  liveExamples?: ProductLiveExample[]
}

export type ProductTabBlock = {
  introEyebrow?: string
  /** When true, eyebrow uses Features heading type (ink / 24 / 300) */
  eyebrowAsFeatures?: boolean
  introHeading?: string
  /** When true, heading uses Live examples typestyle (ink / 24 / 300) */
  headingAsLiveExamples?: boolean
  /** Optional line flush under the card title (e.g. product names list) */
  lead?: string
  description?: string[]
  featuresSection?: ProductFeaturesSection
  liveExamples?: ProductLiveExample[]
}

export type ProductTabSection = {
  id: string
  label: string
  introEyebrow?: string
  introHeading?: string
  description?: string[]
  featuresSection?: ProductFeaturesSection
  liveExamples?: ProductLiveExample[]
  /** Optional explained-style block inside this tab (e.g. Fact Sheet + Safari) */
  explained?: ProductExplained
  /** Optional media shown below the intro (same panel) */
  mediaImage?: string
  mediaImageAlt?: string
  /** Multiple content blocks in one tab (e.g. Share Analysis + Analyst Coverage) */
  blocks?: ProductTabBlock[]
}

export type ProductContent = {
  slug: ProductSlug
  label: string
  path: string
  title: string
  subtitle: string
  introEyebrow: string
  introHeading: string
  description: string[]
  /** Shared white page lead shown above video on every tab */
  pageIntro?: ProductPageIntro
  /** Extra white page-intro blocks after the lead (e.g. Share Graph) */
  pageIntroFollowUps?: ProductPageIntro[]
  featuresHeading?: string
  features?: ProductFeature[]
  liveExamples?: ProductLiveExample[]
  /** Content blocks when the page has no sticky tabs */
  blocks?: ProductTabBlock[]
  /** Sticky sub-menu panels (IR Solutions, Sustainability, etc.) */
  tabs?: ProductTabSection[]
  explained?: ProductExplained
  /** Optional static image shown in the detail band (e.g. Share Graph UI) */
  detailImage?: string
  detailImageAlt?: string
  mediaType: 'video' | 'image'
  videoSrc: string
  videoPoster: string
  videoCaption: string
}

export const PRODUCTS: Record<ProductSlug, ProductContent> = {
  'share-graph': {
    slug: 'share-graph',
    label: 'Share Graph',
    path: '/share-graph',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'INTERACTIVE\nSHARE ANALYSIS',
    introEyebrow: 'Share Graph',
    introHeading: '',
    description: [
      'Present your share performance through interactive charts, peer benchmarks, and corporate events that help investors understand how market and company events affect share performance.',
    ],
    pageIntro: {
      eyebrow: 'About Share Graph',
      description: [
        'Present your share performance through an interactive and comprehensive Share Graph designed to give investors greater context around your company\'s performance.',
        'Go beyond the numbers with an interactive view of your companyâ€™s share performance. Explore historical trends, compare performance with peers and market indices, and view key corporate events alongside share price movements.',
      ],
    },
    pageIntroFollowUps: [
      {
        eyebrow: 'Understanding Your Share Price',
        description: [
          'Context helps investors better understand movements in your share price.',
          'Investors can gain a broader view of share price movements through historical data, comparisons, and relevant corporate events.',
          'Investors can compare share price performance with market indices, peers, and relevant corporate events such as results and company announcements. The tool brings together key share information, including basic share data, broker trades, order depth, and long-term performance.',
          'By providing share price data alongside relevant market and company information, the tool gives investors greater context for understanding share performance. This additional context can help investors better understand your company\'s share performance.',
        ],
      },
    ],
    detailImage: '/assets/share-graph-preview.png',
    detailImageAlt: 'Share Graph â€” interactive share performance chart',
    featuresHeading: 'Features',
    features: [
      {
        title: 'Share Performance Analysis',
        description:
          'Go beyond the current share price with analysis that provides context around share performance. Compare movements against earnings, market indices, peers, and other relevant events.',
      },
      {
        title: 'Responsive',
        description:
          'Our Share Graph is responsive and can be customised to fit your website layout and branding.',
      },
      {
        title: 'Consolidated Share Information',
        description:
          'Key share price information is brought together in one tool, giving investors a clear overview of share performance and related market information.',
      },
      {
        title: 'Downloadable Data',
        description:
          'Investors can download share data in multiple formats for independent analysis, helping reduce information requests to IR teams.',
      },
    ],
    liveExamples: [
      {
        src: '/assets/clients/live-examples/ai-assistant/image-429.png',
        alt: 'Nahdi',
        height: 36,
        href: 'https://investors.nahdi.sa/en/stock-overview/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-431.png',
        alt: 'e&',
        height: 36,
        href: 'https://www.eand.com/en/investors/share-information.html',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-432.png',
        alt: 'Salik',
        height: 36,
        href: 'https://www.salik.ae/en/Investors/Overview',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-428.png',
        alt: 'Alinma Bank',
        height: 36,
        href: 'https://ir.alinma.com/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-430.png',
        alt: 'NADEC',
        height: 36,
        href: 'https://ir.nadec.com.sa/en/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-433.png',
        alt: 'Alpha Dhabi',
        height: 36,
        href: 'https://alphadhabi.com/investor-relations-overview/',
      },
    ],
    mediaType: 'image',
    videoSrc: '/assets/share-graph-preview.png',
    videoPoster: '',
    videoCaption: 'Interactive share performance for investor relations.',
  },
  'interactive-analysis-tool': {
    slug: 'interactive-analysis-tool',
    label: 'Interactive Analysis Tool',
    path: '/interactive-analysis-tool',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'BEST-PRACTICE\nINTERACTIVE ANALYSIS',
    introEyebrow: 'Interactive Analysis Tool',
    introHeading: '',
    description: [
      'Help investors explore financial fundamentals, ratios, and historical data using easy-to-use filters.',
    ],
    pageIntro: {
      eyebrow: 'About Interactive Analysis Tool',
      description: [
        "Turn Financial Data into a More Powerful Investor Story. Present your company's financial performance with greater clarity, context, and impact. The Interactive Analysis Tool transforms complex financial data into an engaging, intuitive experience for investors and stakeholders.",
        'Explore historical performance and trends, benchmark your company, and understand how key corporate events have influenced your equity story—all through one powerful, interactive platform.',
      ],
    },
    pageIntroFollowUps: [
      {
        eyebrow: 'Illuminating KPIs',
        description: [
          "Present your company's financial, operational, and sustainability performance through clear, interactive visualisations. Interactive Analysis Tool enables investors and stakeholders to explore key indicators, compare relevant metrics, and analyse performance across different periods to identify trends and long-term developments.",
          'Turning Data Into Meaningful Insights',
          'Key performance indicators can easily become difficult to interpret when presented across extensive tables and reports. Interactive Analysis Tool provides a clear overview of performance and trends, while allowing users to explore the underlying data and make comparisons relevant to their interests. All data can be downloaded in multiple formats, including Excel, supporting further analysis and enabling efficient use across investor presentations, corporate communications, and other reporting materials.',
          'By combining visual presentation, interactive analysis, and accessible data, Interactive Analysis Tool helps companies communicate their financial and sustainability performance with greater clarity, transparency, and impact.',
        ],
      },
    ],
    detailImage: '/assets/iat-explained.png',
    detailImageAlt: 'Interactive Analysis Tool — key figures and financial performance',
    featuresHeading: 'Features',
    features: [
      {
        title: 'Interactive',
        description:
          'Enable stakeholders to explore, compare, and analyse relevant financial information through an intuitive and flexible interactive experience.',
      },
      {
        title: 'Flexible',
        description:
          'Designed to adapt to your reporting requirements, Interactive Analysis Tool enables companies to present financial, operational, and sustainability data in a clear and engaging interactive format.',
      },
      {
        title: 'Customisable',
        description:
          'Tailor the experience to your reporting requirements with relevant comparisons, contextualised data, and clearly presented key metrics, enabling stakeholders to gain meaningful insights and better understand your performance.',
      },
      {
        title: 'Shareable',
        description:
          'Export and share up-to-date financial and operational data across presentations, investor materials, and digital channels, ensuring key information is readily available for investor meetings, roadshows, and corporate communications.',
      },
    ],
    liveExamples: [
      {
        src: '/assets/clients/live-examples/riyad-bank.png',
        alt: 'Riyad Bank',
        height: 36,
        href: 'https://www.riyadbank.com/investor-relations/key-figures',
      },
      {
        src: '/assets/clients/live-examples/dib.png',
        alt: 'Dubai Islamic Bank',
        height: 36,
        href: 'https://www.dib.ae/about-us/investor-relations/about-us',
      },
      {
        src: '/assets/clients/live-examples/maaden.png',
        alt: "Ma'aden",
        height: 36,
        href: 'https://www.maaden.com/investor-relations?category=analyst-coverage&innerCategory=consensus-estimates',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-432.png',
        alt: 'Salik',
        height: 36,
        href: 'http://www.myirapp.com/salik',
      },
      {
        src: '/assets/clients/live-examples/burgan.png',
        alt: 'Burgan Bank',
        height: 28,
        href: 'http://www.myirapp.com/burganbank/',
      },
      {
        src: '/assets/clients/live-examples/deyaar.png',
        alt: 'Deyaar',
        height: 28,
        href: 'http://www.myirapp.com/deyaar',
      },
    ],
    mediaType: 'image',
    videoSrc: '/assets/iat-explained.png',
    videoPoster: '',
    videoCaption: 'Self-serve financial analysis designed for investor engagement.',
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    label: 'AI-Powered Investor Relations',
    path: '/artificial-intelligence',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'PURPOSE-BUILT\nAI SOLUTIONS FOR IR',
    introEyebrow: 'AI-Powered Investor Relations',
    introHeading: '',
    description: [
      'Use AI to summarise filings, identify key market developments, and help IR teams respond more efficiently.',
    ],
    pageIntro: {
      eyebrow: 'About AI-Powered Investor Relations',
      description: [
        'Enhancing Investor Relations Through AI. Euroland IR leverages Artificial Intelligence to enhance how companies communicate and engage with their investment community. Our AI-enabled solutions help transform complex financial and corporate information into accessible, relevant, and actionable insights.',
        "By combining AI with Investor Relations data and digital experiences, we enable companies and investors to access, explore, and understand relevant information more intuitively. This helps users identify meaningful insights and gain a deeper understanding of a company's performance, strategy, and equity story.",
      ],
    },
    pageIntroFollowUps: [
      {
        eyebrow: 'Understanding AI for Investor Relations',
        description: [
          'Making Investor Relations Information More Accessible. Euroland AI enables stakeholders, IR Team, and Investors to find and understand relevant information across your Investor Relations materials through a natural-language, context-aware experience. Investors and IR teams can ask questions in plain language and receive answers based on filings, transcripts, reports, financial statements, presentations, and corporate disclosures.',
          'By bringing your IR knowledge into a single searchable experience, Euroland AI helps stakeholders navigate complex financial and corporate information more efficiently. Built-in compliance guardrails support the controlled and responsible use of AI within the Investor Relations environment.',
          'Trusted Answers With Source References.',
          "Responses can include verified source references, including links, document names, and PDF page numbers, allowing users to locate and validate the underlying information quickly. By combining natural-language interaction, contextual understanding, and source-based responses, Euroland AI helps companies provide stakeholders with faster access to relevant information while supporting transparency, engagement, and informed understanding of the company's performance and strategy.",
        ],
      },
    ],
    detailImage: '/assets/ai-explained.png',
    detailImageAlt: 'AI-Powered Investor Relations — intelligent IR assistant',
    liveExamples: [
      {
        src: '/assets/clients/live-examples/ai-assistant/experian_full_colour-1.png',
        alt: 'Experian',
        height: 44,
        href: 'https://www.experianplc.com/investors/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-420.png',
        alt: 'Luberef',
        height: 36,
        href: 'https://www.luberef.com/en/investors-relations',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-427.png',
        alt: 'First Abu Dhabi Bank',
        height: 36,
        href: 'https://www.bankfab.com/en-ae/about-fab/investor-relations',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/image-428.png',
        alt: 'Alinma Bank',
        height: 36,
        href: 'https://ir.alinma.com/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/omantel.png',
        alt: 'Omantel',
        height: 44,
        href: 'https://ir.omantel.om/',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/givaudan.png',
        alt: 'Givaudan',
        height: 44,
        href: 'https://www.givaudan.com/investors',
      },
      {
        src: '/assets/clients/live-examples/ai-assistant/corbion.png',
        alt: 'Corbion',
        height: 44,
        href: 'https://www.corbion.com/investor-relations',
      },
    ],
    mediaType: 'image',
    videoSrc: '/assets/ai-explained.png',
    videoPoster: '',
    videoCaption: 'Purpose-built AI for investor relations.',
  },
}

export const PRODUCT_LIST = Object.values(PRODUCTS)
