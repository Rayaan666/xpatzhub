import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './why-influence-works.css';

const principles = [
  { word: 'TRUST', label: 'TRUST', text: 'People listen to creators they already know and follow.', line: 'M208 92 L455 131', dot: [455, 131] },
  { word: 'RELEVANCE', label: 'RELEVANCE', text: 'The right audience matters more than the biggest audience.', line: 'M1280 52 L1032 103', dot: [1032, 103] },
  { word: 'STORY', label: 'STORYTELLING', text: 'Products become more relatable when they’re part of a genuine story.', line: 'M213 340 L387 383', dot: [387, 383] },
  { word: 'CONNECTION', label: 'CONNECTION', text: 'Authentic creator content can turn attention into conversation and action.', line: 'M1304 340 L1179 366', dot: [1179, 366] },
];

export default function WhyInfluenceWorks() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const reveal = { initial: reduced ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .6 } };

  return <section className="why-influence relative overflow-hidden" aria-labelledby="why-influence-title">
    <div className="why-influence__inner mx-auto w-full">
      <motion.header {...reveal} className="why-influence__intro grid">
        <div>
          <p className="why-influence__eyebrow">BEYOND FOLLOWERS</p>
          <h2 id="why-influence-title">Influence Isn’t About Reach.<br />It’s About <em>Relevance.</em></h2>
        </div>
        <p className="why-influence__lead">The right creator does more than put your brand in front of people. They bring trust, personality and an authentic voice that helps audiences genuinely connect with what you offer.</p>
      </motion.header>
      <div className="why-influence__composition relative">
        <motion.figure {...reveal} className="why-influence__photo overflow-hidden">
          <img src="/assets/influencers/creator-cafe-1536.webp" srcSet="/assets/influencers/creator-cafe-768.webp 768w, /assets/influencers/creator-cafe-1536.webp 1536w" sizes="(max-width: 1000px) 90vw, (max-width: 1680px) 58.3vw, 975px" width="1536" height="864" loading="lazy" decoding="async" alt="A creator arranges skincare at a sunlit café table as a camera operator films, with ceramic cups, greenery, palms and the Dubai skyline beyond the windows." />
        </motion.figure>
        <svg className="why-influence__lines" viewBox="0 0 1528 530" preserveAspectRatio="none" aria-hidden="true">
          {principles.map((item, index) => <g key={item.word}>
            <motion.path d={item.line} initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .9, delay: index * .12 }} />
            <circle cx={item.dot[0]} cy={item.dot[1]} r="4.5" />
          </g>)}
        </svg>
        <div className="why-influence__words" aria-hidden="true">{principles.map((item, index) => <span key={item.word} className={`why-influence__word why-influence__word--${index}`}>{item.word}</span>)}</div>
        <ol className="why-influence__callouts">
          {principles.map((item, index) => <motion.li {...reveal} transition={{ duration: .6, delay: reduced ? 0 : index * .1 }} key={item.word} id={`influence-${item.word.toLowerCase()}`} className={`why-influence__callout why-influence__callout--${index} ${active === index ? 'is-active' : ''}`}>
            <h3><span>0{index + 1}</span> — {item.label}</h3>
            <p>{item.text}</p>
          </motion.li>)}
        </ol>
      </div>
      <div className="why-influence__bottom flex items-end justify-between">
        <blockquote className="why-influence__quote"><span>Followers see.</span><span>Communities listen.</span></blockquote>
        <nav aria-label="Explore why influence works"><ol className="why-influence__sequence flex flex-wrap">{principles.map((item, index) => <li key={item.word}><button type="button" className={active === index ? 'is-active' : ''} aria-pressed={active === index} aria-controls={`influence-${item.word.toLowerCase()}`} aria-label={`Emphasize ${item.label.toLowerCase()}`} onClick={() => setActive(index)}>{item.word}</button></li>)}</ol></nav>
      </div>
    </div>
  </section>;
}
