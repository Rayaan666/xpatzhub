import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { seoContent } from './seoContent';
import './events-hero.css';
import EventsExperience from './EventsExperience';
import EventsCreate from './EventsCreate';

// Set these when the events listing and approved story video are available.
export const eventsConfig = { eventsUrl: null, storyUrl: seoContent.videoUrl };

export default function EventsPage() {
  const reduced = useReducedMotion();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [panel, setPanel] = useState('events');
  useEffect(() => {
    document.title = 'Events & Experiences in the UAE | XPATZHUB';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Meaningful brand events, networking experiences and community gatherings that connect people and businesses across the UAE.';
  }, []);
  const reveal = (delay, y = 0) => ({ initial: reduced ? false : { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } });
  const open = (type, event) => { trigger.current = event.currentTarget; setPanel(type); dialog.current.showModal(); };
  const primaryContent = <>Explore Our Events <ArrowUpRight size={23} aria-hidden="true" /></>;
  const storyContent = <><span className="events-play"><Play size={19} fill="currentColor" aria-hidden="true" /></span>Watch Our Story</>;
  return <main className="events-page">
    <section className="events-hero relative isolate overflow-hidden" aria-labelledby="events-title">
      <motion.picture className="events-photo" initial={reduced ? false : { scale: 1.025 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 1.5 }}>
        <source media="(max-width: 600px)" srcSet="/assets/events/portrait-600.webp 600w, /assets/events/portrait-1024.webp 1024w" sizes="100vw" width="1024" height="1536" />
        <img src="/assets/events/venue-1672.webp" srcSet="/assets/events/venue-1000.webp 1000w, /assets/events/venue-1672.webp 1672w" sizes="100vw" width="1672" height="941" fetchPriority="high" alt="Forest-green velvet curtains open onto a contemporary arts venue with cream ceiling sails, product displays and guests connecting around a central aisle." />
      </motion.picture>
      <div className="events-shade" aria-hidden="true" />
      <div className="events-heading">
        <motion.p className="events-eyebrow" {...reveal(0)}>EVENTS &amp; EXPERIENCES</motion.p>
        <h1 id="events-title" className="events-title">
          <motion.span {...reveal(.12, 15)}>More Than Events.</motion.span>
          <motion.span {...reveal(.24, 15)}>Experiences That Connect.</motion.span>
        </h1>
      </div>
      <motion.aside className="events-note" {...reveal(.95)}><span>People create<br />possibilities.</span><i aria-hidden="true" /></motion.aside>
      <div className="events-lower">
        <motion.p className="events-description" {...reveal(.5, 8)}>From exclusive networking experiences to high-impact brand events, we create meaningful opportunities for people, businesses and communities to connect, collaborate and grow across the UAE.</motion.p>
        <motion.div className="events-actions flex flex-col" {...reveal(.65, 8)}>
          {eventsConfig.eventsUrl ? <a className="events-primary" href={eventsConfig.eventsUrl}>{primaryContent}</a> : <button className="events-primary" onClick={event => open('events', event)}>{primaryContent}</button>}
          {eventsConfig.storyUrl ? <a className="events-story" href={eventsConfig.storyUrl}>{storyContent}</a> : <button className="events-story" onClick={event => open('story', event)}>{storyContent}</button>}
        </motion.div>
      </div>
      <div className="events-labels" aria-label="Event experiences">{['NETWORKING', 'BRAND EXPERIENCES', 'COMMUNITY EVENTS', 'BUSINESS GROWTH'].map(label => <span key={label}>{label}</span>)}</div>
    </section>
    <EventsExperience />
    <EventsCreate />
    <dialog className="events-dialog" ref={dialog} aria-labelledby="events-dialog-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <button className="events-close" aria-label="Close dialog" onClick={() => dialog.current.close()}><X /></button>
      <h2 id="events-dialog-title">{panel === 'events' ? 'Discover your next connection.' : 'Our story is coming soon.'}</h2>
      <p>{panel === 'events' ? 'Contact our team for upcoming events and opportunities to bring your brand experience to life across the UAE.' : 'In the meantime, connect with our team to learn more about XPATZHUB.'}</p>
      <a className="events-primary" href={`mailto:${seoContent.email}?subject=Events%20%26%20Experiences%20Enquiry`}>Get in touch <ArrowUpRight size={20} /></a>
    </dialog>
  </main>;
}
