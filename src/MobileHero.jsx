import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import './mobile-hero.css';

// The approved portrait supplies the photography and physical device frames.
// Each phone is a separate masked layer; page copy and actions are live HTML.
const phones = [
  {id:'events',label:'Events & Experiences. Real connections. Lasting impact. Dubai outdoor evening event.',path:'M135 176 Q119 135 160 113 L345 48 Q385 33 404 75 L559 452 L335 554 Q289 574 267 530 Z',x:-12,y:14},
  {id:'pr',label:'PR & Media Visibility. Get seen. Get heard. Build credibility. Professional production camera and tripod.',path:'M370 0 H687 L844 334 Q863 377 819 397 L644 459 Q602 476 582 431 Z',x:12,y:-14},
  {id:'digital',label:'Digital Marketing. Strategy. Visibility. Real results. Laptop analytics, desk, plant and coffee.',path:'M649 510 Q632 469 676 449 L853 394 Q898 377 917 424 L941 487 V890 L830 926 Q788 940 770 895 Z',x:12,y:12},
  {id:'central',label:'XPATZHUB. Brands. Events. People. Possibilities. A stronger UAE together. Burj Khalifa and Dubai waterfront at sunset.',path:'M291 491 Q272 449 316 426 L497 357 Q541 340 561 384 L759 863 Q776 907 733 928 L554 998 Q509 1014 488 969 Z',x:0,y:20},
  {id:'community',label:'Community Power. A stronger UAE through stronger connections. Dubai community gathering with palms and warm lighting.',path:'M595 1022 Q579 983 622 963 L853 897 Q897 880 916 922 L941 984 V1418 L819 1469 Q779 1484 757 1442 Z',x:15,y:0},
];
const ease=[.22,1,.36,1];
export default function MobileHero(){
  const reduced=useReducedMotion();
  const [panel,setPanel]=useState('Contact');
  const dialog=useRef(null),previousFocus=useRef(null);
  const open=name=>{previousFocus.current=document.activeElement;setPanel(name);dialog.current.showModal();};
  const reveal=(delay,y)=>({initial:reduced?false:{opacity:.85,y},animate:{opacity:1,y:0},transition:{duration:.75,delay,ease}});
  return <section id="home" className="pm-hero relative isolate text-white" aria-label="XPATZHUB — Your brand’s growth partner">
    <div className="pm-poster">
      <p className="pm-wordmark">XPATZHUB</p>
      <div className="pm-artwork" aria-label="Five phones showcasing events, PR, brands, digital marketing and community">
        {phones.map((p,index)=><motion.div key={p.id} className={`pm-phone pm-phone-${p.id}`} initial={reduced?false:{opacity:.85,x:p.x,y:p.y}} animate={{opacity:1,x:0,y:0}} transition={{duration:.9,delay:index*.07,ease}}>
          <svg viewBox="0 0 941 1672" role="img" aria-label={p.label}>
            <defs>
              <clipPath id={`portrait-${p.id}`} clipPathUnits="userSpaceOnUse"><path d={p.path}/></clipPath>
              {p.id==='central'&&<mask id="portrait-copy-clear" maskUnits="userSpaceOnUse" x="0" y="0" width="941" height="1672"><rect width="941" height="1672" fill="white"/><rect x="0" y="840" width="512" height="272" fill="black"/></mask>}
            </defs>
            <g mask={p.id==='central'?'url(#portrait-copy-clear)':undefined}><image href="/assets/mobile-approved.png" width="941" height="1672" clipPath={`url(#portrait-${p.id})`}/></g>
          </svg>
        </motion.div>)}
      </div>
      <div className="pm-copy">
        <motion.h1 className="pm-headline" {...reveal(0,20)}><span>YOUR</span><span>BRAND’S</span><span className="pm-growth">GROWTH</span><span>PARTNER</span></motion.h1>
        <motion.p className="pm-description" {...reveal(.06,12)}>We connect brands with real people<br/>through strategic marketing, events,<br/>PR and the power of the UAE’s largest<br/>expat community.</motion.p>
        <motion.button className="pm-primary flex items-center justify-between" onClick={e=>e.preventDefault()} {...reveal(.1,10)}>Let's Grow Your Brand<ArrowRight aria-hidden="true"/></motion.button>
      </div>
      <dl className="pm-stats flex" aria-label="Community statistics">{[['500K+','COMMUNITY REACH'],['700+','BRANDS WORKED WITH'],['1000+','EVENTS & CAMPAIGNS']].map(([value,label])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="pm-editorial">DUBAI<br/>BUILDS<br/>BRANDS<br/>TOGETHER<i/></p>
    </div>
    <dialog ref={dialog} className="pm-dialog" aria-labelledby="pm-dialog-title" onClose={()=>previousFocus.current?.focus()} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <button className="pm-close" aria-label="Close dialog" onClick={()=>dialog.current.close()}><X/></button>
      <p>XPATZHUB</p><h2 id="pm-dialog-title">{panel==='Contact'?'Let’s grow your brand.':'Our Story'}</h2>
      {panel==='Contact'?<><p>Tell us what you have in mind for your brand.</p><a href="mailto:anulmundra@indianexpatsindubai.com">anulmundra@indianexpatsindubai.com</a><a href="tel:+971564800026">+971 56 480 0026</a></>:<><p>Marketing. Events. PR. Powered by community.</p><p>Our story film is coming soon.</p></>}
    </dialog>
  </section>;
}
