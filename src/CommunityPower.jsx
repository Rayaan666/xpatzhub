import React from 'react';
import './community-power.css';

const stages = [
  { name: 'Discover', alt: 'A hand holding a local candle beside coffee and flowers on a wooden café table.' },
  { name: 'Connect', alt: 'Friends enjoying a relaxed conversation over coffee in a leafy café.' },
  { name: 'Experience', alt: 'Visitors exploring an outdoor UAE community event beneath sunset skies and string lights.' },
  { name: 'Share', alt: 'A visitor photographing an artisan display with their phone.' },
  { name: 'Grow', alt: 'Hands exchanging a business card across a table with a notebook and pen.' },
];

export default function CommunityPower() {
  return <section className="community-power" aria-labelledby="community-power-title">
    <div className="community-power__inner">
      <header className="community-power__intro">
        <div>
          <p className="community-power__eyebrow">WHY COMMUNITY MATTERS</p>
          <h2 id="community-power-title"><span>Real People.</span><span>Real Connections.</span><span>Real Influence.</span></h2>
        </div>
        <p className="community-power__description">Marketing becomes more powerful when people genuinely connect with it. XPATZHUB gives brands access to an active UAE expat community, creating opportunities to build awareness, conversations and lasting relationships beyond traditional advertising.</p>
      </header>
      <ol className="community-power__journey" aria-label="The community journey">
        {stages.map(({name, alt}, index) => <li className={`community-power__stage community-power__stage--${name.toLowerCase()}`} key={name}>
          <figure>
            <figcaption>{name}</figcaption>
            <div className="community-power__print"><img src={`/assets/community-power/${name.toLowerCase()}.png`} width="1024" height="1280" alt={alt} loading="lazy" decoding="async" /></div>
          </figure>
          {index < stages.length - 1 && <svg className="community-power__arrow" viewBox="0 0 120 70" fill="none" aria-hidden="true"><path d="M5 56C35 18 77 10 109 38M97 24L110 39L92 40" /></svg>}
        </li>)}
      </ol>
      <div className="community-power__closing">
        <blockquote className="community-power__quote"><span>People don’t connect with campaigns.</span><span>They connect with experiences.</span><svg viewBox="0 0 440 38" fill="none" aria-hidden="true"><path d="M5 31Q181 0 434 10" /></svg></blockquote>
        <p className="community-power__statement"><span>ONE COMMUNITY.</span><span>ENDLESS POSSIBILITIES.</span></p>
      </div>
    </div>
  </section>;
}
