export const prFaqData = [
  {
    id: 'pr-faq-01',
    number: '01',
    question: 'How does strategic PR help my brand grow in Dubai & the UAE?',
    answer:
      'Strategic PR builds organic credibility and executive authority by securing features in top tier publications, regional news portals, radio shows, and business magazines across Dubai, Abu Dhabi, and the wider GCC. It converts casual awareness into long-term brand trust.',
  },
  {
    id: 'pr-faq-02',
    number: '02',
    question: 'What media outlets and publications can our brand get featured in?',
    answer:
      'We secure visibility across leading UAE print and digital news portals, national business newspapers, lifestyle publications, industry podcasts, and regional TV/radio channels tailored specifically to your target demographic and industry sector.',
  },
  {
    id: 'pr-faq-03',
    number: '03',
    question: 'What is the difference between earned PR and paid advertisements?',
    answer:
      'Earned PR positions your story as editorial content, delivering genuine third-party validation that traditional ads cannot match. Audiences trust journalists, editors, and news features far more than paid banner advertisements.',
  },
  {
    id: 'pr-faq-04',
    number: '04',
    question: 'How long does a PR & visibility campaign take to show results?',
    answer:
      'Messaging preparation and targeted pitching begin in week one. While major editorial features usually take 2 to 4 weeks to coordinate and publish, immediate digital press coverage and brand distribution can occur within days.',
  },
  {
    id: 'pr-faq-05',
    number: '05',
    question: 'Can XPATZHUB handle outdoor and high-footfall community visibility?',
    answer:
      'Yes! Beyond press and digital publications, we orchestrate high-impact offline campaigns—including strategic outdoor billboards, mall activations, community branding, and high-visibility sponsorships across prime UAE locations.',
  },
  {
    id: 'pr-faq-06',
    number: '06',
    question: 'Do you help with founder profiling and executive thought leadership?',
    answer:
      'Refining executive reputation is core to our strategy. We position founders, CEOs, and key innovators as industry thought leaders through guest opinion columns, keynote interview slots, and expert commentary features.',
  },
  {
    id: 'pr-faq-07',
    number: '07',
    question: 'How is campaign performance and media ROI measured?',
    answer:
      'We deliver clear media monitoring reports tracking publication reach, readership metrics, digital audience engagement, domain authority impact, messaging accuracy, and calculated PR value equivalencies.',
  },
  {
    id: 'pr-faq-08',
    number: '08',
    question: 'How do we get started with a customized PR plan for our brand?',
    answer:
      'Contact our PR strategists directly via phone or email. We review your current market positioning, identify high-potential media hooks, and present a custom visibility roadmap built to hit your commercial goals.',
  },
];

export const prFaqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: prFaqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
