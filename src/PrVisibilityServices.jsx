import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { seoContent } from './seoContent';
import './pr-visibility-services.css';

// Replace any destination with its dedicated service page when available.
export const prServices = [
  { title: 'EARNED MEDIA', services: 'Media Relations · Press & News Coverage', description: 'Build connections with relevant media and increase visibility through newspaper, digital publication and online news opportunities.', href: null },
  { title: 'THE CONVERSATION', services: 'Radio & TV Features · Interviews & Brand Features', description: 'Bring your brand story to broadcast audiences and turn your company, founders and ideas into stories people want to follow.', href: null },
  { title: 'THE VOICE', services: 'Podcast Opportunities', description: 'Create opportunities for deeper conversations through relevant podcast appearances and collaborations.', href: null },
  { title: 'THE CITY', services: 'Outdoor & Billboard Advertising · Mall & Community Branding · Strategic Brand Campaigns', description: 'Take visibility beyond the screen and position your brand in high-footfall environments through impactful outdoor placements, community branding and integrated campaigns.', href: null },
];

export default function PrVisibilityServices() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay } });
  return <section id="pr-services" className="pvs-section relative isolate" aria-labelledby="pvs-title">
    <header className="pvs-intro">
      <motion.p className="pvs-eyebrow" {...reveal()}>HOW WE PUT YOUR BRAND IN THE SPOTLIGHT</motion.p>
      <motion.h2 id="pvs-title" {...reveal(.08)}>More Ways to Be Seen. More Reasons to <span>Be Remembered.</span></motion.h2>
      <motion.p className="pvs-description" {...reveal(.16)}>From media coverage and interviews to outdoor visibility and strategic brand campaigns, we create opportunities<br className="pvs-wide-break" /> for your brand to show up in the right places, with the right story.</motion.p>
    </header>
    <motion.picture className="pvs-photograph" initial={reduced ? false : { opacity: 0, scale: 1.02 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1 }}>
      <source media="(max-width: 1000px)" srcSet="/assets/pr-visibility/services-900.webp 900w, /assets/pr-visibility/services-1672.webp 1672w" sizes="130vw" />
      <img src="/assets/pr-visibility/services-1672.webp" width="1672" height="941" loading="lazy" alt="Silver studio microphone and black headphones beside a folded newspaper and a Dubai billboard photographic print, with a dusty-rose cable looping across a dark tabletop." />
    </motion.picture>
    <div className="pvs-services grid">
      {prServices.map((service, index) => <motion.article className={`pvs-service pvs-service-${index + 1}`} key={service.title} {...reveal(index * .1)} aria-labelledby={`pvs-service-title-${index}`}>
        <div className="pvs-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<span /></div>
        <h3 id={`pvs-service-title-${index}`}>{service.title}</h3>
        <p className="pvs-service-names">{service.services}</p>
        <p className="pvs-service-description">{service.description}</p>
        <a className="pvs-explore" href={service.href || `mailto:${seoContent.email}?subject=${encodeURIComponent(`PR enquiry — ${service.title}`)}`} aria-label={`Explore ${service.title.toLowerCase()}`}><span className="pvs-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 12h15M12 5l7 7-7 7" /></svg></span>Explore</a>
      </motion.article>)}
    </div>
    <motion.div className="pvs-closing" {...reveal()}><p>Your story deserves <span>the right stage.</span></p><div className="pvs-handwriting"><span aria-hidden="true" />Stories create opportunities.</div></motion.div>
  </section>;
}
