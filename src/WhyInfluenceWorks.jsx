import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import './why-influence-works.css';

const principles = [
  { word: 'TRUST', label: 'TRUST', text: 'People listen to creators they already know and follow.', line: 'M198 88 L432 126', dot: [432, 126] },
  { word: 'RELEVANCE', label: 'RELEVANCE', text: 'The right audience matters more than the biggest audience.', line: 'M1200 50 L988 98', dot: [988, 98] },
  { word: 'STORY', label: 'STORYTELLING', text: 'Products become more relatable when they’re part of a genuine story.', line: 'M201 320 L361 361', dot: [361, 361] },
  { word: 'CONNECTION', label: 'CONNECTION', text: 'Authentic creator content can turn attention into conversation and action.', line: 'M1200 322 L1114 346', dot: [1114, 346] },
];

export default function WhyInfluenceWorks() {
  const section = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', progress => {
    if (!reduced) setActive(progress < .32 ? 0 : progress < .53 ? 1 : progress < .7 ? 2 : 3);
  });
  const reveal = { initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .65 } };

  return <section ref={section} className="why-influence relative overflow-hidden" aria-labelledby="why-influence-title">
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
          <motion.img src="/assets/influencers/creator-cafe-1536.webp" srcSet="/assets/influencers/creator-cafe-768.webp 768w, /assets/influencers/creator-cafe-1536.webp 1536w" sizes="(max-width: 900px) 90vw, (max-width: 1600px) 58vw, 922px" width="1536" height="864" loading="lazy" decoding="async" alt="A creator in a linen shirt arranges unbranded skincare on a café table while a camera operator films, with palms and the Dubai skyline beyond the sunlit windows." animate={reduced ? undefined : { scale: active === 2 ? 1.025 : 1.01, objectPosition: ['48% 48%', '51% 48%', '49% 53%', '53% 50%'][active] }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
        </motion.figure>

        <svg className="why-influence__lines" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true">
          {principles.map((item, index) => <g key={item.word} className={active === index ? 'is-active' : ''}>
            <motion.path d={item.line} initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .9, delay: index * .12 }} />
            <circle cx={item.dot[0]} cy={item.dot[1]} r="4" />
          </g>)}
        </svg>

        <div className="why-influence__words" aria-hidden="true">{principles.map((item, index) => <span key={item.word} className={`why-influence__word why-influence__word--${index} ${active === index ? 'is-active' : ''}`}>{item.word}</span>)}</div>
        <ol className="why-influence__callouts">
          {principles.map((item, index) => <li key={item.word} className={`why-influence__callout why-influence__callout--${index}`}>
            <h3><span>0{index + 1}</span> — {item.label}</h3>
            <p>{item.text}</p>
          </li>)}
        </ol>
      </div>

      <div className="why-influence__bottom flex items-end justify-between">
        <blockquote className="why-influence__quote"><span>Followers see.</span><span>Communities listen.</span></blockquote>
        <ol className="why-influence__sequence flex flex-wrap" aria-label="Why influence works">{principles.map((item, index) => <li key={item.word} className={active === index ? 'is-active' : ''} aria-current={active === index ? 'step' : undefined}>{item.word}</li>)}</ol>
      </div>
    </div>
  </section>;
}
