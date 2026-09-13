import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import './desktop-hero.css';

// Individually masked devices preserve the approved campaign photography and
// physical frames. Copy outside the devices remains live, selectable HTML.
const phones = [
  {id:'events',name:'Events & Experiences',path:'M1037 0 H1325 L1479 290 Q1493 333 1451 352 L1284 403 Q1246 418 1221 377 Z',x:25,y:-25},
  {id:'community',name:'Community Power',path:'M1076 791 Q1060 748 1104 726 L1278 653 Q1321 632 1342 679 L1458 941 H1139 Z',x:0,y:35},
  {id:'pr',name:'PR & Media Visibility',path:'M579 524 Q560 479 606 455 L766 381 Q810 362 833 408 L1046 842 Q1066 885 1025 908 L958 941 H766 Z',x:-30,y:30},
  {id:'digital',name:'Digital Marketing',path:'M1266 462 Q1248 420 1290 398 L1424 354 Q1470 339 1488 385 L1637 715 Q1656 761 1614 784 L1467 825 Q1428 837 1407 792 Z',x:30,y:0},
  {id:'central',name:'XPATZHUB — Brands. Events. People. Possibilities. A stronger UAE together.',path:'M766 201 Q750 151 800 130 L991 73 Q1039 57 1061 103 L1293 600 Q1314 650 1266 675 L1078 733 Q1032 749 1008 700 Z',x:0,y:40},
];
const ease=[.22,1,.36,1];
export default function DesktopHero(){
  const reduced=useReducedMotion();
  const dialog=useRef(null),previousFocus=useRef(null);
  const [panel,setPanel]=useState('Contact');
  const open=name=>{previousFocus.current=document.activeElement;setPanel(name);dialog.current.showModal();};
  const reveal=(delay,y=0)=>({initial:reduced?false:{opacity:0,y},animate:{opacity:1,y:0},transition:{duration:.85,delay,ease}});
  return <section id="home" className="dh-hero relative isolate overflow-hidden text-white" aria-label="XPATZHUB — Your brand’s growth partner in the UAE">
    <div className="dh-stage">
      <div className="dh-copy">
        <motion.h1 className="dh-headline" {...reveal(.08,25)}><span>YOUR</span><span>BRAND’S</span><span className="dh-growth">GROWTH</span><span>PARTNER</span></motion.h1>
        <motion.p className="dh-description" {...reveal(.2)}>We connect brands with real people through<br className="dh-desktop-break"/> strategic marketing, events, PR and the power<br className="dh-desktop-break"/> of the UAE’s largest expat community.</motion.p>
        <motion.div className="dh-actions flex items-center" {...reveal(.3)}>
          <button className="dh-primary flex items-center justify-between" onClick={e=>e.preventDefault()}>Let's Grow Your Brand <ArrowRight/></button>
        </motion.div>
        <motion.dl className="dh-stats flex" aria-label="Community statistics" {...reveal(.4)}>{[['500K+','COMMUNITY REACH'],['700+','BRANDS WORKED WITH'],['1000+','EVENTS & CAMPAIGNS']].map(([number,label])=><div key={label}><dt>{label}</dt><dd>{number}</dd></div>)}</motion.dl>
      </div>
      <div className="dh-visual">
        <svg className="dh-collage" viewBox="0 0 1672 941" aria-label="Five smartphones showcasing XPATZHUB’s brands, events, PR, digital marketing and community">
          <defs>{phones.map(p=><clipPath key={p.id} id={`approved-${p.id}`}><path d={p.path}/></clipPath>)}</defs>
          {phones.map((p,index)=><motion.g key={p.id} className={`dh-phone dh-phone-${p.id}`} role="img" aria-label={p.name} initial={reduced?false:{opacity:0,x:p.x,y:p.y}} animate={{opacity:1,x:0,y:0}} transition={{duration:1,delay:.15+index*.09,ease}}><motion.g style={{transformOrigin:'center',transformBox:'fill-box'}} whileHover={reduced?{}:{y:-3,scale:1.01}} transition={{duration:.3}}><image href="/assets/hero-approved.png" width="1672" height="941" clipPath={`url(#approved-${p.id})`}/></motion.g></motion.g>)}
        </svg>
        <p className="dh-detail">DUBAI<br/>BUILDS<br/>BRANDS<br/>TOGETHER<i/></p>
      </div>
    </div>
    <dialog ref={dialog} className="dh-dialog" aria-labelledby="dh-dialog-title" onClose={()=>previousFocus.current?.focus()} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <button className="dh-dialog-close" aria-label="Close dialog" onClick={()=>dialog.current.close()}><X/></button><p>XPATZHUB</p><h2 id="dh-dialog-title">{panel==='Contact'?'Let’s grow your brand.':'Our Story'}</h2>
      {panel==='Contact'?<><p>Tell us what you have in mind for your brand.</p><a href="mailto:anulmundra@indianexpatsindubai.com">anulmundra@indianexpatsindubai.com</a><a href="tel:+971564800026">+971 56 480 0026</a></>:<><p>Marketing. Events. PR. Powered by community.</p><p>Our story film is coming soon.</p></>}
    </dialog>
  </section>;
}
