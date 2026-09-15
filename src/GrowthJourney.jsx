import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { growthContent } from './growthContent';
import { seoContent } from './seoContent';
import './growth-journey.css';

export default function GrowthJourney() {
  const stageRefs = React.useRef([]);

  const focusStage = (nextIndex) => {
    if (stageRefs.current[nextIndex]) {
      stageRefs.current[nextIndex].focus();
    }
  };

  return <section id="our-approach" className="growth-section" aria-labelledby="growth-title">
    <div className="growth-inner">
      <div className="growth-top">
        <div className="growth-heading">
          <p className="growth-eyebrow">OUR APPROACH</p>
          <h2 id="growth-title">From Visibility<br /><em>to <span>Growth.<svg viewBox="0 0 200 14" aria-hidden="true"><path d="M4 9 Q85 2 194 7 M8 11 Q100 6 196 9" /></svg></span></em></h2>
        </div>
        <div className="growth-intro">
          <p className="growth-lead">Digital marketing isn’t just about being online.<br />It’s about being found by the right people.</p>
          <p>XPATZHUB combines search, paid media, social, content and conversion-focused strategies to turn online visibility into measurable business opportunities across the UAE.</p>
        </div>
      </div>
      <div className="growth-journey">
        <svg className="growth-torn" viewBox="0 0 1672 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28 12 21 18 25 29 18 36 23 52 20 67 24 83 18 102 22 124 15 142 19 160 14 180 17 201 11 219 15 244 12 263 17 288 10 305 14 328 8 344 14 360 10 384 16 405 13 423 18 440 12 459 15 482 9 504 12 528 6 544 11 565 8 583 14 603 10 620 16 646 12 665 19 688 16 710 21 730 15 755 19 780 14 805 19 830 13 850 18 872 12 894 18 916 14 938 22 960 18 982 27 1005 23 1028 20 1050 26 1073 22 1095 28 1120 24 1142 30 1165 26 1186 34 1210 30 1232 35 1255 31 1278 37 1300 33 1325 36 1345 31 1370 34 1395 29 1420 33 1440 26 1463 28 1484 22 1504 26 1528 18 1548 21 1570 15 1592 18 1613 10 1632 14 1652 6 1672 12 V40 H0Z" /></svg>
        <svg className="growth-connector" viewBox="0 0 1500 320" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 165 C130 300 245 35 430 100 S650 285 820 185 S1000 125 1130 205 S1360 110 1550 135" /></svg>
        <ol className="growth-panels">
          {growthContent.stages.map((stage, index) => (
            <li className="growth-stage" key={stage.category}>
              <article ref={el => stageRefs.current[index] = el} tabIndex={-1} className="outline-none">
                <div className="growth-photo">
                  <img src={`/assets/approach-${stage.category.toLowerCase()}.png`} alt={stage.alt} width="1024" height="1024" loading="lazy" />
                  {index === 2 && <svg className="growth-click" viewBox="0 0 50 50" aria-hidden="true"><path d="M10 24 19 5 M25 35 43 22" /></svg>}
                  {index === 4 && <svg className="growth-up" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 86 Q48 48 83 14 M60 20 84 12 78 39 M15 83 82 15" /></svg>}
                </div>
                <p className="growth-category">{String(index + 1).padStart(2, '0')} — {stage.category}</p>
                <h3>{stage.title}</h3>
                <p className="growth-description">{stage.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <div className="growth-bottom"><p>REAL STRATEGY. REAL PEOPLE. REAL RESULTS.</p><a href="#contact" onClick={e => e.preventDefault()}>Let’s Grow Together <ArrowUpRight aria-hidden="true" /></a></div>
    </div>
  </section>;
}
