import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './events-experience.css';

const stages = [
  ['ARRIVE', 'Step into an environment designed to inspire.'],
  ['DISCOVER', 'Be introduced to new ideas, brands and opportunities.'],
  ['CONNECT', 'Meaningful conversations lead to real relationships.'],
  ['EXPERIENCE', 'Immersive moments create deeper engagement.'],
  ['REMEMBER', 'Lasting impressions turn into long-term value.'],
];

export default function EventsExperience() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0, y = 12) => ({ initial: reduced ? false : { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } });
  return <section className="event-experience relative overflow-hidden" aria-labelledby="experience-title">
    <div className="experience-editorial">
      <header className="experience-intro">
        <div>
          <motion.p className="experience-eyebrow" {...reveal()}>WHY EXPERIENCES MATTER</motion.p>
          <motion.h2 id="experience-title" className="experience-title" {...reveal(.08)}><span>People Forget Ads.</span><span>They Remember Experiences.</span></motion.h2>
        </div>
        <motion.p className="experience-summary" {...reveal(.16)}>Experiences bring people, brands and communities together in a way that goes beyond marketing. They create real connections, spark new opportunities and leave a lasting impression.</motion.p>
      </header>
      <div className="experience-body">
        <div className="experience-visual">
          <div className="experience-circle-wrap">
            <div className="experience-circle">
              <motion.img src="/assets/events/workshop-1200.webp" srcSet="/assets/events/workshop-640.webp 640w, /assets/events/workshop-1200.webp 1200w" sizes="(max-width: 700px) 82vw, 42vw" width="1200" height="1200" loading="lazy" alt="Participants in linen and forest-green clothing gathered around a pottery workshop table, photographed from behind in a sunlit studio." initial={reduced ? false : { opacity: 0, scale: 1.02 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .9 }} />
            </div>
            <svg className="experience-arc" viewBox="0 0 650 650" fill="none" aria-hidden="true"><motion.path d="M 424 10 A 330 330 0 0 1 640 234" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : .25 }} /></svg>
          </div>
          <motion.img className="experience-detail" src="/assets/events/bowl-560.webp" srcSet="/assets/events/bowl-320.webp 320w, /assets/events/bowl-560.webp 560w" sizes="(max-width: 700px) 38vw, 17vw" width="560" height="490" loading="lazy" alt="Hands holding a handmade sage-green ceramic bowl above a kraft-paper bag." {...reveal(.2)} />
          <motion.p className="experience-note" {...reveal(.25, 0)}><span>Real People.<br />Real Moments.<br />Real Impact.</span><svg viewBox="0 0 140 35" fill="none" aria-hidden="true"><path d="M 4 30 Q 65 8 136 5" stroke="currentColor" strokeWidth="1.5" /></svg></motion.p>
        </div>
        <ol className="experience-journey">
          {stages.map(([title, text], index) => <motion.li key={title} {...reveal(index * .09)}><span className="experience-number" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></motion.li>)}
        </ol>
      </div>
    </div>
    <div className="experience-band">
      <motion.div {...reveal()}><p className="experience-band-eyebrow">IT’S NOT JUST AN EVENT.</p><p className="experience-statement">IT’S A MOMENT PEOPLE CARRY WITH THEM.</p></motion.div>
      <motion.p className="experience-band-note" {...reveal(.15)}>EXPERIENCES CREATE<br />STRONGER COMMUNITIES.</motion.p>
    </div>
  </section>;
}
