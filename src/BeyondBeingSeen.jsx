import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './beyond-being-seen.css';

const stages = [['EXPOSURE', 'SEEN'], ['CONVERSATION', 'HEARD'], ['CREDIBILITY', 'TRUSTED'], ['RECOGNITION', 'REMEMBERED']];

export default function BeyondBeingSeen() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .15 },
    transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay },
  });
  return <section id="beyond-being-seen" className="bbs-section" aria-labelledby="bbs-title">
    <div className="bbs-inner">
      <motion.header className="bbs-intro grid" {...reveal()}>
        <div>
          <p className="bbs-eyebrow">WHY VISIBILITY MATTERS<span aria-hidden="true" /></p>
          <h2 id="bbs-title"><span>Visibility Gets Attention.</span><span>Credibility Builds Brands.</span></h2>
        </div>
        <p className="bbs-description">Being visible is only the beginning. The right media exposure, conversations and brand opportunities help businesses build recognition, strengthen credibility and stay remembered by the audiences that matter.</p>
      </motion.header>
      <div className="bbs-composition grid">
        <motion.figure className="bbs-photo" {...reveal(.08)}>
          <img src="/assets/pr-visibility/interview-1440.webp" srcSet="/assets/pr-visibility/interview-720.webp 720w, /assets/pr-visibility/interview-1440.webp 1440w" sizes="(max-width: 767px) calc(100vw - 44px), 44vw" width="1440" height="900" loading="lazy" alt="Close-up of an interviewer holding a microphone toward a business professional’s gesturing hands, with camera equipment softly blurred behind them." />
          <figcaption>THE CONVERSATIONS THAT COUNT.</figcaption>
          <div className="bbs-note"><span>Real conversations.<br />Real opportunities.</span><svg viewBox="0 0 100 12" aria-hidden="true"><path d="M4 10 Q50 5 96 2" /></svg></div>
        </motion.figure>
        <ol className="bbs-stages">
          {stages.map(([label, word], index) => <motion.li key={word} {...reveal(.12 + index * .12)}>
            <div className="bbs-label"><span>{String(index + 1).padStart(2, '0')} /</span>{label}</div>
            <div className={`bbs-word ${index === 3 ? 'bbs-remembered' : ''}`}>{word}
              {index === 3 && <svg className="bbs-oval" viewBox="0 0 520 112" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M506 54 C511 20 395 2 259 5 C112 6 9 27 9 61 C9 100 162 112 300 106 C436 104 509 85 506 54 M413 17 C319 -2 148 3 64 28" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : .65 }} /></svg>}
            </div>
          </motion.li>)}
        </ol>
      </div>
    </div>
    <motion.div className="bbs-manifesto" {...reveal()}>
      <div className="bbs-statements"><p>PR ISN’T JUST ABOUT GETTING YOUR NAME OUT THERE.</p><p>IT’S ABOUT GIVING PEOPLE A REASON TO REMEMBER IT.</p></div>
      <div className="bbs-purpose"><p>Visibility with purpose.</p><svg viewBox="0 0 100 12" aria-hidden="true"><path d="M4 10 Q50 5 96 2" /></svg><span>VISIBILITY → TRUST → RECOGNITION → LONGER IMPACT</span></div>
    </motion.div>
  </section>;
}
