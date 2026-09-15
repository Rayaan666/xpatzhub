import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Camera, Video, Laptop, Users, ChartNoAxesColumnIncreasing, Instagram, Infinity, Search, X } from 'lucide-react';
import { seoContent } from './seoContent';
import './digital-services.css';

const services = [
  { title: 'SEO', tagline: 'GET FOUND. STAY AHEAD.', image: 'seo', alt: 'Illuminated Google lettering representing search visibility and SEO.', detail: 'We help your business rank higher, attract qualified traffic and stay visible where it matters most.' },
  { title: 'Google Ads', tagline: 'TARGET. ATTRACT. CONVERT.', icon: Search, image: 'google-ads', alt: 'Laptop displaying campaign analytics and performance charts.', detail: 'Reach people searching for your services with targeted search campaigns, compelling ads and ongoing performance optimisation.' },
  { title: 'Meta Ads', tagline: 'REAL REACH. REAL RESULTS.', icon: Infinity, image: 'meta-ads', alt: 'Phone displaying Facebook beside social media lettering on a wooden desk.', detail: 'Connect with your audience across Facebook and Instagram through audience targeting, creative testing and campaign optimisation.' },
  { title: 'Social Media Marketing', tagline: 'BUILD COMMUNITY. DRIVE GROWTH.', icon: Instagram, image: 'social-media', alt: 'YouTube app icon representing social video content and audience growth.', detail: 'Build a consistent brand presence with social strategy, content planning and community engagement.' },
  { title: 'Content Creation', tagline: 'IDEAS THAT GET ATTENTION.', icon: Camera, image: 'content-creation', alt: 'Photographer creating visual content in a mountain landscape.', detail: 'Turn your brand story into purposeful visual and written content for your website, social channels and campaigns.' },
  { title: 'Website Design & Development', tagline: 'BEAUTIFUL. FAST. CONVERSION-READY.', icon: Laptop, image: 'website-design', alt: 'Laptop displaying website code in a modern design workspace.', detail: 'Create a responsive, accessible website that presents your brand clearly and helps visitors take the next step.' },
  { title: 'Lead Generation', tagline: 'MORE LEADS. MORE OPPORTUNITIES.', icon: Users, image: 'lead-generation', alt: 'Business team discussing opportunities around a shared workspace.', detail: 'Bring targeting, landing pages and enquiry journeys together to connect your business with relevant prospects.' },
  { title: 'Photography & Videography', tagline: 'REAL STORIES. LASTING IMPACT.', icon: Video, image: 'photography-video', alt: 'Professional camera and interchangeable lenses on a dark background.', detail: 'Capture your products, people and brand with photography and video designed for your website, social channels and campaigns.' },
  { title: 'Digital Campaign Management', tagline: 'STRATEGY. EXECUTION. REAL RESULTS.', icon: ChartNoAxesColumnIncreasing, image: 'campaign-management', alt: 'Monitor displaying campaign analytics and audience performance.', detail: 'Coordinate your channels, creative and reporting around one clear plan, with ongoing measurement and optimisation.' },
];
function Arrow({ large = false }) { return <span className={`ds-arrow ${large ? 'ds-arrow-large' : ''}`}><ArrowRight aria-hidden="true" /></span>; }
function Photo({ service, featured }) {
  return <div className={`ds-photo ${featured ? 'ds-photo-featured' : ''}`}><img src={`/assets/digital-services/${service.image}.jpg`} width="1920" alt={service.alt} loading="lazy" decoding="async" /></div>;
}
export default function DigitalServices() {
  const reduced = useReducedMotion();
  const dialog = useRef(null), opener = useRef(null);
  const [selected, setSelected] = useState(null);
  function open(service) { opener.current = document.activeElement; setSelected(service); dialog.current.showModal(); }
  const openGeneralStrategy = () => {
    opener.current = document.activeElement;
    setSelected({
      title: 'Free Strategy Call',
      detail: 'Tell us about your brand, your website and what you want to achieve. Contact our team to arrange your free strategy call.'
    });
    dialog.current.showModal();
  };
  const reveal = (delay = 0, y = 25) => ({ initial: reduced ? false : { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .65, delay, ease: [.22,1,.36,1] } });
  return <section id="digital-services" className="ds-section" aria-labelledby="ds-heading">
    <div className="ds-inner">
      <header className="ds-header">
        <div className="ds-heading-area"><motion.p className="ds-eyebrow" {...reveal(0,0)}>OUR DIGITAL MARKETING SERVICES <span /></motion.p><motion.h2 id="ds-heading" {...reveal(.05)}>Everything Your Brand Needs<br />to <span>Grow Online.</span></motion.h2></div>
        <motion.div className="ds-intro" {...reveal(.12,15)}><p>From search visibility and paid campaigns to content, websites and lead generation, XPATZHUB brings your entire digital growth strategy together under one roof.</p><button className="ds-cta" onClick={openGeneralStrategy}>Get Your Free Strategy Call <ArrowRight size={17} aria-hidden="true" /></button></motion.div>
      </header>
      <div className="ds-grid">
        {services.map((service,index) => { const Icon = service.icon; return <motion.article key={service.title} className={`ds-card ds-card-${index+1} ${index === 0 ? 'ds-featured' : ''}`} {...reveal(index * .065)}>
          <Photo service={service} featured={index === 0} />
          <div className="ds-shade" />
          <div className="ds-card-copy"><div className="ds-number">{String(index+1).padStart(2,'0')}<span /></div>
            {index === 0 ? <><h3>SEO</h3><p className="ds-feature-tagline">{service.tagline}</p><p className="ds-description">{service.detail}</p><button className="ds-explore" onClick={() => open(service)}><Arrow large />Explore SEO</button><p className="ds-subservices"><span>TECHNICAL SEO</span><i /> <span>ON-PAGE SEO</span><i /><span>LOCAL SEO</span><i /><span>CONTENT STRATEGY</span></p></> : <><div className="ds-title-row"><Icon className={`ds-icon ds-icon-${index}`} aria-hidden="true" /><h3>{service.title}</h3><button className="ds-card-button" aria-label={`Explore ${service.title}`} onClick={() => open(service)}><Arrow /></button></div><p className="ds-tagline">{service.tagline}</p></>}
          </div>
        </motion.article>; })}
      </div>
      <footer className="ds-footer"><span>XPATZHUB</span><i /><span>STRATEGY · VISIBILITY · GROWTH</span></footer>
    </div>
    <dialog className="ds-dialog" ref={dialog} aria-labelledby="ds-dialog-heading" onClose={() => opener.current?.focus()} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><button className="ds-dialog-close" aria-label="Close service details" onClick={() => dialog.current.close()}><X /></button><p className="ds-eyebrow">XPATZHUB</p><h2 id="ds-dialog-heading">{selected?.title || 'Let’s plan your next stage of growth.'}</h2><p>{selected?.detail || 'Tell us about your brand, your website and what you want to achieve. Contact our team to arrange your free strategy call.'}</p><a className="ds-cta" href="mailto:anulmundra@indianexpatsindubai.com?subject=Strategy%20Call%20Inquiry">Discuss your goals <ArrowRight size={18} /></a><a className="ds-phone" href="tel:+971564800026">+971 56 480 0026</a></dialog>
  </section>;
}
