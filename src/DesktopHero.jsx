import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import './desktop-hero.css';

const phones = [
  {id:'events',name:'Events & Experiences',path:'M1037 0 H1325 L1479 290 Q1493 333 1451 352 L1284 403 Q1246 418 1221 377 Z',x:25,y:-25},
  {id:'community',name:'Community Power',path:'M1076 791 Q1060 748 1104 726 L1278 653 Q1321 632 1342 679 L1458 941 H1139 Z',x:0,y:35},
  {id:'pr',name:'PR & Media Visibility',path:'M579 524 Q560 479 606 455 L766 381 Q810 362 833 408 L1046 842 Q1066 885 1025 908 L958 941 H766 Z',x:-30,y:30},
  {id:'digital',name:'Digital Marketing',path:'M1266 462 Q1248 420 1290 398 L1424 354 Q1470 339 1488 385 L1637 715 Q1656 761 1614 784 L1467 825 Q1428 837 1407 792 Z',x:30,y:0},
  {id:'central',name:'XPATZHUB — Brands. Events. People. Possibilities. A stronger UAE together.',path:'M766 201 Q750 151 800 130 L991 73 Q1039 57 1061 103 L1293 600 Q1314 650 1266 675 L1078 733 Q1032 749 1008 700 Z',x:0,y:40},
];
const ease=[.22,1,.36,1];

const searchItems = [
  { name: 'Events', category: 'Events & Experiences', desc: 'Corporate events, product launches & community activations.' },
  { name: 'Digital Marketing', category: 'SEO & Digital', desc: 'SEO, Google Ads, Meta Ads & conversion strategies.' },
  { name: 'Community', category: 'Community Marketing', desc: 'Reach 500K+ expats across the UAE.' },
  { name: 'Influencer', category: 'Influencer Marketing', desc: 'Authentic creator collaborations.' },
  { name: 'PR & Media', category: 'PR Visibility', desc: 'Media relations, press coverage & billboards.' },
];

export default function DesktopHero() {
  const reduced = useReducedMotion();
  const dialog = useRef(null);
  const searchDialog = useRef(null);
  const storyDialog = useRef(null);
  const detailDialog = useRef(null);
  const previousFocus = useRef(null);

  const [panel, setPanel] = useState('Contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [checkedServices, setCheckedServices] = useState({ 'Digital Marketing': false });

  const openDialog = (dRef, name) => {
    previousFocus.current = document.activeElement;
    if (name) setPanel(name);
    dRef.current?.showModal();
  };

  const closeDialog = (dRef) => {
    dRef.current?.close();
  };

  const handleServiceClick = (item) => {
    setSelectedService(item);
    searchDialog.current?.close();
    detailDialog.current?.showModal();
  };

  const toggleCheck = (name) => {
    setCheckedServices(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const reveal = (delay, y = 0) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .85, delay, ease }
  });

  const filteredSearch = searchQuery.trim()
    ? searchItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchItems;

  return (
    <section id="home" className="dh-hero relative isolate overflow-hidden text-white" aria-label="XPATZHUB — Your brand’s growth partner in the UAE">
      <div className="dh-stage">
        <div className="dh-copy">
          <motion.h1 className="dh-headline" {...reveal(.08,25)}>
            <span>YOUR</span><span>BRAND’S</span><span className="dh-growth">GROWTH</span><span>PARTNER</span>
          </motion.h1>
          <motion.p className="dh-description" {...reveal(.2)}>
            We connect brands with real people through<br className="dh-desktop-break"/> strategic marketing, events, PR and the power<br className="dh-desktop-break"/> of the UAE’s largest expat community.
          </motion.p>
          <motion.div className="dh-actions flex items-center gap-3" {...reveal(.3)}>
            <button className="dh-primary flex items-center justify-between" onClick={(e) => e.preventDefault()}>
              Let’s Grow Your Brand <ArrowRight/>
            </button>
          </motion.div>
          <motion.dl className="dh-stats flex" aria-label="Community statistics" {...reveal(.4)}>
            {[['500K+','COMMUNITY REACH'],['700+','BRANDS WORKED WITH'],['1000+','EVENTS & CAMPAIGNS']].map(([number,label]) => (
              <div key={label}><dt>{label}</dt><dd>{number}</dd></div>
            ))}
          </motion.dl>
        </div>
        <div className="dh-visual">
          <svg className="dh-collage" viewBox="0 0 1672 941" aria-label="Five smartphones showcasing XPATZHUB’s brands, events, PR, digital marketing and community">
            <defs>{phones.map(p => <clipPath key={p.id} id={`approved-${p.id}`}><path d={p.path}/></clipPath>)}</defs>
            {phones.map((p,index) => (
              <motion.g key={p.id} className={`dh-phone dh-phone-${p.id}`} role="img" aria-label={p.name} initial={reduced?false:{opacity:0,x:p.x,y:p.y}} animate={{opacity:1,x:0,y:0}} transition={{duration:1,delay:.15+index*.09,ease}}>
                <motion.g style={{transformOrigin:'center',transformBox:'fill-box'}} whileHover={reduced?{}:{y:-3,scale:1.01}} transition={{duration:.3}}>
                  <image href="/assets/hero-approved.png" width="1672" height="941" clipPath={`url(#approved-${p.id})`}/>
                </motion.g>
              </motion.g>
            ))}
          </svg>
          <p className="dh-detail">DUBAI<br/>BUILDS<br/>BRANDS<br/>TOGETHER<i/></p>
        </div>
      </div>

      {/* Main Contact Dialog */}
      <dialog ref={dialog} className="dh-dialog" aria-labelledby="dialog-title" onClose={() => previousFocus.current?.focus()} onClick={e => { if (e.target === dialog.current) closeDialog(dialog); }}>
        <button className="dh-dialog-close" aria-label="Close dialog" onClick={() => closeDialog(dialog)}><X/></button>
        <p>XPATZHUB</p>
        <h2 id="dialog-title">Let’s grow your brand.</h2>
        <p>Tell us what you have in mind for your brand and choose services of interest:</p>
        <div className="dh-checkbox-group flex flex-col gap-2 my-4">
          {['Digital Marketing', 'Community Marketing', 'Influencer Marketing', 'PR & Visibility', 'Events & Experiences'].map(srv => (
            <label key={srv} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                name={srv}
                aria-label={srv}
                checked={!!checkedServices[srv]}
                onChange={() => toggleCheck(srv)}
              />
              <span>{srv}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <a href="mailto:anulmundra@indianexpatsindubai.com" className="dh-dialog-link">anulmundra@indianexpatsindubai.com</a>
          <a href="tel:+971564800026" className="dh-dialog-phone">+971 56 480 0026</a>
        </div>
      </dialog>

      {/* Search Dialog */}
      <dialog ref={searchDialog} className="dh-dialog dh-search-dialog" aria-labelledby="search-dialog-title" onClose={() => previousFocus.current?.focus()} onClick={e => { if (e.target === searchDialog.current) closeDialog(searchDialog); }}>
        <button className="dh-dialog-close" aria-label="Close dialog" onClick={() => closeDialog(searchDialog)}><X/></button>
        <p>XPATZHUB SEARCH</p>
        <h2 id="search-dialog-title">Search XPATZHUB</h2>
        <div className="my-3">
          <input
            type="search"
            role="searchbox"
            placeholder="Type to search (e.g. events, digital)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
            autoFocus
          />
        </div>
        <div className="search-results flex flex-col gap-2 max-h-60 overflow-y-auto">
          {filteredSearch.map(item => (
            <button
              key={item.name}
              type="button"
              aria-label={item.name}
              className="text-left p-2 rounded hover:bg-neutral-800 flex flex-col"
              onClick={() => handleServiceClick(item)}
            >
              <span className="font-semibold text-white">{item.name}</span>
              <span className="text-xs text-neutral-400">{item.desc}</span>
            </button>
          ))}
        </div>
      </dialog>

      {/* Watch Our Story Dialog */}
      <dialog ref={storyDialog} className="dh-dialog" aria-labelledby="story-dialog-title" onClose={() => previousFocus.current?.focus()} onClick={e => { if (e.target === storyDialog.current) closeDialog(storyDialog); }}>
        <button className="dh-dialog-close" aria-label="Close dialog" onClick={() => closeDialog(storyDialog)}><X/></button>
        <p>XPATZHUB STORY</p>
        <h2 id="story-dialog-title">Our Story</h2>
        <p className="mt-2">Marketing. Events. PR. Powered by community.</p>
        <p className="mt-2 font-semibold">Our story film is coming soon.</p>
      </dialog>

      {/* Selected Search Item Detail Dialog */}
      <dialog ref={detailDialog} className="dh-dialog" aria-labelledby="detail-dialog-title" onClose={() => previousFocus.current?.focus()} onClick={e => { if (e.target === detailDialog.current) closeDialog(detailDialog); }}>
        <button className="dh-dialog-close" aria-label="Close dialog" onClick={() => closeDialog(detailDialog)}><X/></button>
        <p>XPATZHUB SOLUTION</p>
        <h2 id="detail-dialog-title">{selectedService?.name || 'Service Details'}</h2>
        <p className="mt-2">{selectedService?.desc}</p>
        <div className="mt-4">
          <a href="mailto:anulmundra@indianexpatsindubai.com" className="dh-dialog-link">Contact Strategy Team</a>
        </div>
      </dialog>
    </section>
  );
}
