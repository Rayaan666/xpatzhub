import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search, Target, Users, Camera, Globe, Handshake, Monitor, Sparkles, Video, MousePointer2, Calendar, MapPin, Link, MessageCircle, BadgeCheck } from 'lucide-react';
import './solutions.css';

const solutions = [
  { id: 'digital', number: '01', title: ['SEO &', 'DIGITAL MARKETING'], tagline: 'Turn Visibility Into Real Results.', description: 'Data-driven digital marketing solutions designed to increase your online visibility, generate qualified leads and grow your business across the UAE.', micro: ['SEARCH', 'ENGAGE', 'CONVERT'], photo: '40 194 480 345', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_50_PM.png', alt: 'A premium laptop showing blue campaign analytics beside a smartphone displaying Ideas, Clicks, Leads, Growth.', services: ['SEO', 'Google & Meta Ads', 'Social Media Marketing', 'Content Creation', 'Website Design & Development', 'Photography & Videography', 'Lead Generation', 'Digital Campaign Management'], icons: [Search, Target, Users, Monitor, Globe, Camera, MousePointer2, Sparkles], cta: 'Grow Your Brand With Us', accent: 'Visibility Drives Opportunity', accentBox: '343 799 123 123' },
  { id: 'community', number: '02', title: ['COMMUNITY', 'MARKETING'], tagline: 'Real People. Real Connections.', description: 'Tap into one of the UAE’s largest and fastest-growing expat communities and create meaningful connections through targeted community-driven initiatives.', micro: ['PEOPLE', 'CONNECTIONS', 'REAL IMPACT'], photo: '504 198 509 365', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_54_PM.png', alt: 'An evening expat gathering beneath string lights with the Burj Khalifa, Good People Great Brands signage and A Stronger UAE Together lettering.', services: ['Community Campaigns', 'Strategic Partnerships', 'Brand Collaborations', 'On-Ground Activations', 'Events & Meetups', 'UAE-Wide Reach'], icons: [Users, Handshake, Link, MapPin, Calendar, Globe], cta: 'Connect With Our Community', accent: 'Community Creates Opportunities', accentBox: '814 796 128 128' },
  { id: 'influencer', number: '03', title: ['INFLUENCER', 'MARKETING'], tagline: 'Real Stories. Real Influence.', description: 'Work with the right influencers and creators to showcase your brand authentically and reach highly relevant audiences across the UAE.', micro: ['AUTHENTICITY', 'STORIES', 'INFLUENCE'], photo: '1010 194 506 365', cloudinaryImg: 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_57_PM.png', alt: 'A stylish Dubai creator filming with a smartphone beside a fictional social content interface, with softly blurred Dubai architecture behind her.', services: ['Influencer Collaborations', 'Product Promotions', 'Social Media Campaigns', 'Brand Ambassadors', 'Content Creation', 'Campaign Management'], icons: [Users, MessageCircle, Monitor, BadgeCheck, Video, Sparkles], cta: 'Get Influencers On Your Brand', accent: 'Influence Builds Brands', accentBox: '1329 800 112 127' },
];


const categories = ['DIGITAL GROWTH', 'COMMUNITY', 'CREATOR MARKETING'];
const photoDescriptions = [
  'Cobalt-blue Dubai marketing workspace with a laptop, camera and warm skyline views.',
  'Guests networking beneath orange canopies and palms at a golden-hour Dubai gathering.',
  'Raspberry-red production studio with a professional camera, softbox and product setup.',
  'Emerald and champagne Dubai media studio with a broadcast microphone, camera and editorial print materials.',
  'Guests seen from behind at a premium corporate event with violet stage lighting and warm gold architectural details.',
];

function CampaignPanel({ solution, index, onEnquire }) {
  const panel = useRef(null);
  useEffect(() => {
    const element = panel.current;
    const measure = () => element.style.setProperty('--measured-height', `${element.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);
  return <article ref={panel} id={solution.id} className={`solution-panel solution-${solution.id}`} style={{ '--index': index }} aria-labelledby={`${solution.id}-heading`}>
    <img src={solution.image || `/assets/campaigns/${solution.id}.png`} srcSet={solution.srcSet} sizes={solution.srcSet ? '(max-width: 767px) calc(100vw - 28px), (max-width: 1870px) calc(100vw - 70px), 1800px' : undefined} alt={photoDescriptions[index]} className="solution-photo-art" loading="lazy" decoding="async" />
    <div className="solution-photo-overlay" />
    <div className="solution-badge"><span className="solution-number">{solution.number} / {categories[index]}</span><span className="solution-micro-tags">{solution.micro.join(' · ')}</span></div>
    <div className="solution-body">
      <h3 id={`${solution.id}-heading`}>{solution.title.map(line => <span key={line}>{line}</span>)}</h3>
      <p className="solution-tagline">{solution.tagline}</p>
      <p className="solution-description">{solution.description}</p>
      <ul className="solution-services">{solution.services.map(service => <li key={service}>{service}</li>)}</ul>
    </div>
    <button className="solution-cta" onClick={(e) => e.preventDefault()}><span>{solution.cta}</span><ArrowRight size={19} aria-hidden="true" /></button>
  </article>;
}

export default function Solutions({ onEnquire }) {
  const reduced = useReducedMotion();
  return <section className="solutions-section" id="solutions" aria-labelledby="solutions-heading">
    <motion.header className="solutions-heading" initial={reduced ? false : { opacity: .8, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
      <p className="solutions-eyebrow">Five powerful ways to</p>
      <h2 id="solutions-heading">Grow your <span>brand</span></h2>
      <p className="solutions-intro">Strategic digital marketing, community reach, creator power, high-impact PR, and events —<br className="solutions-break"/> all working seamlessly together to take your brand further in the UAE.</p>
    </motion.header>
    <div className="solutions-panels">{solutions.map((solution, index) => <CampaignPanel key={solution.id} solution={solution} index={index} onEnquire={onEnquire} />)}</div>
    <div className="solutions-editorial" aria-label="XPATZHUB. Marketing, Events, Community. In the UAE."><span>XPATZHUB</span><i/><span>MARKETING · EVENTS · COMMUNITY</span><i/><span>IN THE UAE</span></div>
  </section>;
}
