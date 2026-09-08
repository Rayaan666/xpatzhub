import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Menu, X, Wifi, Signal, BatteryFull } from 'lucide-react';
import './mobile-hero.css';

const phoneData = [
  {id:'events',title:['EVENTS &','EXPERIENCES'],copy:['Real connections.','Lasting impact.'],image:'event.jpg',alt:'An outdoor event venue prepared with a stage, elegant chairs, palms and hanging lights.',x:-15,y:35,service:'Events'},
  {id:'digital',title:['DIGITAL','MARKETING'],copy:['Strategy.','Visibility.','Real results.'],image:'analytics.jpg',alt:'A real laptop displaying website analytics in a professional workspace.',x:15,y:35,service:'Marketing'},
  {id:'central',image:'sunset.jpg',alt:'Burj Khalifa and the Dubai skyline photographed across the waterfront at sunset.',x:0,y:45,service:'XPATZHUB'},
  {id:'pr',title:['PR &','MEDIA VISIBILITY'],copy:['Get seen.','Get heard.','Build credibility.'],image:'camera.jpg',alt:'A professional production camera with a monitor, lens and tripod.',x:-15,y:50,service:'PR'},
  {id:'community',title:['COMMUNITY','POWER'],copy:['A stronger UAE','through stronger','connections.'],image:'waterfront.jpg',alt:'A Dubai waterfront promenade with palms and outdoor hospitality spaces.',x:15,y:50,service:'Community'},
];
const serviceCopy={Marketing:'Strategy. Visibility. Real results.',Events:'Real connections. Lasting impact.',PR:'Get seen. Get heard. Build credibility.',Community:'A stronger UAE through stronger connections.',XPATZHUB:'Brands. Events. People. A stronger UAE together.'};
const ease=[.22,1,.36,1];

function MobilePhone({phone,index,reduced,open}){
  const central=phone.id==='central';
  return <div className={`mp-phone mp-phone-${phone.id}`}>
    <motion.div className="mp-phone-entry" initial={reduced?false:{opacity:0,x:phone.x,y:phone.y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,amount:.1}} transition={{duration:1,delay:index*.08,ease}}>
      <button className="mp-device" onClick={()=>open(phone.service)} aria-label={`Explore ${phone.service}`}>
        <span className="mp-side-key" aria-hidden="true"/>
        <span className="mp-screen">
          <img src={`/assets/hero-2026/${phone.image}`} alt={phone.alt} decoding="async"/>
          <span className="mp-screen-shade"/>
          <span className="mp-status" aria-hidden="true"><span>9:41</span><span><Signal/><Wifi/><BatteryFull/></span></span>
          <span className="mp-notch" aria-hidden="true"><i/><b/></span>
          {central?<><span className="mp-screen-logo">XPATZHUB</span><span className="mp-serif">Brands<br/>Events<br/>People</span><span className="mp-script">Possibilities.</span><span className="mp-together">A STRONGER<br/>UAE TOGETHER<i/></span></>:<span className="mp-screen-copy"><span className="mp-phone-title">{phone.title.map(t=><span key={t}>{t}</span>)}</span><span className="mp-phone-description">{phone.copy.map(t=><span key={t}>{t}</span>)}</span><span className="mp-screen-arrow" aria-hidden="true"><ArrowRight/></span></span>}
          {phone.id==='community'&&<span className="mp-event-flag" aria-hidden="true">Community<br/>Together<br/>Stronger</span>}
        </span>
      </button>
    </motion.div>
  </div>;
}

export default function MobileHero(){
  const reduced=useReducedMotion();const [menu,setMenu]=useState(false),[panel,setPanel]=useState('Contact');
  const dialog=useRef(null),lastFocus=useRef(null);
  const open=name=>{lastFocus.current=document.activeElement;setPanel(name);setMenu(false);dialog.current.showModal();};
  const reveal=(delay=0,y=15)=>({initial:reduced?false:{opacity:0,y},animate:{opacity:1,y:0},transition:{duration:.85,delay,ease}});
  return <div className="mobile-hero mp-hero">
    <div className="mp-backdrop" aria-hidden="true"/>
    <header className="mp-header">
      <a href="#home" className="mp-wordmark" aria-label="XPATZHUB home">XPATZHUB</a>
      <nav className="mp-header-services" aria-label="Mobile services">{['Marketing','Events','PR','Community'].map(name=><button key={name} onClick={()=>open(name)}>{name}</button>)}</nav>
      <div className="mp-header-actions"><button className="mp-talk" onClick={()=>open('Contact')}>Let’s Talk <ArrowRight/></button><button className="mp-menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-controls="mp-menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
      {menu&&<nav id="mp-menu" className="mp-menu" aria-label="Mobile navigation">{['Marketing','Events','PR','Community','Contact'].map(name=><button key={name} onClick={()=>open(name)}>{name}<ArrowRight/></button>)}</nav>}
    </header>
    <div className="mp-copy">
      <motion.p {...reveal(0,0)} className="mp-eyebrow">REAL PEOPLE. REAL BRANDS. A STRONGER UAE.</motion.p>
      <motion.h1 {...reveal(.08,20)} className="mp-headline"><span>YOUR BRAND’S</span><span><em>GROWTH</em> PARTNER</span></motion.h1>
      <motion.div {...reveal(.15)} className="mp-location">IN THE UAE<i/></motion.div>
      <motion.p {...reveal(.2,15)} className="mp-description">We connect brands with real people through strategic marketing,<br className="mp-copy-break"/> events, and the power of the UAE’s largest expat community.</motion.p>
      <motion.dl {...reveal(.27,0)} className="mp-stats">{[['500K+','COMMUNITY REACH'],['250+','BRANDS WORKED WITH'],['1000+','EVENTS & CAMPAIGNS']].map(([number,label])=><div key={label}><dt>{label}</dt><dd>{number}</dd></div>)}</motion.dl>
      <motion.div {...reveal(.34,10)} className="mp-actions"><button className="mp-primary" onClick={()=>open('Contact')}>Let’s Grow Your Brand <ArrowRight/></button><button className="mp-story" onClick={()=>open('Our Story')}><span><Play fill="currentColor"/></span>Watch Our Story</button></motion.div>
    </div>
    <div className="mp-visual">
      <p className="mp-annotation" aria-hidden="true"><span>Same</span><span>Community</span><span>Bigger</span><span>Possibilities</span><i/></p>
      <div className="mp-collage" aria-label="Five phones featuring events, marketing, Dubai, PR and community">{phoneData.map((phone,index)=><MobilePhone key={phone.id} {...{phone,index,reduced,open}}/>)}</div>
    </div>
    <div className="mp-editorial" aria-hidden="true"><span>XPATZHUB</span><i/><span>PEOPLE · BRANDS · OPPORTUNITIES</span></div>
    <dialog ref={dialog} className="mp-dialog" aria-labelledby="mp-dialog-title" onClose={()=>lastFocus.current?.focus()} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <button className="mp-close" aria-label="Close dialog" onClick={()=>dialog.current.close()}><X/></button><p className="mp-dialog-brand">XPATZHUB</p><h2 id="mp-dialog-title">{panel==='Contact'?'Let’s grow your brand.':panel}</h2>
      {panel==='Contact'?<><p>Tell us what you have in mind for your brand.</p><a href="mailto:anulmundra@indianexpatsindubai.com">anulmundra@indianexpatsindubai.com</a><a href="tel:+971564800026">+971 56 480 0026</a></>:panel==='Our Story'?<><p>Marketing. Events. PR. Powered by community.</p><p>Our story film is coming soon.</p></>:<><p>{serviceCopy[panel]}</p><button className="mp-dialog-contact" onClick={()=>setPanel('Contact')}>Let’s Talk <ArrowRight size={16}/></button></>}
    </dialog>
  </div>;
}
