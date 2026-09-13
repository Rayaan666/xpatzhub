export const faqData = [
  {
    id: 'faq-01',
    number: '01',
    question: 'How can SEO help my business grow in the UAE?',
    answer:
      'SEO helps your business appear when potential customers are actively searching for the products or services you offer. XPATZHUB focuses on improving search visibility, attracting relevant traffic and creating stronger opportunities for enquiries, leads and long-term organic growth.'
  },
  {
    id: 'faq-02',
    number: '02',
    question: 'How long does SEO take to show results?',
    answer:
      'SEO is a long-term growth strategy rather than an instant advertising channel. Timelines vary depending on your website, competition, industry and current search presence. We focus on building sustainable improvements in visibility, rankings and qualified organic traffic over time.'
  },
  {
    id: 'faq-03',
    number: '03',
    question: 'Do you provide Google Ads and Meta Ads management?',
    answer:
      'Yes. XPATZHUB manages paid campaigns across platforms such as Google and Meta, covering campaign strategy, audience targeting, creative direction, optimisation and performance monitoring to help brands make better use of their advertising budget.'
  },
  {
    id: 'faq-04',
    number: '04',
    question: 'Can XPATZHUB manage all of our digital marketing?',
    answer:
      'Yes. Depending on your requirements, we can bring SEO, paid advertising, social media, content creation, website development, lead generation, photography, videography and campaign management together under one coordinated digital strategy.'
  },
  {
    id: 'faq-05',
    number: '05',
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes. We work with businesses at different stages of growth. The strategy and scope can be adapted around your goals, market, audience and available budget rather than applying the same marketing package to every brand.'
  },
  {
    id: 'faq-06',
    number: '06',
    question: 'Do you provide website design and development?',
    answer:
      'Yes. XPATZHUB creates modern, responsive and conversion-focused websites designed to support your wider digital marketing strategy, search visibility and lead-generation goals.'
  },
  {
    id: 'faq-07',
    number: '07',
    question: 'Can you help generate leads for my business?',
    answer:
      'Yes. Our lead-generation approach can combine search, paid campaigns, landing pages, content and conversion optimisation to attract relevant audiences and create more opportunities for enquiries and customer acquisition.'
  },
  {
    id: 'faq-08',
    number: '08',
    question: 'Do you only work with businesses in Dubai?',
    answer:
      'No. XPATZHUB works with brands and businesses across the UAE. Campaign strategies can be adapted around specific emirates, locations, audiences and business objectives.'
  },
  {
    id: 'faq-09',
    number: '09',
    question: 'What makes XPATZHUB different from a traditional digital marketing agency?',
    answer:
      'XPATZHUB combines digital marketing expertise with community reach and a wider ecosystem of brand visibility, content and experiences. This allows campaigns to connect digital strategy with real audiences and broader opportunities across the UAE.'
  },
  {
    id: 'faq-10',
    number: '10',
    question: 'How do we get started with XPATZHUB?',
    answer:
      'Start by telling us about your business, goals and current marketing challenges. We can then identify the right combination of services and build a strategy around the outcomes you want to achieve.'
  }
];

export const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqData.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer
    }
  }))
};
