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
  /** Optional external URL — logo becomes a link */
  href?: string
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
  featuresHeading?: string
  features?: ProductFeature[]
  secondaryFeatures?: ProductFeaturesSection
  liveExamples?: ProductLiveExample[]
  secondaryLiveExamples?: ProductLiveExample[]
  /** Content blocks when the page has no sticky tabs (e.g. Sustainability) */
  blocks?: ProductTabBlock[]
  /** Sticky sub-menu panels (IR Solutions, etc.) */
  tabs?: ProductTabSection[]
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
    mediaType: 'video',
    videoSrc: '/assets/ai.mp4',
    videoPoster: '/assets/products/ai-assistant-card.png',
    videoCaption: 'Purpose-built AI for investor relations.',
  },
  'interactive-analysis-tool': {
    slug: 'interactive-analysis-tool',
    label: 'Interactive Analysis Tool',
    path: '/interactive-analysis-tool',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'BEST-PRACTICE\nIR SOLUTIONS',
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
    tabs: [
      {
        id: 'fact-sheet',
        label: 'Fact Sheet',
        introEyebrow: 'Fact Sheet',
        introHeading: 'Your investment story at a glance.',
        description: [
          'A dynamic one- or two-page investor snapshot with the company’s most relevant market and financial information in a clear and interactive view.',
          'Automatically updated with the latest closing share price and performance chart, alongside key financial figures and KPIs presented through intuitive visuals, helping investors quickly understand performance and trends.',
          'The Fact Sheet can be downloaded as a professionally formatted PDF, giving investors an up-to-date reference they can access, save and share.',
        ],
        liveExamples: [
          {
            src: '/assets/clients/live-examples/dib.png',
            alt: 'Dubai Islamic Bank',
            height: 28,
            href: 'https://www.dib.ae/about-us/investor-relations/about-us',
          },
        ],
      },
      {
        id: 'key-figures',
        label: 'Key Figures',
        introEyebrow: 'Key Figures',
        introHeading:
          'From Financial reports to instant insight. Present quarterly and annual key figures through dynamic, interactive visuals that give investors a clear view of performance, trends and KPIs.',
        description: [
          'The solution is fully managed and updated by Euroland’s skilled financial analysts, ensuring accuracy and consistency across your financial data. All data can be downloaded in Excel, PDF and JPEG formats, making it easy to analyze, present and share across different stakeholder audiences.',
        ],
        liveExamples: [
          {
            src: '/assets/clients/live-examples/riyad-bank.png',
            alt: 'Riyad Bank',
            height: 28,
            href: 'https://www.riyadbank.com/investor-relations/key-figures',
          },
        ],
      },
      {
        id: 'share-solutions',
        label: 'Share solutions',
        blocks: [
          {
            introEyebrow: 'Share solutions',
            introHeading: 'Share Analysis',
            headingAsLiveExamples: true,
            description: [
              'Share Graph, Share Overview, Historical Price Look-up, Investment Calculator, Share Alerts, Shareholder Structure, Dividend solutions. Turn share data into meaningful investor insight. A comprehensive suite of interactive tools that gives investors a clearer view of share performance, valuation and shareholder returns.',
              'From a concise Share Overview and historical Share Price Lookup, to advanced real-time Share Graph Monitoring with peer and index comparisons, investors can analyze performance using indicators such as dividends, earnings, total return, moving averages and relative strength.',
              'The suite also includes Share Price Alerts, an Investment Calculator, and Total Shareholder Return analysis, enabling investors to monitor key price movements, evaluate investment performance and assess the impact of dividends and corporate actions over time.',
            ],
            liveExamples: [
              {
                src: '/assets/clients/live-examples/care-medical.png',
                alt: 'Care Medical',
                height: 28,
                href: 'https://ir.care.med.sa/en/share-information/#dividends',
              },
              {
                src: '/assets/clients/live-examples/nahdi.png',
                alt: 'Nahdi',
                height: 28,
                href: 'https://investors.nahdi.sa/en/stock-overview/',
              },
            ],
          },
          {
            introEyebrow: 'Analyst Coverage',
            eyebrowAsFeatures: true,
            introHeading:
              'Analyst List with Rating, Recommendation Overview, Consensus Estimates. Build trust through transparent access to analyst coverage. Present recommendation trends, consensus views, current and target prices, and historical changes through dynamic visual tools that make market sentiment easier to understand.',
            description: [
              'The Consensus Estimates Solution adds forward-looking insight across upcoming reporting periods and financial years, presenting aggregated analyst estimates alongside the latest actual results for a clearer view of market expectations.',
            ],
            liveExamples: [
              {
                src: '/assets/clients/live-examples/maaden.png',
                alt: "Ma'aden",
                height: 28,
                href: 'https://www.maaden.com/investor-relations?category=analyst-coverage&innerCategory=consensus-estimates',
              },
            ],
          },
        ],
      },
      {
        id: 'investor-communication',
        label: 'Investor Engagement solutions',
        blocks: [
          {
            introEyebrow: 'Investor Communication and Engagement solutions',
            description: [
              'Keep investors informed, engaged and connected from disclosure to delivery.',
            ],
          },
          {
            introEyebrow: 'Company Announcements',
            eyebrowAsFeatures: true,
            introHeading:
              'Announcements can be filtered by type and period, searched by keyword, and linked to share-price movements to give investors greater context around disclosures.',
            liveExamples: [
              {
                src: '/assets/clients/live-examples/omifco.png',
                alt: 'OMIFCO',
                height: 28,
                href: 'https://ir.omifco.com/disclosures-events/disclosures/',
              },
            ],
          },
          {
            introEyebrow: 'Financial Calendar',
            eyebrowAsFeatures: true,
            introHeading:
              'Calendar presents upcoming and historical events, with reminders and alert options for AGMs, reporting dates and other key milestones. Supporting documents, links and files can be added through an easy-to-manage CMS.',
            liveExamples: [
              {
                src: '/assets/clients/live-examples/marsa-maroc.png',
                alt: 'Marsa Maroc',
                height: 28,
                href: 'https://www.eand.com/en/investors/financial-calendar.html',
              },
            ],
          },
          {
            introEyebrow: 'Email Subscription Centre',
            eyebrowAsFeatures: true,
            introHeading:
              'Subscription Centre enables investors and stakeholders to subscribe to annual reports, results, dividend updates, AGM information and other communications, while giving IR teams full control over subscriber lists, content and distribution. For companies looking for additional support, Euroland Concierge Service can manage mailing lists, prepare reusable email campaigns, support distribution and provide analytics on delivery, opens and geographic engagement.',
            liveExamples: [
              {
                src: '/assets/clients/live-examples/etisalat.png',
                alt: 'e&',
                height: 28,
                href: 'https://www.marsamaroc.co.ma/en/ir-subscription',
              },
            ],
          },
        ],
      },
      {
        id: 'market-overview',
        label: 'Market Overview',
        blocks: [
          {
            introEyebrow: 'Market Overview',
            description: [
              'Keep management informed with the market context that matters. Deliver concise daily or weekly market updates directly to management, the Board and senior leadership after market close.',
            ],
          },
          {
            introEyebrow: 'Daily Email Market Overview',
            eyebrowAsFeatures: true,
            introHeading:
              'Market Overview combines your company’s share performance with peer-group movements, relevant indices, commodities and sector leaders to give C-suite and senior management a clear view of how the company is performing within the wider market.',
          },
          {
            introEyebrow: 'WhatsApp Market Overview',
            eyebrowAsFeatures: true,
            introHeading:
              'Market Overview brings this intelligence directly to mobile, fast, convenient access to key market data anytime, anywhere. Daily updates can include company performance, local and international peers, indices, commodities and sector leaders to make market context immediately available without opening multiple platforms or reports.',
          },
        ],
      },
      {
        id: 'ir-application',
        label: 'IR Application',
        introEyebrow: 'IR Application',
        introHeading:
          'Put your Investor Relations experience in your investors’ hands. The Euroland IR App gives investors and analysts convenient, on-the-go access to your most important IR content through a dedicated mobile experience.',
        description: [
          'The app brings together share performance, historical price data, investment calculations, dividends, key financials, reports, announcements, sustainability information, IR events, webcasts, videos, management information and contact details, all in one place.',
          'Investors can access reports and documents offline, build watchlists, compare the company against peers and indices, and receive push notifications for important updates and disclosures. With multilingual functionality that automatically adapts to the user’s language preference, the IR App helps companies extend investor access across global audiences.',
          'To drive adoption, Euroland also provides dedicated marketing materials and QR codes that can be integrated into IR websites, annual reports, quarterly reports and investor presentations — making the app easy to discover and access.',
        ],
        liveExamples: [
          {
            src: '/assets/clients/live-examples/salik.png',
            alt: 'Salik',
            height: 28,
            href: 'http://www.myirapp.com/salik',
          },
          {
            src: '/assets/clients/live-examples/burgan.png',
            alt: 'Burgan Bank',
            height: 28,
            href: 'http://www.myirapp.com/burgan',
          },
          {
            src: '/assets/clients/live-examples/deyaar.png',
            alt: 'Deyaar',
            height: 28,
            href: 'http://www.myirapp.com/deyaar',
          },
          {
            src: '/assets/clients/live-examples/saudi-energy.png',
            alt: 'Saudi Energy',
            height: 28,
            href: 'https://myirapp.com/saudienergy/',
          },
        ],
      },
    ],
    mediaType: 'video',
    videoSrc: '/assets/iat.mp4',
    videoPoster: '/assets/products/iat-card.jpg',
    videoCaption: 'Self-serve financial analysis designed for investor engagement.',
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    label: 'Sustainability solutions',
    path: '/artificial-intelligence',
    title: 'TELL YOUR EQUITY STORY',
    subtitle: 'SUSTAINABILITY\nSOLUTIONS',
    introEyebrow: 'Sustainability solutions',
    introHeading: '',
    description: [],
    blocks: [
      {
        introEyebrow: 'Sustainability solutions',
        description: [
          'Sustainability is no longer just about reporting. It is about showing measurable progress, building trust and making ESG performance easier to understand. With Euroland Sustainability Performance, companies can transform complex ESG data into a clear, interactive digital experience.',
          'Environmental, social and governance indicators can be presented through dynamic charts, historical trends and intuitive visuals — helping investors and stakeholders quickly understand performance, targets and progress over time.',
          'Instead of searching through lengthy sustainability reports, users can access the information that matters in a structured, transparent and engaging format.',
        ],
        liveExamples: [
          {
            src: '/assets/clients/live-examples/sustainability/ad-ports-group.png',
            alt: 'AD Ports Group',
            height: 36,
            href: 'https://www.adportsgroup.com/en/investors/financial-information/performance',
          },
          {
            src: '/assets/clients/live-examples/sustainability/acwa.png',
            alt: 'ACWA',
            height: 40,
            href: 'https://acwapower.com/en/sustainability/acwa-esg-in-numbers/',
          },
          {
            src: '/assets/clients/live-examples/sustainability/repsol.png',
            alt: 'Repsol',
            height: 32,
            href: 'https://www.repsol.com/en/sustainability/sustainability-reports/main-kpis-and-report-archive/environment/index.cshtml',
          },
          {
            src: '/assets/clients/live-examples/sustainability/adcb.png',
            alt: 'ADCB',
            height: 36,
            href: 'https://www.adcb.com/en/about-us/sustainability/reports-and-downloads-performance-data.aspx#tabs',
          },
        ],
      },
      {
        description: [
          'For companies looking to deliver a more comprehensive sustainability experience, Euroland also offers the CSRD-Compliant Sustainability Performance and Disclosure Solution. Designed for CSRD-compliant companies — and for organizations that want to go beyond traditional ESG reporting — the solution brings together quantitative ESG performance with sustainability priorities, targets, policies and supporting narrative in one integrated digital environment.',
          'It also supports the presentation of Double Materiality, helping companies clearly communicate both how sustainability matters affect the business and how the company impacts people, society and the environment. By combining performance data, strategic priorities, material topics and disclosure content, the solution creates a richer and more connected view of the company’s sustainability journey.',
          'For CSRD reporters, it provides a structured digital layer for presenting sustainability disclosures. For other companies, it offers a powerful framework to elevate ESG communication, strengthen transparency and give stakeholders a deeper understanding of sustainability strategy and performance.',
          'From ESG performance to comprehensive sustainability disclosure, Euroland helps companies turn complex sustainability information into a credible, accessible and powerful part of the investor story. Euroland IR. Making sustainability performance visible. Making disclosure meaningful.',
        ],
        liveExamples: [
          {
            src: '/assets/clients/live-examples/sustainability/billerud.png',
            alt: 'Billerud',
            height: 40,
            href: 'https://www.billerud.com/sustainability/reporting-and-data/sustainability-data',
          },
        ],
      },
    ],
    mediaType: 'video',
    videoSrc: '/assets/ai.mp4',
    videoPoster: '/assets/products/esg-card.jpg',
    videoCaption: 'ESG storytelling and sustainability performance for investors.',
  },
}

export const PRODUCT_LIST = Object.values(PRODUCTS)
