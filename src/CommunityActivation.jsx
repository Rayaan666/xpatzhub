import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './community-activation.css';

const chapters = [
  { name: 'Connect', image: 'connect', alt: 'A candid gathering around a café table in warm UAE afternoon light.', services: [
    ['Community Campaigns', 'Targeted campaigns that introduce brands to relevant communities and encourage genuine participation.'],
    ['Strategic Partnerships', 'Connect brands with businesses, communities and organisations that create mutually valuable opportunities.'],
  ] },
  { name: 'Activate', image: 'activate', alt: 'Visitors exploring products and interacting at an outdoor brand activation kiosk.', services: [
    ['Brand Collaborations', 'Build authentic collaborations that expand visibility and introduce brands to new audiences.'],
    ['On-Ground Activations', 'Bring brands directly to people through physical experiences, promotions and interactive activations.'],
  ] },
  { name: 'Experience', image: 'experience', alt: 'People enjoying an outdoor UAE evening meetup beneath golden festoon lights.', services: [
    ['Events & Meetups', 'Create community-led gatherings that encourage conversations, networking and memorable brand experiences.'],
    ['UAE-Wide Reach', 'Connect campaigns with diverse expat audiences and communities across the UAE.'],
  ] },
];

function Chapter({ chapter, index, reduced }) {
  const ease = [0.22, 1, 0.36, 1];
  return <motion.article className={`community-activation__band community-activation__band--${chapter.image}`} aria-labelledby={`community-chapter-${chapter.image}`} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .16 }}>
    <motion.div className="community-activation__photo" variants={{hidden:{clipPath:'inset(0 0 0 24%)'},visible:{clipPath:'inset(0 0 0 0%)'}}} transition={{duration:1.15,ease}}>
      <motion.img src={`/assets/community-activation/${chapter.image}.webp`} srcSet={`/assets/community-activation/${chapter.image}-960.webp 960w, /assets/community-activation/${chapter.image}.webp 1672w`} sizes="(max-width: 767px) 960px, 100vw" width="1672" height="941" alt={chapter.alt} loading="lazy" decoding="async" variants={{hidden:{scale:1.04},visible:{scale:1}}} transition={{duration:1.35,ease}} />
    </motion.div>
    <div className="community-activation__shade" aria-hidden="true" />
    <div className="community-activation__content">
      <p className="community-activation__number"><span>0{index + 1}</span><i aria-hidden="true" /></p>
      <motion.p id={`community-chapter-${chapter.image}`} className="community-activation__word" variants={{hidden:{y:18,opacity:.65},visible:{y:0,opacity:1}}} transition={{duration:1.55,ease}}>{chapter.name}</motion.p>
      <motion.div className="community-activation__services" variants={{hidden:{y:14,opacity:0},visible:{y:0,opacity:1}}} transition={{duration:.65,delay:.15,ease}}>
        {chapter.services.map(([title,description]) => <div className="community-activation__service" key={title}><h3>{title}</h3><p>{description}</p></div>)}
      </motion.div>
    </div>
  </motion.article>;
}

export default function CommunityActivation() {
  const reduced = useReducedMotion();
  return <section className="community-activation" aria-labelledby="community-activation-title">
    <header className="community-activation__intro">
      <div><p className="community-activation__eyebrow">WHAT WE DO</p><h2 id="community-activation-title"><span>From Audience</span><em>to Active Community.</em></h2></div>
      <p className="community-activation__description">We turn community reach into meaningful brand interactions through campaigns, partnerships, activations and experiences designed around real people.</p>
    </header>
    <div className="community-activation__bands">{chapters.map((chapter,index) => <Chapter key={chapter.image} chapter={chapter} index={index} reduced={reduced} />)}</div>
  </section>;
}
