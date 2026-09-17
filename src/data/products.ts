export type ProductSlug =
  | 'share-graph'
  | 'interactive-analysis-tool'
  | 'artificial-intelligence'

export type ProductFeature = {
  title: string
  description: string
}

export type ProductFeaturesSection = {
  heading: string
  title?: string
  description?: string
  /** Optional cyan label shown directly above the feature cards */
  featuresLabel?: string
  features: ProductFeature[]
}

export type ProductLiveExample = {
  src: string
  alt: string
  height?: number
}

export type ProductExplained = {
  heading: string[]
  body: string[]
  image: string
  imageAlt: string
  liveExamples?: ProductLiveExample[]
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
  featuresHeading?: string
  features?: ProductFeature[]
  secondaryFeatures?: ProductFeaturesSection
  liveExamples?: ProductLiveExample[]
  secondaryLiveExamples?: ProductLiveExample[]
  explained?: ProductExplained
  mediaType: 'video' | 'image'
  videoSrc: string
  videoPoster: string
  videoCaption: string
}

export const PRODUCTS: Record<ProductSlug, ProductContent> = {
  'share-graph': {
    slug: 'share-graph',
    label: 'AI Assistant',
    path: '/share-graph',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'PURPOSE-BUILT\nAI SOLUTIONS FOR IR',
    introEyebrow: 'AI Assistant',
    introHeading:
      'Purpose-built intelligence that helps investors find answers faster while giving IR teams deeper visibility into what matters most.',
    description: [],
    featuresHeading: 'Features',
    features: [
      {
        title: 'Instant IR Intelligence',
        description:
          'Give investors instant access to precise information across financial reports, earnings releases, presentations, website content and other approved IR materials.',
      },
      {
        title: 'Trusted, Source-Backed Answers',
        description:
          'Deliver accurate answers supported by direct source citations and specific page references, building investor confidence in every response.',
      },
      {
        title: 'Multilingual Investor Access',
        description:
          'Engage a broader global audience with multilingual support across English, Arabic, Chinese and other languages.',
      },
      {
        title: 'Powerful IR Analytics',
        description:
          'Understand how investors engage with your content through a dedicated analytics portal. Included are the questions asked, the answers provided, the topics generating the most interest, most referenced reports, and other usage data.',
      },
    ],
    secondaryFeatures: {
      heading: 'AI-Powered Podcast Series',
      title:
        'Turn financial information into engaging conversations that make your equity story easier to access, understand and share.',
      featuresLabel: 'Features',
      features: [
        {
          title: 'Turn Financial Content into Investor Stories',
          description:
            'Transform quarterly earnings, financial reports, IR presentations and sustainability content into polished podcast episodes that bring your performance, strategy and equity story to life.',
        },
        {
          title: 'English & Arabic Delivery',
          description:
            'Reach a broader investor audience with professionally produced podcast episodes available in both English and Arabic.',
        },
        {
          title: 'Multi-Channel Distribution',
          description:
            'Extend the reach of your IR content across platforms such as Spotify, YouTube and LinkedIn to meet investors on the channels they already use.',
        },
      ],
    },
    liveExamples: [
      { src: '/assets/clients/live-examples/ai-assistant/experian_full_colour-1.png', alt: 'Experian', height: 36 },
      { src: '/assets/clients/live-examples/ai-assistant/image-420.png', alt: 'Luberef', height: 48 },
      { src: '/assets/clients/live-examples/ai-assistant/image-427.png', alt: 'First Abu Dhabi Bank', height: 48 },
      { src: '/assets/clients/live-examples/ai-assistant/image-428.png', alt: 'Alinma Bank', height: 40 },
      { src: '/assets/clients/live-examples/ai-assistant/image-429.png', alt: 'Nahdi', height: 40 },
      { src: '/assets/clients/live-examples/ai-assistant/image-430.png', alt: 'NADEC', height: 48 },
      { src: '/assets/clients/live-examples/ai-assistant/image-431.png', alt: 'etisalat and', height: 48 },
      { src: '/assets/clients/live-examples/ai-assistant/image-432.png', alt: 'Salik', height: 36 },
      { src: '/assets/clients/live-examples/ai-assistant/image-433.png', alt: 'Client logo', height: 40 },
      { src: '/assets/clients/live-examples/ai-assistant/image-434.png', alt: 'Omantel', height: 32 },
      { src: '/assets/clients/live-examples/ai-assistant/image-435.png', alt: 'Givaudan', height: 28 },
      { src: '/assets/clients/live-examples/ai-assistant/image-436.png', alt: 'Corbion', height: 48 },
    ],
    secondaryLiveExamples: [
      { src: '/assets/clients/live-examples/ai-set-2/image-427.png', alt: 'Salik', height: 36 },
      { src: '/assets/clients/live-examples/ai-set-2/image-437.png', alt: 'Omantel', height: 32 },
      { src: '/assets/clients/live-examples/ai-set-2/image-440.png', alt: 'DEYAAR', height: 40 },
    ],
    mediaType: 'image',
    videoSrc: '/assets/share-graph.jpg',
    videoPoster: '/assets/share-graph.jpg',
    videoCaption: 'Interactive equity performance storytelling for modern IR websites.',
  },
  'interactive-analysis-tool': {
    slug: 'interactive-analysis-tool',
    label: 'Interactive Analysis Tool',
    path: '/interactive-analysis-tool',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'INTERACTIVE ANALYSIS',
    introEyebrow: 'About Interactive Analysis Tool',
    introHeading:
      'Our Interactive Analysis Tool allows you to present your financial performance in the most comprehensive and compelling way possible. We showcase your data in the best light',
    description: [
      'Go beyond the numbers with an interactive view of your company’s financial performance. Explore historical trends, benchmark against peers and market indices, and see how key corporate events shaped your equity story—all in one powerful experience.',
    ],
    featuresHeading: 'Features',
    features: [
      {
        title: 'Interactive',
        description:
          'Our tool allows your current and potential stakeholders to interact with your data, choosing the information and making the comparisons relevant to their interest.',
      },
      {
        title: 'Flexible',
        description:
          'Do you want to showcase your monthly sales? Or the yearly improvement of your waste management? Maybe highlight your income statement? Our IAT is flexible to suit your needs.',
      },
      {
        title: 'Customisable',
        description:
          'We customize your data to ensure all relative comparisons are only a click away. We group and contextualise your key figures to ensure understanding and improve communication with your stakeholders.',
      },
      {
        title: 'Shareable',
        description:
          'Download and present your KPIs on print-outs, in powerpoint presentations or via social media. Have up-to-date and beautifully presented data immediately available for your investor meetings and roadshows.',
      },
    ],
    explained: {
      heading: ['Illuminating KPIs'],
      body: [
        "How do you want to present your company's financial highlights? What about your sustainability targets and achievements? To illustrate the bigger picture and long term trends of your work, we believe in presenting your data visually. We believe usability is key and our Interactive Analysis Tool enables investors to make their own comparisons, viewing data and time periods relevant to their interest.",
        'The key indicators of your company can get lost in endless tables. Our IAT gives an immediate overview of the trends of your performance while retaining the ability to download all data in various formats including Excel. You can easily share and spread your financial and sustainability performance on social media. All functionalities of the tool aims to make understanding your goals, values and performance intuitive.',
      ],
      image: '/assets/iat-explained.png',
      imageAlt: 'Interactive Analysis Tool showing key performance indicators',
      liveExamples: [
        { src: '/assets/clients/logo-005.png', alt: 'ING', height: 26 },
        { src: '/assets/clients/logo-006.png', alt: 'Experian', height: 28 },
        { src: '/assets/clients/logo-007.png', alt: 'Carlsberg', height: 28 },
        { src: '/assets/clients/logo-008.png', alt: 'Moncler Group', height: 28 },
      ],
    },
    mediaType: 'video',
    videoSrc: '/assets/iat.mp4',
    videoPoster: '/assets/products/iat-card.jpg',
    videoCaption: 'Self-serve financial analysis designed for investor engagement.',
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    label: 'Artificial Intelligence',
    path: '/artificial-intelligence',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'ARTIFICIAL INTELLIGENCE',
    introEyebrow: 'About Artificial Intelligence',
    introHeading:
      'Our AI solutions allow you to present your investor story in the most comprehensive and compelling way possible. We showcase your insights in the best light',
    description: [
      'Go beyond the numbers with an interactive view of your company’s share performance. Explore historical trends, benchmark against peers and market indices, and see how key corporate events shaped your equity story—all in one powerful experience.',
    ],
    featuresHeading: 'Features',
    features: [
      {
        title: 'Analytical',
        description:
          "We make sure not to just present your current share price, but the context behind it. Get the full story by analysing the share's reaction to Earnings, Indices, Peers and more.",
      },
      {
        title: 'Responsive',
        description:
          'Our share graph, like all our tools, is responsive and blends in seamlessly with your website layout. The options for customisation are limitless and our tools always utilizes the latest technology.',
      },
      {
        title: 'Consolidated',
        description:
          'All important information concerning your share price is consolidated within one tool, producing a transparent and enlightening overview of your Equity story.',
      },
      {
        title: 'Downloadable',
        description:
          'Your data is downloadable in a variety of formats, enabling your investors to undertake their own analysis, as well as allowing you to create presentation material seamlessly.',
      },
    ],
    explained: {
      heading: ['Euroland AI', 'Explained'],
      body: [
        'To help stakeholders find answers across your Investor Relations materials, the most important capability you can give them is instant, trusted access. Euroland AI lets investors and IR teams ask questions in plain language and receive context-aware answers drawn from your filings, transcripts, reports, and disclosures—with compliance guardrails built in.',
        'We bring your IR knowledge into one searchable experience covering earnings materials, financial statements, presentations, and publicly available disclosures. Every answer can include verified source references—links, document names, and PDF page numbers—so information is easy to find, understand, and check. Faster, cited answers strengthen engagement between your company and its stakeholders.',
      ],
      image: '/assets/ai-explained.png',
      imageAlt: 'Euroland AI search experience for Investor Relations content',
      liveExamples: [
        { src: '/assets/clients/logo-009.png', alt: 'Sony', height: 22 },
        { src: '/assets/clients/logo-010.png', alt: 'ASML', height: 24 },
        { src: '/assets/clients/logo-011.png', alt: 'Swisscom', height: 28 },
        { src: '/assets/clients/logo-012.png', alt: 'Eni', height: 28 },
      ],
    },
    mediaType: 'video',
    videoSrc: '/assets/ai.mp4',
    videoPoster: '/assets/products/ai-card.jpg',
    videoCaption: 'AI-assisted investor relations for sharper, faster engagement.',
  },
}

export const PRODUCT_LIST = Object.values(PRODUCTS)
