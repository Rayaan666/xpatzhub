import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Menu, X, Wifi, BatteryFull, Signal } from 'lucide-react';
import './desktop-hero.css';

const photos = '/assets/hero-2026/';
const phones = [
  { id:'events', title:['EVENTS &','EXPERIENCES'], copy:['Real connections.','Lasting impact.'], image:'event.jpg', alt:'An outdoor event stage with elegant chairs, palms and hanging lights, photographed before guests arrive.', enter:{x:-20,y:-20}, panel:'Events' },
  { id:'pr', title:['PR &','MEDIA VISIBILITY'], copy:['Get seen.','Get heard.','Build credibility.'], image:'camera.jpg', alt:'A professional Panasonic production camera, field monitor and tripod.', enter:{x:-20,y:25}, panel:'PR' },
  { id:'digital', title:['DIGITAL','MARKETING'], copy:['Strategy.','Visibility.','Real results.'], image:'analytics.jpg', alt:'A real laptop displaying website analytics on its screen.', enter:{x:20,y:-20}, panel:'Marketing' },
  { id:'community', title:['COMMUNITY','POWER'], copy:['A stronger UAE','through stronger','connections.'], image:'waterfront.jpg', alt:'A quiet Dubai waterfront promenade lined with palms and outdoor hospitality spaces.', enter:{x:25,y:0}, panel:'Community' },
  { id:'central', image:'sunset.jpg', alt:'The real Dubai skyline and Burj Khalifa across the waterfront at sunset.', enter:{x:0,y:30}, panel:'About XPATZHUB' },
];
const summaries = {
  Marketing:'Strategic marketing that connects your brand with real people across the UAE.',
  Events:'Real connections. Lasting impact. Bring your brand and people together through memorable experiences.',
  PR:'Get seen. Get heard. Build credibility through PR and media visibility.',
  Community:'A stronger UAE through stronger connections.',
  'About XPATZHUB':'Marketing. Events. PR. Powered by community. We connect brands with real people across the UAE.',
};
const ease=[.22,1,.36,1];

function Phone({data, index, reduced, onOpen}) {
  const central=data.id==='central';
  return <div className={`dh-phone-position dh-phone-${data.id}`}>
    <motion.div className="dh-phone-enter" initial={reduced?false:{opacity:0,...data.enter}} animate={{opacity:1,x:0,y:0}} transition={{duration:.9,delay:.15+index*.09,ease}}>
      <motion.div className="dh-phone-float" animate={reduced?{}:{y:[0,-2,0]}} transition={{duration:8+index,repeat:Infinity,ease:'easeInOut',delay:1.2+index*.1}}>
        <motion.button className="dh-device" aria-label={`Explore ${data.panel}`} onClick={()=>onOpen(data.panel)} whileHover={reduced?{}:{y:-3,scale:1.01}} whileFocus={reduced?{}:{y:-3,scale:1.01}} transition={{duration:.25}}>
          <span className="dh-side-buttons" aria-hidden="true"/>
          <span className="dh-screen">
            <img className="dh-screen-photo" src={photos+data.image} alt={data.alt} decoding="async" />
            <span className="dh-screen-shade"/>
            <span className="dh-status" aria-hidden="true"><span>9:41</span><span><Signal/><Wifi/><BatteryFull/></span></span>
            <span className="dh-notch" aria-hidden="true"><i/><b/></span>
            {central?<>
              <span className="dh-screen-brand">XPATZHUB</span>
              <span className="dh-serifs">Brands<br/>Events<br/>People</span>
              <span className="dh-possibilities">Possibilities.</span>
              <span className="dh-together">A STRONGER<br/>UAE TOGETHER<i/></span>
            </>:<span className="dh-screen-copy">
              <span className="dh-phone-title">{data.title.map(line=><span key={line}>{line}</span>)}</span>
              <span className="dh-phone-description">{data.copy.map(line=><span key={line}>{line}</span>)}</span>
              <span className="dh-phone-arrow" aria-hidden="true"><ArrowRight/></span>
            </span>}
            {data.id==='community'&&<span className="dh-banner" aria-hidden="true">Community<br/>Together<br/>Stronger</span>}
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  </div>;
}

export default function DesktopHero(){
  const reduced=useReducedMotion();
  const [menu,setMenu]=useState(false);
  const [panel,setPanel]=useState('Contact');
  const dialog=useRef(null), previousFocus=useRef(null);
  const open=name=>{previousFocus.current=document.activeElement;setPanel(name);setMenu(false);dialog.current.showModal();};
  return <section id="home" className="dh-hero relative isolate overflow-hidden text-white" aria-label="XPATZHUB — Your brand’s growth partner in the UAE">
    <div className="dh-stage">
      <div className="dh-background" aria-hidden="true"/><div className="dh-terrace" aria-hidden="true"/><div className="dh-darken" aria-hidden="true"/>
      {/* Stage background layers */}
      <motion.div className="dh-copy" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,ease}}>
        <p className="dh-eyebrow">REAL PEOPLE. REAL BRANDS. A STRONGER UAE.</p>
        <h1 className="dh-headline"><span>YOUR</span><span>BRAND’S</span><span className="dh-growth">GROWTH</span><span>PARTNER</span></h1>
        <p className="dh-location">IN THE UAE</p><span className="dh-rule"/>
        <p className="dh-description">We connect brands with real people through<br/>strategic marketing, events, and the power<br/>of the UAE’s largest expat community.</p>
        <div className="dh-actions flex items-center"><button className="dh-primary flex items-center justify-between" onClick={()=>open('Contact')}>Let’s Grow Your Brand <ArrowRight/></button></div>
      </motion.div>
      <div className="dh-collage" aria-label="Marketing, events, PR and community">{phones.map((data,index)=><Phone key={data.id} {...{data,index,reduced}} onOpen={open}/>)}</div>
      <p className="dh-handwriting" aria-hidden="true"><span>Same</span><span>Community</span><span>Bigger</span><span>Possibilities</span><i/></p>
      <dl className="dh-stats flex" aria-label="Community statistics">{[['500K+','COMMUNITY REACH'],['250+','BRANDS WORKED WITH'],['1000+','EVENTS & CAMPAIGNS']].map(([number,label])=><div key={label}><dt>{label}</dt><dd>{number}</dd></div>)}</dl>
      <div className="dh-bottom-shade" aria-hidden="true"/>
    </div>
    <dialog ref={dialog} className="dh-dialog" aria-labelledby="dh-dialog-title" onClose={()=>previousFocus.current?.focus()} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <button className="dh-dialog-close" aria-label="Close dialog" onClick={()=>dialog.current.close()}><X/></button><p className="dh-dialog-brand">XPATZHUB</p><h2 id="dh-dialog-title">{panel==='Contact'?'Let’s grow your brand.':panel}</h2>
      {panel==='Contact'?<><p>Tell us what you have in mind for your brand.</p><a href="mailto:anulmundra@indianexpatsindubai.com">anulmundra@indianexpatsindubai.com</a><a href="tel:+971564800026">+971 56 480 0026</a></>:panel==='Our Story'?<><p>Marketing. Events. PR. Powered by community.</p><p>Our story film is coming soon.</p></>:<><p>{summaries[panel]}</p><button className="dh-dialog-contact" onClick={()=>setPanel('Contact')}>Let’s Talk <ArrowRight size={16}/></button></>}
    </dialog>
  </section>;
}

