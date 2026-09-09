import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search, Play, X, Menu } from 'lucide-react';
import './styles.css';
import Solutions from './Solutions';
import Footer from './Footer';
import MobileHero from './MobileHero';
import DesktopHero from './DesktopHero';

const artwork = 'https://res.cloudinary.com/utug407p/image/upload/reference';
const services = {
  'SEO & Digital Marketing': 'Data-driven digital marketing and SEO solutions designed to increase online visibility and grow your business across the UAE.',
  'Community Marketing': 'Tap into one of the UAE’s largest expat communities to create meaningful, high-impact brand connections.',
  'Influencer Marketing': 'Work with top creators and influencers to showcase your brand authentically across the UAE.',
  'Digital Marketing': 'Reach, engage and grow across the UAE through digital marketing.',
  Events: 'From ideas to unforgettable experiences. Bring your brand and people together in the UAE.',
  PR: 'Get seen. Get heard. Build credibility with PR and media visibility.',
  About: 'Marketing. Events. PR. Powered by Community. XPATZHUB connects brands, products and services with the UAE’s expat community.',
  Contact: 'Let’s grow your brand across the UAE. Choose the services you’re interested in to prepare your enquiry.',
};

const navLinks = [
  { name: 'Home', id: 'home', href: '#home' },
  { name: 'SEO & Digital', id: 'digital', href: '#digital' },
  { name: 'Community', id: 'community', href: '#community' },
  { name: 'Influencers', id: 'influencer', href: '#influencer' },
  { name: 'Contact', id: 'contact', href: '#contact' },
];

const phoneData = [
  { id: 'events', depth: .55, enter: [-35, -30], path: 'M555 209 Q556 181 590 169 L751 115 Q788 101 809 126 L831 162 L956 494 L733 570 Q699 582 681 546 Z', alt: 'Events & Experiences: an illuminated luxury UAE outdoor event with guests and banquet tables.' },
  { id: 'digital', depth: .35, enter: [30, -45], path: 'M1063 49 Q1062 16 1094 0 L1339 0 L1502 280 Q1523 329 1480 350 L1285 418 Q1251 429 1225 398 Z', alt: 'Digital Marketing: a premium creative workspace with a laptop displaying campaign analytics.' },
  { id: 'pr', depth: .65, enter: [-20, 45], path: 'M627 650 Q626 612 663 593 L825 543 Q871 526 896 566 L1058 941 L728 941 Z', alt: 'PR & Media Visibility: a close-up microphone in a cinematic press interview environment.' },
  { id: 'community', depth: .5, enter: [45, 45], path: 'M1305 459 Q1296 424 1332 408 L1483 356 Q1520 342 1544 375 L1672 654 L1672 941 L1492 941 Z', alt: 'Community Power: a diverse group overlooking Dubai and the Burj Khalifa at sunset.' },
  { id: 'main', depth: 1, enter: [0, 70], path: 'M803 183 Q792 144 830 124 L1025 73 Q1070 60 1092 99 L1355 649 Q1376 702 1327 735 L1116 810 Q1070 824 1040 778 Z', alt: 'Brands. Events. People. Possibilities. The Burj Khalifa and Dubai skyline at dusk, inside the main titanium smartphone.' },
];

function Phone({ data, x, y, reduced, index }) {
  const px = useTransform(x, value => value * data.depth);
  const py = useTransform(y, value => value * data.depth);
  return <motion.div className={`phone-layer phone-${data.id}`} style={{ x: px, y: py }}>
    <motion.div className="phone-entrance" initial={reduced ? false : { opacity: 0, x: data.enter[0], y: data.enter[1], rotate: data.id === 'main' ? 0 : 1.5 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }} transition={{ duration: 1.35, delay: .2 + index * .09, ease: [.22, 1, .36, 1] }}>
      <motion.svg viewBox="0 0 1672 941" role="img" aria-labelledby={`${data.id}-title`} animate={reduced ? {} : { y: [0, -(4 + index), 0] }} transition={{ duration: 7 + index * 1.3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}>
        <title id={`${data.id}-title`}>{data.alt}</title>
        <defs><clipPath id={`clip-${data.id}`}><path d={data.path} /></clipPath></defs>
        <image href={artwork} width="1672" height="941" clipPath={`url(#clip-${data.id})`} />
      </motion.svg>
    </motion.div>
  </motion.div>;
}

function App() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 45, damping: 24 });
  const y = useSpring(my, { stiffness: 45, damping: 24 });
  const [panel, setPanel] = useState(null);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const dialog = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (panel) { previousFocus.current = document.activeElement; dialog.current.showModal(); }
    else if (dialog.current.open) { dialog.current.close(); previousFocus.current?.focus(); }
  }, [panel]);

  useEffect(() => {
    setActiveNav('home');
  }, []);

  const open = name => { setMenu(false); };
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: .9, delay, ease: [.22, 1, .36, 1] } });

  const handleNavClick = (e, link) => {
    e.preventDefault();
  };

  return <>
    <header className="header flex items-center justify-between">
      <a href="#home" className="brand-logo" aria-label="XPATZHUB home" onClick={e => e.preventDefault()}>
        <img
          src="/logo.png"
          alt="XPATZHUB"
          className="brand-logo-img"
        />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-pill-container">
          {navLinks.map(link => {
            const isActive = link.id === 'home';
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={e => e.preventDefault()}
              >
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
      <div className="header-actions flex items-center gap-4">
        <button className="gradient-button nav-cta" onClick={e => e.preventDefault()}>Let’s Grow <ArrowRight size={18} /></button>
        <button className="menu-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={e => e.preventDefault()}>{menu ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {menu && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-nav-link ${link.id === 'home' ? 'active' : ''}`}
              onClick={e => e.preventDefault()}
            >
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
      )}
    </header>

    <main>
      {isMobile ? <MobileHero /> : <DesktopHero />}
    <Solutions onEnquire={() => {}} />
    <Footer onEnquire={() => {}} onOpen={() => {}} />

    <dialog ref={dialog} className="info-dialog" onCancel={() => setPanel(null)} onClick={e => { if (e.target === dialog.current) setPanel(null); }} aria-labelledby="dialog-title">
      <div className="dialog-content"><button className="dialog-close" aria-label="Close dialog" onClick={e => e.preventDefault()}><X /></button><p className="dialog-eyebrow">XPATZHUB</p><h2 id="dialog-title">{panel === 'Contact' ? 'Let’s grow your brand.' : panel}</h2>
      {panel === 'Search' ? <><label htmlFor="search">Explore our services</label><input autoFocus id="search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search marketing, events, PR…" /><div className="search-results">{Object.entries(services).filter(([name, text]) => `${name} ${text}`.toLowerCase().includes(query.toLowerCase())).map(([name]) => <button onClick={e => e.preventDefault()} key={name}>{name}<ArrowRight size={18}/></button>)}{!Object.entries(services).some(([name,text]) => `${name} ${text}`.toLowerCase().includes(query.toLowerCase())) && <p>No matches. Try “events” or “community”.</p>}</div></>
      : panel === 'Our Story' ? <><p>Marketing. Events. PR. Powered by Community.</p><p>We help brands, products and services reach, engage and grow across the UAE through Digital Marketing, Events, PR and the power of our expat community.</p><p className="availability">Our story film is coming soon.</p></>
      : <><p>{services[panel]}</p>{panel === 'Contact' ? <><fieldset><legend>I’m interested in</legend>{['Digital Marketing', 'Events', 'PR & Media', 'Community'].map(name => <label key={name} className="service-choice"><input type="checkbox" checked={selected.includes(name)} onChange={() => setSelected(old => old.includes(name) ? old.filter(v => v !== name) : [...old, name])}/>{name}</label>)}</fieldset><button className="gradient-button" onClick={e => e.preventDefault()}>{copied === true ? 'Enquiry copied' : 'Copy enquiry'}<ArrowRight size={18}/></button><p className="availability" role="status">{copied === 'failed' ? 'Clipboard unavailable. Please contact us at +971 56 480 0026 or anulmundra@indianexpatsindubai.com.' : 'Call +971 56 480 0026 or email anulmundra@indianexpatsindubai.com.'}</p></> : <button className="gradient-button" onClick={e => e.preventDefault()}>Let’s talk <ArrowRight size={18}/></button>}</>}
      </div>
    </dialog>
  </main></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
