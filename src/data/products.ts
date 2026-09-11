export type ProductSlug =
  | 'share-graph'
  | 'interactive-analysis-tool'
  | 'artificial-intelligence'

export type ProductFeature = {
  title: string
  description: string
  icon: string
  iconAlt: string
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
  eyebrow: string
  title: string
  subtitle: string
  introEyebrow: string
  introHeading: string
  description: string[]
  featuresHeading?: string
  features?: ProductFeature[]
  explained?: ProductExplained
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
    eyebrow: 'Share Graph',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'SHARE GRAPH',
    introEyebrow: 'About Share Graph',
    introHeading:
      'Our share graph allows you to present your share performance in the most comprehensive and compelling way possible. We showcase your share in the best light',
    description: [
      'Go beyond the numbers with an interactive view of your company’s share performance. Explore historical trends, benchmark against peers and market indices, and see how key corporate events shaped your equity story—all in one powerful experience.',
    ],
    featuresHeading: 'Features',
    features: [
      {
        title: 'Analytical',
        description:
          "We make sure not to just present your current share price, but the context behind it. Get the full story by analysing the share's reaction to Earnings, Indices, Peers and more.",
        icon: '/assets/features/analytical.svg',
        iconAlt: 'Analytical layers icon',
      },
      {
        title: 'Responsive',
        description:
          'Our share graph, like all our tools, is responsive and blends in seamlessly with your website layout. The options for customisation are limitless and our tools always utilizes the latest technology.',
        icon: '/assets/features/responsive.svg',
        iconAlt: 'Responsive device icon',
      },
      {
        title: 'Consolidated',
        description:
          'All important information concerning your share price is consolidated within one tool, producing a transparent and enlightening overview of your Equity story.',
        icon: '/assets/features/consolidated.svg',
        iconAlt: 'Consolidated focus icon',
      },
      {
        title: 'Downloadable',
        description:
          'Your data is downloadable in a variety of formats, enabling your investors to undertake their own analysis, as well as allowing you to create presentation material seamlessly.',
        icon: '/assets/features/downloadable.svg',
        iconAlt: 'Downloadable file formats icon',
      },
    ],
    explained: {
      heading: ['Your share price', 'Explained'],
      body: [
        'To help build an understanding of your share price, the most important aspect you can give investors is context. We enable your present and future stakeholders to gain as complete an insight into the movement of your share price as possible. We ensure that your share price performance is comparable with indicies, peers and indicators such as press releases and result publications.',
        'We focus and consolidate your share information by also including basic share data, latest trades by broker, order depth and long-term performance. By putting your share price against a background of contextual information, your investors get a broader and fuller understanding of your performance. A deeper understanding is the foundation of a better, longer relationship with your investors.',
      ],
      image: '/assets/share-graph-explained.png',
      imageAlt: 'Share Graph interface showing Alma Media share price performance',
      liveExamples: [
        { src: '/assets/clients/santander.png', alt: 'Santander', height: 28 },
        { src: '/assets/clients/rio-tinto.png', alt: 'Rio Tinto', height: 26 },
        { src: '/assets/clients/repsol.png', alt: 'Repsol', height: 28 },
        { src: '/assets/clients/experian.png', alt: 'Experian', height: 28 },
      ],
    },
    mediaType: 'image',
    videoSrc: '/assets/share-graph.jpg',
    videoPoster: '/assets/share-graph.jpg',
    videoCaption: 'Interactive equity performance storytelling for modern IR websites.',
  },
  'interactive-analysis-tool': {
    slug: 'interactive-analysis-tool',
    label: 'Interactive Analysis Tool',
    path: '/interactive-analysis-tool',
    eyebrow: 'Interactive Analysis Tool',
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
        icon: '/assets/features/interactive.svg',
        iconAlt: 'Interactive sliders icon',
      },
      {
        title: 'Flexible',
        description:
          'Do you want to showcase your monthly sales? Or the yearly improvement of your waste management? Maybe highlight your income statement? Our IAT is flexible to suit your needs.',
        icon: '/assets/features/flexible.svg',
        iconAlt: 'Flexible shapes icon',
      },
      {
        title: 'Customisable',
        description:
          'We customize your data to ensure all relative comparisons are only a click away. We group and contextualise your key figures to ensure understanding and improve communication with your stakeholders.',
        icon: '/assets/features/customisable.svg',
        iconAlt: 'Customisable measuring tape icon',
      },
      {
        title: 'Shareable',
        description:
          'Download and present your KPIs on print-outs, in powerpoint presentations or via social media. Have up-to-date and beautifully presented data immediately available for your investor meetings and roadshows.',
        icon: '/assets/features/shareable.svg',
        iconAlt: 'Shareable speech bubbles icon',
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
        { src: '/assets/clients/ing.png', alt: 'ING', height: 26 },
        { src: '/assets/clients/experian.png', alt: 'Experian', height: 28 },
        { src: '/assets/clients/carlsberg.png', alt: 'Carlsberg', height: 28 },
        { src: '/assets/clients/moncler.png', alt: 'Moncler Group', height: 28 },
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
    eyebrow: 'Artificial Intelligence',
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
        icon: '/assets/features/analytical.svg',
        iconAlt: 'Analytical layers icon',
      },
      {
        title: 'Responsive',
        description:
          'Our share graph, like all our tools, is responsive and blends in seamlessly with your website layout. The options for customisation are limitless and our tools always utilizes the latest technology.',
        icon: '/assets/features/responsive.svg',
        iconAlt: 'Responsive device icon',
      },
      {
        title: 'Consolidated',
        description:
          'All important information concerning your share price is consolidated within one tool, producing a transparent and enlightening overview of your Equity story.',
        icon: '/assets/features/consolidated.svg',
        iconAlt: 'Consolidated focus icon',
      },
      {
        title: 'Downloadable',
        description:
          'Your data is downloadable in a variety of formats, enabling your investors to undertake their own analysis, as well as allowing you to create presentation material seamlessly.',
        icon: '/assets/features/downloadable.svg',
        iconAlt: 'Downloadable file formats icon',
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
        { src: '/assets/clients/sony.png', alt: 'Sony', height: 22 },
        { src: '/assets/clients/asml.png', alt: 'ASML', height: 24 },
        { src: '/assets/clients/swisscom.png', alt: 'Swisscom', height: 28 },
        { src: '/assets/clients/eni.png', alt: 'Eni', height: 28 },
      ],
    },
    mediaType: 'video',
    videoSrc: '/assets/ai.mp4',
    videoPoster: '/assets/products/ai-card.jpg',
    videoCaption: 'AI-assisted investor relations for sharper, faster engagement.',
  },
}

export const PRODUCT_LIST = Object.values(PRODUCTS)
