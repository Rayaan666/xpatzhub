import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './community-hero.css';

function Photo({ name, caption, alt, wide = false }) {
  return <figure className={`community-print community-print--${name}`}>
    <div className="community-print__frame">
      <img src={`/assets/community/${name}.png`} width={wide ? 3072 : 1024} height={wide ? 1024 : 1536} alt={alt} fetchPriority={wide ? 'auto' : 'high'} />
      <span className="community-print__film" aria-hidden="true">43&nbsp;&nbsp; ▸&nbsp;&nbsp; KODAK PORTRA 400</span>
      <span className="community-print__number" aria-hidden="true">43&nbsp; ▴</span>
      {!wide && <span className="community-print__tape" aria-hidden="true" />}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

export default function CommunityHero() {
  return <section className="community-hero" id="community" aria-labelledby="community-title">
    <div className="community-hero__canvas">
      <svg className="community-hero__thread" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true"><path d="M115 -5C22 28 46 60 24 114S-35 318 0 556C15 624 70 560 106 638" /><path d="M0 562C20 619 75 574 99 626S143 688 210 686 335 694 382 752M1700 48C1650 105 1591 73 1570 154M1700 561C1600 559 1567 607 1474 628S1452 707 1300 738" /></svg>
      <div className="community-hero__copy">
        <p className="community-hero__eyebrow">People. Connections. Real impact.</p>
        <h1 id="community-title"><span>Turn community</span><span>Into your brand’s</span><span>Advantage.</span></h1>
        <p className="community-hero__description">Connect your brand with one of the UAE’s largest and fastest-growing expat communities through authentic campaigns, partnerships, activations and experiences.</p>
        <div className="community-hero__actions">
          <a className="community-hero__primary" href="#" onClick={(e) => e.preventDefault()}>Connect With Our Community <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="community-hero__photos">
        <Photo name="coffee" caption="Your people." alt="Friends sharing coffee around a rustic café table." />
        <Photo name="market" caption="Your possibilities." alt="A woman browsing handmade ceramics at a warm, sunlit artisan market." />
        <Photo name="gathering" wide alt="Members of a UAE community gathering outdoors beneath warm festoon lights." />
      </div>
      <svg className="community-hero__palm" viewBox="0 0 300 340" aria-hidden="true"><g fill="currentColor">{Array.from({length: 12}, (_, i) => <path key={i} transform={`rotate(${i * 13 - 72} 20 330)`} d="M20 330Q-35 130 68 8Q24 183 20 330M20 330Q65 143 161 99Q64 230 20 330" />)}</g></svg>
      <ul className="community-hero__services" aria-label="Community services">{['Community campaigns', 'Partnerships', 'Activations', 'Events', 'UAE-wide reach'].map(service => <li key={service}>{service}</li>)}</ul>
    </div>
  </section>;
}

