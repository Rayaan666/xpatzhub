import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { seoContent } from './seoContent';
import './events-create.css';

const categories = [
  { id: 'business', label: 'CORPORATE & BUSINESS', title: 'Business.', tagline: 'Meaningful Business Connections.', services: ['Corporate Events · Conferences', 'Seminars & Webinars · Networking', 'Awards · Team Building'], link: 'Explore corporate events', subject: 'Corporate Events Enquiry', alt: 'Guests networking beside forest-green lounge seating and floor-to-ceiling windows overlooking the Dubai skyline.', width: 1200, height: 900 },
  { id: 'brands', label: 'BRANDS & ACTIVATIONS', title: 'Brands.', tagline: 'Ideas That Make an Impact.', services: ['Product & Brand Launches · Exhibitions', 'Retail & Mall Activations · Promotions', 'Roadshows · Brand Experiences'], link: 'Explore brand activations', subject: 'Brand Activations Enquiry', alt: 'Guests exploring circular product displays beneath sculptural translucent green fabric in an architectural venue.', width: 1200, height: 1500 },
  { id: 'celebrations', label: 'PRIVATE & SOCIAL', title: 'Celebrations.', tagline: 'Celebrations That Bring People Closer.', services: ['Weddings · Birthdays · Baby Showers', 'Engagements · Anniversaries', 'Family & Private Celebrations'], link: 'Explore private events', subject: 'Private Events Enquiry', alt: 'An intimate garden celebration with guests chatting around a candlelit table beneath trees and hanging lanterns.', width: 1200, height: 1000 },
];

export default function EventsCreate() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } });
  return <section className="events-create relative" aria-labelledby="create-title">
    <header className="create-intro">
      <motion.div {...reveal()}>
        <p className="create-eyebrow">EVENTS FOR EVERY MOMENT</p>
        <h2 id="create-title"><span>Different Moments.</span><span>One Unforgettable Experience.</span></h2>
      </motion.div>
      <motion.p className="create-summary" {...reveal(.12)}>From corporate milestones to brand activations and private celebrations, we create bespoke experiences that bring people together and turn ideas into lasting memories.</motion.p>
    </header>
    <div className="create-columns grid">
      {categories.map((category, index) => <motion.article className={`create-category create-${category.id}`} key={category.id} aria-labelledby={`create-${category.id}-title`} {...reveal(index * .12)}>
        <div className="create-photo">
          <img src={`/assets/events/create-${category.id}-1200.webp`} srcSet={`/assets/events/create-${category.id}-640.webp 640w, /assets/events/create-${category.id}-1200.webp 1200w`} sizes="(max-width: 1000px) 94vw, 36vw" width={category.width} height={category.height} loading="lazy" alt={category.alt} />
        </div>
        <div className="create-copy">
          <p className="create-label"><span>0{index + 1}</span>{category.label}</p>
          <h3 id={`create-${category.id}-title`}>{category.title}</h3>
          <p className="create-tagline">{category.tagline}</p>
          <ul className="create-services">{category.services.map(line => <li key={line}>{line}</li>)}</ul>
          <a className="create-link" href={`mailto:${seoContent.email}?subject=${encodeURIComponent(category.subject)}`} aria-label={category.link}><svg width="38" height="20" viewBox="0 0 38 20" fill="none" aria-hidden="true"><path d="M2 10H33M27 5L33 10L27 15" stroke="currentColor" strokeWidth="1.2" /></svg></a>
        </div>
      </motion.article>)}
    </div>
    <motion.footer className="create-footer" {...reveal()}>
      <p>Every occasion. <em>Something bigger.</em></p>
      <ul aria-label="Event outcomes"><li>PEOPLE TOGETHER</li><li>BRANDS STRONGER</li><li>COMMUNITIES CLOSER</li></ul>
    </motion.footer>
  </section>;
}
