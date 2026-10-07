import type { ProductSlug } from './products'

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
      'Euroland IR provides tools and services that help listed companies communicate with investors, analyse market information, and deliver relevant company information efficiently.',
  },
  {
    id: '2',
    question: 'How long does implementation take?',
    answer:
      'Depending on the scope, implementation typically takes between 4-6 weeks. AI solutions are quick to integrate, requiring only a few lines of code to be embedded into the IR section.',
  },
  {
    id: '3',
    question: 'Can your solutions be integrated into our existing IR website?',
    answer:
      'Yes. Our solutions can be integrated into your existing IR website or microsite and customised to match your brand, while providing investors with access to live market data.',
  },
  {
    id: '4',
    question: 'Is my data secure with Euroland IR?',
    answer:
      'Security is a key part of our platform and services. We apply robust security measures across hosting, access, and operations to help protect data and privacy.',
  },
  {
    id: '5',
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. Every client has a dedicated account manager and access to ongoing support from our global service team.',
  },
]

export const PRODUCT_FAQS: Partial<Record<ProductSlug, FaqItem[]>> = {
  'share-graph': [
    {
      id: '1',
      question: 'What is the Share Graph and how does it benefit investors?',
      answer:
        "The Share Graph is an interactive tool that provides a comprehensive view of your company's share price performance. It helps investors understand not just the share price itself, but also the factors influencing it, such as market movements, peer performance, earnings announcements, and corporate events.",
    },
    {
      id: '2',
      question: 'What information can be compared within the Share Graph?',
      answer:
        "Users can compare share price performance against market indices, industry peers, and key corporate milestones. This contextual analysis enables investors to better understand how the company's equity story has evolved over time.",
    },
    {
      id: '3',
      question: 'Is the Share Graph customizable to match our website and branding?',
      answer:
        'Yes. The Share Graph is fully responsive and can be customized to align with your corporate website, branding, and investor relations requirements, ensuring a seamless user experience across devices.',
    },
    {
      id: '4',
      question: 'Can investors download share price data and charts?',
      answer:
        'Absolutely. Investors can download data and visualizations in multiple formats for further analysis, reporting, or use in presentations, making it easier to share and communicate key market insights.',
    },
    {
      id: '5',
      question: 'What additional share-related information is available in the tool?',
      answer:
        "In addition to historical share price performance, the tool can include key share statistics, broker trades, order depth information, performance indicators, and corporate announcements, all consolidated in one place to provide a complete picture of your company's market performance.",
    },
  ],
  'interactive-analysis-tool': [
    {
      id: '1',
      question: 'What is the Interactive Analysis Tool (IAT)?',
      answer:
        "The Interactive Analysis Tool is a dynamic platform that transforms financial and sustainability data into interactive visualizations, helping stakeholders explore performance trends, compare results, and gain deeper insights into your company's achievements.",
    },
    {
      id: '2',
      question: 'What type of data can be displayed in the tool?',
      answer:
        'The IAT is highly flexible and can showcase a wide range of information, including financial statements, key performance indicators (KPIs), sales figures, sustainability metrics, ESG data, operational performance, and other custom datasets relevant to your organization.',
    },
    {
      id: '3',
      question: 'How can users interact with the data?',
      answer:
        'Users can select specific metrics, adjust time periods, compare performance against peers or market indices, and explore trends through intuitive charts and visualizations. This allows each user to focus on the information most relevant to their needs.',
    },
    {
      id: '4',
      question: "Can the tool be customized to our company's requirements?",
      answer:
        'Yes. The IAT is fully customizable and can be tailored to reflect your branding, reporting priorities, KPIs, and preferred data groupings, ensuring stakeholders can easily access and understand the most important information.',
    },
    {
      id: '5',
      question: 'Can reports and visualizations be shared or downloaded?',
      answer:
        'Absolutely. Users can download data and charts in various formats, including Excel and presentation-ready outputs, making it easy to share insights during investor meetings, roadshows, social media campaigns, and internal reporting activities.',
    },
  ],
}
