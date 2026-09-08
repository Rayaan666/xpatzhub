import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import './mobile-hero.css';

const phones = [
  { id: 'digital', title: 'Digital Marketing. Turn visibility into real results. Laptop and campaign analytics.', x: 30, y: 0 },
  { id: 'events', title: 'Events & Experiences. From ideas to unforgettable experiences. A premium UAE event.', x: -30, y: 0 },
  { id: 'pr', title: 'PR & Media Visibility. Get seen. Get heard. Build credibility. Press microphone.', x: -25, y: 0 },
  { id: 'community', title: 'Community Power. A stronger UAE through stronger connections. Community overlooking Dubai at sunset.', x: 25, y: 0 },
  { id: 'main', title: 'Brands. Events. People. Possibilities. Dubai and the Burj Khalifa. Scroll to explore.', x: 0, y: 60 },
];
const ease = [.22, 1, .36, 1];

export default function MobileHero({ onOpen }) {
  const reduced = useReducedMotion();
  const reveal = (delay, distance = 15) => ({
    initial: reduced ? false : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .85, delay, ease },
  });
  return <div className="mobile-hero">
    <div className="mobile-hero-copy">
      <motion.p className="mobile-eyebrow" {...reveal(0, 0)}>MARKETING · EVENTS · PR · COMMUNITY</motion.p>
      <motion.h1 className="mobile-headline" {...reveal(.08, 25)}>
        <span>YOUR</span><span>BRAND’S</span><span className="mobile-growth">GROWTH</span><span>PARTNER</span>
      </motion.h1>
      <motion.div {...reveal(.18)} className="mobile-location">IN THE UAE<span /></motion.div>
      <motion.p {...reveal(.25)} className="mobile-description">We help brands, products and services<br />reach, engage and grow across the UAE<br />through Digital Marketing, Events, PR and<br />the power of our expat community.</motion.p>
      <motion.div {...reveal(.32)}>
        <button className="mobile-grow" onClick={e => e.preventDefault()}>Let’s Grow Your Brand <ArrowRight size={25} /></button>
      </motion.div>
      <motion.button {...reveal(.4)} className="mobile-story" onClick={e => e.preventDefault()}><span><Play size={18} fill="currentColor" /></span>Watch Our Story</motion.button>
    </div>
    <div className="mobile-phone-collage">
      <svg className="mobile-trails" viewBox="0 0 390 800" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs><filter id="mobile-trail-glow"><feGaussianBlur stdDeviation="3" /></filter></defs>
        <g stroke="#008eff"><path d="M420 0 C320 120 295 238 132 293 S-28 345 -45 408 M-40 627 C40 495 140 427 270 440 S400 540 423 691" strokeWidth="7" filter="url(#mobile-trail-glow)" /></g>
        <path d="M420 0 C320 120 295 238 132 293 S-28 345 -45 408 M-40 627 C40 495 140 427 270 440 S400 540 423 691" stroke="#66ceff" strokeWidth="1.2" />
      </svg>
      {phones.map((phone, index) => <div key={phone.id} className={`mobile-phone mobile-phone-${phone.id}`}>
        <motion.div initial={reduced ? false : { opacity: 0, x: phone.x, y: phone.y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: 1.1, delay: index * .09, ease }}>
          <motion.img src={`/assets/mobile-${phone.id}.webp`} width={phone.id === 'main' ? 600 : 440} height={phone.id === 'main' ? 1260 : 880} alt={phone.title} decoding="async" loading="lazy" animate={reduced ? {} : { y: [0, -4, 0] }} transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut', delay: 1.5 + index * .15 }} />
        </motion.div>
      </div>)}
    </div>
    {/* Preserve the existing hero's figures and labels; these are not newly verified claims. */}
    <dl className="mobile-hero-stats">
      <div><dt>COMMUNITY REACH</dt><dd>500K+</dd></div>
      <div><dt>BRANDS WORKED WITH</dt><dd>250+</dd></div>
      <div><dt>EVENTS & CAMPAIGNS</dt><dd>1000+</dd></div>
    </dl>
  </div>;
}
