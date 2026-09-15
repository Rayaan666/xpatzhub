import { ArrowUpRight } from 'lucide-react';
import './influencers-hero.css';

const services = ['Collaborations', 'Product Promotions', 'Brand Ambassadors', 'Content Creation'];

export default function InfluencersHero({ onEnquire }) {
  return <section className="influencers-hero" aria-labelledby="influencers-title">
    <div className="influencers-hero__canvas">
      <h1 id="influencers-title" className="influencers-hero__title">
        <span>REAL STORIES.</span>
        <span>REAL <em>INFLUENCE.</em></span>
      </h1>
      <svg className="influencers-hero__quotes" viewBox="0 0 280 250" aria-hidden="true">
        <path fill="currentColor" d="M124 0C40 0 0 47 0 132v118h124V113H62c0-39 24-59 62-61V0Zm156 0c-84 0-124 47-124 132v118h124V113h-62c0-39 24-59 62-61V0Z" />
      </svg>
      <div className="influencers-hero__copy">
        <p className="influencers-hero__eyebrow">INFLUENCER MARKETING · UAE</p>
        <p className="influencers-hero__description">Work with the right influencers and creators to showcase your brand authentically and reach highly relevant audiences across the UAE.</p>
        <button className="influencers-hero__cta" onClick={onEnquire}>Find Your Brand’s Voice <ArrowUpRight size={23} aria-hidden="true" /></button>
        <a className="influencers-hero__explore" href="#influencer">Explore Collaborations</a>
      </div>
      <div className="influencers-hero__scene">
        <img src="/assets/influencers/studio-scene.png" width="1536" height="1024" fetchPriority="high" alt="A creator with dark hair in a loose bun crouches behind her camera, photographing perfume, sculptural glassware and a pale flower on a lime studio plinth." />
        <img className="influencers-hero__foreground" src="/assets/influencers/studio-scene.png" width="1536" height="1024" alt="" aria-hidden="true" />
        <img className="influencers-hero__product" src="/assets/influencers/studio-scene.png" width="1536" height="1024" alt="" aria-hidden="true" />
      </div>
      <p className="influencers-hero__caption">THE RIGHT VOICE.<br />THE RIGHT CONNECTION.</p>
      <ul className="influencers-hero__services" aria-label="Influencer services">{services.map(service => <li key={service}>{service}</li>)}</ul>
    </div>
  </section>;
}
