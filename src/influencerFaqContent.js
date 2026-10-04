export const influencerFaqData = [
  {
    id: 'inf-faq-01',
    number: '01',
    question: 'How does XPATZHUB select the right influencers for our brand?',
    answer:
      'We do not rely on vanity follower counts. We match your brand with creators based on niche relevance, audience demographics in the UAE, genuine engagement rates, aesthetic alignment, and authenticity. Every creator is vetted to ensure their audience genuinely trusts their voice.'
  },
  {
    id: 'inf-faq-02',
    number: '02',
    question: 'What types of creator collaborations do you manage?',
    answer:
      'We manage end-to-end collaborations including product launches, brand ambassadorships, sponsored social content (Reels, TikToks, YouTube), on-ground event and activation coverage, experiential reviews, unboxings, and co-branded community storytelling.'
  },
  {
    id: 'inf-faq-03',
    number: '03',
    question: 'Do you work with micro and nano-influencers or only top creators?',
    answer:
      'We work across the entire spectrum. While top macro creators deliver massive awareness, micro (10K–50K) and nano (2K–10K) creators often deliver significantly higher engagement, hyper-local trust, and authentic community connections across Dubai, Abu Dhabi, and the wider UAE.'
  },
  {
    id: 'inf-faq-04',
    number: '04',
    question: 'How do you measure the ROI and success of influencer campaigns?',
    answer:
      'We establish clear performance KPIs tailored to your objectives before launch: reach, impressions, engagement rates, click-throughs, promo code conversions, lead generation, and content asset quality. You receive transparent performance reporting following every campaign.'
  },
  {
    id: 'inf-faq-05',
    number: '05',
    question: 'Can you run campaigns targeting specific nationalities or expats in the UAE?',
    answer:
      'Yes. XPATZHUB has deep roots in the UAE expat community. We can target specific linguistic, cultural, and national demographics—including Western, South Asian, Arab, and European expat communities—ensuring your message resonates in a natural, relatable tone.'
  },
  {
    id: 'inf-faq-06',
    number: '06',
    question: 'Do you handle contracts, briefing, and content approvals?',
    answer:
      'Yes, we take care of the entire workflow. This includes creative briefing, pricing negotiation, contracts, UAE National Media Council (NMC) compliance guidance, pre-publishing content review, scheduling, and post-campaign tracking.'
  },
  {
    id: 'inf-faq-07',
    number: '07',
    question: 'Can our brand repurpose creator content for our own paid ads?',
    answer:
      'Absolutely. We negotiate content usage and whitelisting rights with creators in advance so your brand can repurpose high-performing creator videos, photos, and testimonials for your Meta Ads, Google Ads, website, and social channels.'
  },
  {
    id: 'inf-faq-08',
    number: '08',
    question: 'What industries do your influencer campaigns cater to?',
    answer:
      'We work with brands across hospitality, dining & F&B, luxury lifestyle, beauty & wellness, fashion, tech, real estate, consumer goods, entertainment, and professional services across the UAE.'
  },
  {
    id: 'inf-faq-09',
    number: '09',
    question: 'Are influencer campaigns suitable for startups or growing businesses?',
    answer:
      'Yes. Influencer marketing can be scaled efficiently for startups and niche businesses. By curating focused micro-creator gifting or targeted review campaigns, we help emerging brands build credibility and social proof without requiring massive corporate budgets.'
  },
  {
    id: 'inf-faq-10',
    number: '10',
    question: 'How do we get started with an influencer campaign with XPATZHUB?',
    answer:
      'Reach out with your campaign goals, target audience, and preferred timelines. Our creative strategy team will craft a tailored creator roster and campaign proposal designed around your brand and growth goals in the UAE.'
  }
];

export const influencerFaqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: influencerFaqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
};
