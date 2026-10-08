export const eventsFaqData = [
  {
    id: 'types-of-events',
    number: '01',
    question: 'What types of events and experiences does XPATZHUB organize in the UAE?',
    answer:
      'We conceptualize and execute a wide spectrum of gatherings across Dubai, Abu Dhabi, and the wider UAE. This includes corporate summits, executive networking dinners, brand and product launches, retail and mall activations, community gatherings, panel discussions, media previews, and bespoke private celebrations. Every event is custom-tailored to foster real connections and measurable impact.',
  },
  {
    id: 'end-to-end-production',
    number: '02',
    question: 'Do you manage complete end-to-end event production and logistics?',
    answer:
      'Yes. Our team handles every stage from creative concept, venue sourcing, luxury decor, stage architecture, audiovisual production, lighting, permitting and licensing in Dubai/UAE, through to guest registration, VIP hospitality, on-ground coordination, and post-event recap assets.',
  },
  {
    id: 'audience-invitations',
    number: '03',
    question: 'Can you curate and invite targeted audiences, creators, and professionals to our event?',
    answer:
      'Absolutely. One of XPATZHUB’s greatest strengths is our organic 500,000+ UAE expat network and established relationships with premier business leaders, founders, tastemakers, and top creators. We ensure the room is filled with high-caliber, relevant guests tailored specifically to your brand.',
  },
  {
    id: 'timelines-lead-time',
    number: '04',
    question: 'How much lead time is typically needed to plan and produce an event?',
    answer:
      'While comprehensive corporate summits, exhibitions, or high-concept brand activations ideally require 4 to 8 weeks for permits, curation, and RSVPs, we also possess agile production capabilities to execute boutique networking meetups and brand showcases in as little as 2 to 3 weeks.',
  },
  {
    id: 'media-content-amplification',
    number: '05',
    question: 'How do you amplify the event across media, PR, and social channels?',
    answer:
      'We treat live events as multi-channel storytelling moments. In addition to high-definition on-site photo and video coverage, we can integrate creator live-stories, post-event PR press releases, executive interviews, and community recaps to extend your event’s reach far beyond the attendees in the venue.',
  },
  {
    id: 'venues-uae-locations',
    number: '06',
    question: 'Where in the UAE do you host and activate events?',
    answer:
      'We produce experiences across prime Dubai venues (Downtown, DIFC, Palm Jumeirah, Dubai Marina, Alserkal Avenue, luxury resorts, outdoor desert estates) as well as premier destinations in Abu Dhabi, Sharjah, and Ras Al Khaimah.',
  },
];

export const eventsFaqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: eventsFaqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
