import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search, Target, Users, Camera, Globe, Handshake, Monitor, Sparkles, Video, MousePointer2, Calendar, MapPin, Link, MessageCircle, BadgeCheck } from 'lucide-react';
import './solutions.css';

const atlas = '/assets/solutions-reference.webp';
const solutions = [
  { id: 'digital', number: '01', title: ['SEO &', 'DIGITAL MARKETING'], tagline: 'Turn Visibility Into Real Results.', description: 'Data-driven digital marketing solutions designed to increase your online visibility, generate qualified leads and grow your business across the UAE.', micro: ['SEARCH', 'ENGAGE', 'CONVERT'], photo: '40 194 480 345', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_50_PM.png', alt: 'A premium laptop showing blue campaign analytics beside a smartphone displaying Ideas, Clicks, Leads, Growth.', services: ['SEO', 'Google & Meta Ads', 'Social Media Marketing', 'Content Creation', 'Website Design & Development', 'Photography & Videography', 'Lead Generation', 'Digital Campaign Management'], icons: [Search, Target, Users, Monitor, Globe, Camera, MousePointer2, Sparkles], cta: 'Grow Your Brand With Us', accent: 'Visibility Drives Opportunity', accentBox: '343 799 123 123' },
  { id: 'community', number: '02', title: ['COMMUNITY', 'MARKETING'], tagline: 'Real People. Real Connections.', description: 'Tap into one of the UAE’s largest and fastest-growing expat communities and create meaningful connections through targeted community-driven initiatives.', micro: ['PEOPLE', 'CONNECTIONS', 'REAL IMPACT'], photo: '504 198 509 365', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_54_PM.png', alt: 'An evening expat gathering beneath string lights with the Burj Khalifa, Good People Great Brands signage and A Stronger UAE Together lettering.', services: ['Community Campaigns', 'Strategic Partnerships', 'Brand Collaborations', 'On-Ground Activations', 'Events & Meetups', 'UAE-Wide Reach'], icons: [Users, Handshake, Link, MapPin, Calendar, Globe], cta: 'Connect With Our Community', accent: 'Community Creates Opportunities', accentBox: '814 796 128 128' },
  { id: 'influencer', number: '03', title: ['INFLUENCER', 'MARKETING'], tagline: 'Real Stories. Real Influence.', description: 'Work with the right influencers and creators to showcase your brand authentically and reach highly relevant audiences across the UAE.', micro: ['AUTHENTICITY', 'STORIES', 'INFLUENCE'], photo: '1010 194 506 365', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_57_PM.png', alt: 'A stylish Dubai creator filming with a smartphone beside a fictional social content interface, with softly blurred Dubai architecture behind her.', services: ['Influencer Collaborations', 'Product Promotions', 'Social Media Campaigns', 'Brand Ambassadors', 'Content Creation', 'Campaign Management'], icons: [Users, MessageCircle, Monitor, BadgeCheck, Video, Sparkles], cta: 'Get Influencers On Your Brand', accent: 'Influence Builds Brands', accentBox: '1329 800 112 127' },
];

function ReferenceDetail({ viewBox, className, label }) {
  const photo = className === 'solution-photo-art';
  const clipId = `photo-${viewBox.split(' ')[0]}`;
  return <svg viewBox={viewBox} preserveAspectRatio={photo ? 'none' : 'xMidYMid meet'} className={className} role="img" aria-label={label}>{photo && <defs><clipPath id={clipId}><rect width="1536" height="505"/></clipPath></defs>}<image href={atlas} width="1536" height="1024" clipPath={photo ? `url(#${clipId})` : undefined} /></svg>;
}

export default function Solutions({ onEnquire }) {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const enterHeader = (distance, delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: distance }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .85, delay, ease: [.22, 1, .36, 1] } });
  const enterCard = (distance, delay = 0) => (isMobile || reduced ? {} : { initial: { opacity: 0, y: distance }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .85, delay, ease: [.22, 1, .36, 1] } });
  return <section className="solutions-section relative isolate overflow-hidden text-white" id="solutions" aria-labelledby="solutions-heading">
    <svg className="solutions-trails" viewBox="0 0 1536 1024" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><filter id="solutions-light"><feGaussianBlur stdDeviation="9" /></filter><linearGradient id="solutions-blue"><stop stopColor="#74caff"/><stop offset=".6" stopColor="#2482ff"/><stop offset="1" stopColor="#86c9ff"/></linearGradient></defs><g stroke="url(#solutions-blue)"><path d="M220 -40 C275 206 488 199 758 252 M-80 642 C91 408 310 471 441 619 M1285 670 C1450 657 1548 789 1610 945" strokeWidth="15" opacity=".55" filter="url(#solutions-light)"/><path d="M220 -40 C275 206 488 199 758 252 M-80 642 C91 408 310 471 441 619 M1285 670 C1450 657 1548 789 1610 945" strokeWidth="1.5" /></g></svg>
    <div className="solutions-core" aria-hidden="true">OUR<br/>CORE<br/>SOLUTIONS<span/></div>
    <ReferenceDetail viewBox="1382 35 124 151" className="solutions-note" label="Same Community Bigger Possibilities" />
    <motion.header {...enterHeader(25)} className="solutions-heading text-center"><p className="solutions-eyebrow">Three powerful ways to</p><h2 id="solutions-heading">Grow your <span>brand</span></h2><p className="solutions-intro">Strategic marketing, a powerful community and the right influencers —<br className="solutions-break"/> all working together to take your brand further in the UAE.</p></motion.header>
    <div className="solutions-panels grid grid-cols-1 md:grid-cols-3">
      {solutions.map((solution, index) => <motion.article key={solution.id} id={solution.id} {...enterCard(45 + index * 15, index * .12)} whileHover={isMobile || reduced ? undefined : { y: -6, scale: 1.005 }} className={`solution-panel solution-${solution.id}`} aria-labelledby={`${solution.id}-heading`}>
        <div className="solution-card-inner">
          <div className="solution-photo-container">
            <img src={solution.cloudinaryImg} alt={solution.alt} className="solution-photo-art" />
            <div className="solution-badge">
              <span className="solution-number">{solution.number}</span>
              <span className="solution-micro-tags">{solution.micro.join(' · ')}</span>
            </div>
            <div className="solution-photo-overlay" />
          </div>
          <div className="solution-body">
            <h3 id={`${solution.id}-heading`}>{solution.title.map(line => <span key={line}>{line}</span>)}</h3>
            <p className="solution-tagline">{solution.tagline}</p>
            <p className="solution-description">{solution.description}</p>
            <ul className="solution-services">
              {solution.services.map((service, i) => { const Icon = solution.icons[i]; return <li key={service}><span className="solution-service-icon" aria-hidden="true"><Icon size={13} strokeWidth={1.4}/></span><span>{service}</span></li>; })}
            </ul>
          </div>
          <button className="solution-cta" onClick={() => onEnquire(solution.id)}>
            <div className="solution-cta-bg" style={{ backgroundImage: `url(${solution.cloudinaryImg})` }} />
            <div className="solution-cta-overlay" />
            <div className="solution-cta-left">
              <span className="solution-cta-dot" />
              <span className="solution-cta-text">{solution.cta}</span>
            </div>
            <span className="solution-cta-arrow"><ArrowRight size={16} strokeWidth={2.2}/></span>
          </button>
        </div>
      </motion.article>)}
    </div>
    <div className="solutions-editorial" aria-label="XPATZHUB. Marketing, Events, Community. In the UAE."><span>XPATZHUB</span><i/><span>MARKETING · EVENTS · COMMUNITY</span><i/><span>IN THE UAE</span></div>
  </section>;
}
