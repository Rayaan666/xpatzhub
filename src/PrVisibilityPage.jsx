import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { seoContent } from './seoContent';
import './pr-visibility.css';
import BeyondBeingSeen from './BeyondBeingSeen';
import PrVisibilityServices from './PrVisibilityServices';

export const prVisibilityConfig = {
  enquiryUrl: `mailto:${seoContent.email}?subject=PR%20%26%20Brand%20Visibility%20Enquiry`,
  storyUrl: null,
};

export default function PrVisibilityPage() {
  const reduced = useReducedMotion();
  const dialog = useRef(null);
  const storyButton = useRef(null);
  useEffect(() => {
    document.title = 'PR & Brand Visibility | XPATZHUB';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Build stronger brand recognition and credibility through strategic PR, media exposure and high-impact visibility opportunities across the UAE.';
  }, []);
  const reveal = (delay = 0, y = 0) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] },
  });
  return <main className="pr-page">
    <section className="pr-hero relative isolate overflow-hidden" aria-labelledby="pr-title">
      <motion.img className="pr-photograph" src="/assets/pr-visibility/newspaper.png" alt="A curved newspaper titled The Brand Story, featuring a monochrome interview in Dubai, with a loose photographic print on the studio surface." initial={reduced ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : 1.1 }} fetchPriority="high" />
      <motion.p className="pr-eyebrow" {...reveal()}>PR &amp; BRAND VISIBILITY<span aria-hidden="true" /></motion.p>
      <h1 id="pr-title" className="pr-title">
        {['Be Seen.', 'Be Heard.', 'Be Remembered.'].map((line, i) => <motion.span key={line} {...reveal(.12 + i * .12, 18)}>{line}</motion.span>)}
      </h1>
      <motion.div className="pr-support" {...reveal(.55, 8)}>
        <p>Build stronger brand recognition and credibility through strategic PR, media exposure and high-impact visibility opportunities across the UAE.</p>
        <div className="pr-actions flex items-center">
          <a className="pr-primary" href={prVisibilityConfig.enquiryUrl}>Elevate Your Brand <span aria-hidden="true">↗</span></a>
          {prVisibilityConfig.storyUrl ? <a className="pr-story" href={prVisibilityConfig.storyUrl}><Play />Watch Our Story</a> : <button className="pr-story" ref={storyButton} onClick={() => dialog.current.showModal()}><Play />Watch Our Story</button>}
        </div>
      </motion.div>
      <motion.aside className="pr-editorial" {...reveal(.85)} aria-label="Our approach">
        <p>GOOD<br />STORIES.</p><p>STRONGER<br />REPUTATIONS.</p><span className="pr-short-rule" aria-hidden="true" /><p className="pr-handwriting">More than<br />publicity.</p>
      </motion.aside>
      <motion.div className="pr-bottom" {...reveal(.95)}>{['MEDIA EXPOSURE', 'BRAND CREDIBILITY', 'LASTING RECOGNITION'].map(label => <span key={label}>{label}</span>)}</motion.div>
    </section>
    <BeyondBeingSeen />
    <PrVisibilityServices />
    <dialog className="pr-dialog" ref={dialog} onClose={() => storyButton.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }} aria-labelledby="pr-story-title">
      <button className="pr-dialog-close" aria-label="Close" onClick={() => dialog.current.close()}>×</button>
      <h2 id="pr-story-title">Our story is coming soon.</h2><p>In the meantime, let’s talk about yours.</p><a className="pr-primary" href={prVisibilityConfig.enquiryUrl}>Get in touch <span aria-hidden="true">↗</span></a>
    </dialog>
  </main>;
}

function Play() { return <span className="pr-play" aria-hidden="true"><svg width="16" height="18" viewBox="0 0 16 18"><path d="M2 1 15 9 2 17Z" fill="currentColor" /></svg></span>; }
