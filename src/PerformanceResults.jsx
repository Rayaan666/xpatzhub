import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search, Users, Filter, MousePointer2, Heart, PieChart, X } from 'lucide-react';
import { performanceMetrics, dashboardMetrics, performanceDataVerified, clientLogos, clientPlaceholders } from './performanceContent';
import { seoContent } from './seoContent';
import './performance-results.css';
const icons = { search: Search, traffic: Users, leads: Filter, paid: MousePointer2, social: Heart, conversion: PieChart };
function ReferencePhoto({ crop, alt, className = '', children }) {
 const [x,y,w,h] = crop;
 return <div className={`pr-photo ${className}`} style={{ '--photo-ratio': `${w} / ${h}` }}><div className="pr-photo-scene"><img src="/assets/results-approved-reference.png" alt={alt} loading="lazy" decoding="async" style={{ width:`${1672/w*100}%`,height:`${941/h*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%` }} />{children}</div></div>;
}
function Dashboard() {
 return <svg className="pr-dashboard" viewBox="0 0 622 551" role="img" aria-label={`Illustrative website performance dashboard. ${dashboardMetrics.map(m => `${m.label}: ${m.value}, ${m.change}`).join('. ')}`}>
  <defs><clipPath id="pr-screen-clip"><polygon points="220,274 562,254 550,506 189,489" /></clipPath><linearGradient id="pr-screen-light" x2="0" y2="1"><stop stopColor="#d3dfe9"/><stop offset="1" stopColor="#b6c8db"/></linearGradient></defs>
  <g clipPath="url(#pr-screen-clip)"><polygon points="220,274 562,254 550,506 189,489" fill="url(#pr-screen-light)" />
  <g transform="translate(231 304) skewY(-3) skewX(-6)"><text fontSize="12" fontWeight="600" fill="#142534">Website Performance</text><text y="17" fontSize="5.5" fill="#536a80">{performanceDataVerified ? 'PERFORMANCE OVERVIEW' : 'ILLUSTRATIVE DATA · NOT VERIFIED RESULTS'}</text>
   <rect y="30" width="198" height="120" rx="5" fill="#e6edf3" fillOpacity=".5" />
   {[55,80,105,130].map(y => <path key={y} d={`M8 ${y} H189`} stroke="#a8bfd2" strokeWidth=".5" />)}
   <path d="M10 130 L28 117 L42 125 L57 108 L69 116 L88 98 L102 105 L120 85 L134 94 L151 73 L167 82 L190 51" fill="none" stroke="#057dff" strokeWidth="1.8" />
   <path d="M10 130 L28 117 L42 125 L57 108 L69 116 L88 98 L102 105 L120 85 L134 94 L151 73 L167 82 L190 51 L190 141 H10Z" fill="#0887ff" opacity=".07"/>
   <text y="170" fontSize="6" fill="#526d86">VISIBILITY · ENGAGEMENT · CONVERSIONS</text>
  </g>
  {dashboardMetrics.map((metric,index) => <g key={metric.label} transform={`translate(${450-index*5} ${303+index*75}) skewY(-2)`}><rect x="-9" y="-20" width="106" height="66" rx="6" fill="#e6edf3" fillOpacity=".65"/><text fontSize="9" fill="#243847">{metric.label}</text><text y="26" fontSize="23" fontWeight="600" fill="#0b1e2b">{metric.value}</text><text x="61" y="25" fontSize="10" fill="#08745c">{metric.change}</text></g>)}
  </g>
 </svg>;
}
export default function PerformanceResults() {
 const reduced = useReducedMotion(), dialog = useRef(null), opener = useRef(null);
 const reveal = (delay=0,y=15) => ({ initial: reduced ? false : { opacity:0,y }, whileInView:{ opacity:1,y:0 }, viewport:{once:true,amount:.1}, transition:{duration:.7,delay,ease:[.22,1,.36,1]} });
 const open = () => { opener.current=document.activeElement;dialog.current.showModal(); };
 return <section id="results-performance" className="pr-section" aria-labelledby="pr-heading"><div className="pr-inner">
  <div className="pr-top">
   <div className="pr-copy"><motion.p className="pr-eyebrow" {...reveal(0,0)}>RESULTS THAT MOVE BRANDS FORWARD<i /></motion.p>
    <motion.h2 id="pr-heading" {...reveal(.05,25)}><span className="pr-desktop-heading">Performance You<br/>Can See.<br/><em>Growth</em> You<br/>Can Measure.</span><span className="pr-mobile-heading">Performance<br/>You Can See.<br/><em>Growth</em> You<br/>Can Measure.</span></motion.h2>
    <motion.p className="pr-description" {...reveal(.12)}>We focus on the numbers that matter — helping brands turn stronger visibility, smarter campaigns and meaningful engagement into measurable business opportunities.</motion.p>
    <motion.button className="pr-primary" onClick={open} {...reveal(.18,0)}>Let's Discuss Your Goals <ArrowRight size={18} aria-hidden="true" /></motion.button>
   </div>
   <motion.div className="pr-workspace" initial={reduced ? false : {opacity:0,scale:.985}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.8}}><ReferencePhoto crop={[642,34,622,551]} alt="Golden-hour Dubai workspace with the Burj Khalifa beyond the windows, an open laptop on a dark desk, plants and warm sunlight. Handwritten note: Real Strategies. Real Results."><Dashboard /></ReferencePhoto></motion.div>
   <div className="pr-editorial-stack" tabIndex={0} role="region" aria-label="Editorial photo gallery">
    <motion.div {...reveal(.08,0)}><ReferencePhoto crop={[1276,34,357,161]} alt="Amber lettering reading Good Brands Brighter People on dark architectural glass beside sunlit leaves." /></motion.div>
    <motion.div {...reveal(.15,0)}><ReferencePhoto crop={[1276,208,357,194]} alt="Black XPATZHUB coffee mug and a phone with the words Ideas, Campaigns, Communities, Growth on a sunlit premium desk." /></motion.div>
    <motion.div {...reveal(.22,0)}><ReferencePhoto crop={[1276,414,357,171]} alt="Warm architectural wall with plant shadows and the inscription A More Connected UAE." /></motion.div>
   </div>
  </div>
  <div className="pr-metrics" aria-describedby={!performanceDataVerified ? 'pr-data-note' : undefined}>
   {performanceMetrics.map((metric,index) => { const Icon=icons[metric.id];return <motion.article className="pr-metric" key={metric.id} {...reveal(index*.06)}><Icon className="pr-metric-icon" aria-hidden="true"/><h3>{metric.category}</h3><p className="pr-value">{metric.value}</p><p className="pr-caption">{metric.caption}</p><div className="pr-bars" aria-hidden="true">{[9,15,21,28].map(h => <i key={h} style={{height:h}} />)}</div></motion.article>; })}
   <motion.div className="pr-statement" {...reveal(.36)}><p>DIFFERENT<br/>AUDIENCES.<br/>INDUSTRIES.<br/>GOALS.</p><p>A COMMON<br/>OUTCOME.<br/><strong>GROWTH.</strong></p></motion.div>
  </div>
  <div className="pr-bottom"><div className="pr-clients"><p className="pr-eyebrow">TRUSTED BY BRANDS ACROSS THE UAE<i /></p><div className="pr-client-logos">{clientLogos.length ? clientLogos.map(client => <img key={client.name} src={client.src} alt={client.name}/>) : clientPlaceholders.map(name => <span key={name}>{name}</span>)}</div><p className="pr-data-note" id="pr-data-note">{!performanceDataVerified && 'Illustrative performance figures — not verified XPATZHUB results.'}{!clientLogos.length && ' Client names pending verification.'}</p></div>
   <button className="pr-final-cta" onClick={open} aria-label="Start your growth story — discuss your goals"><ReferencePhoto crop={[1084,768,245,142]} alt="Warm sunlight and plant shadows falling across a premium architectural wall."/><span className="pr-final-copy">YOUR<br/>GROWTH<br/>STORY<br/>STARTS HERE.<i /></span><span className="pr-circle"><ArrowRight aria-hidden="true"/></span></button>
  </div>
 </div><dialog ref={dialog} className="pr-dialog" aria-labelledby="pr-dialog-title" onClose={() => opener.current?.focus()} onClick={event => {if(event.target===dialog.current)dialog.current.close();}}><button className="pr-close" aria-label="Close goals dialog" onClick={() => dialog.current.close()}><X/></button><p className="pr-eyebrow">XPATZHUB</p><h2 id="pr-dialog-title">Let's discuss your goals.</h2><p>Tell us about your brand, your current campaigns and the growth you want to achieve. Our team will help you plan the next step.</p><a className="pr-primary" href="mailto:anulmundra@indianexpatsindubai.com?subject=Goals%20Discussion">Contact our team <ArrowRight size={18}/></a><a className="pr-phone" href="tel:+971564800026">+971 56 480 0026</a></dialog></section>;
}
