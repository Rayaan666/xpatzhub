import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Phone, Mail, MapPin } from 'lucide-react';
import './styles.css';
import './navbar.css';
import Solutions from './Solutions';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileHero from './MobileHero';
import DesktopHero from './DesktopHero';
import CommunityHero from './CommunityHero';
import InfluencersHero from './InfluencersHero';
import WhyInfluenceWorks from './WhyInfluenceWorks';
import InfluenceImpact from './InfluenceImpact';
import CommunityPower from './CommunityPower';
import CommunityActivation from './CommunityActivation';
import CommunityFaq from './CommunityFaq';
import InfluencerFaq from './InfluencerFaq';
const isCommunityPage = window.location.pathname.replace(/\/+$/, '') === '/community';
const isInfluencersPage = window.location.pathname.replace(/\/+$/, '') === '/influencers';
const activePage = isInfluencersPage ? 'influencer' : isCommunityPage ? 'community' : 'home';
if (isInfluencersPage) {
  document.title = 'Influencer Marketing Agency in Dubai & UAE | XPATZHUB';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Scale your brand with premier UAE influencer marketing. Connect with vetted creators, drive authentic engagement, and activate high-ROI creator campaigns in Dubai & Abu Dhabi.');
  }
}
if (isCommunityPage) document.title = 'Community Marketing in the UAE | XPATZHUB';

function App() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  const contactDialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const openContact = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerRef.current = document.activeElement;
    contactDialogRef.current?.showModal();
  };

  const closeContact = () => {
    contactDialogRef.current?.close();
  };

  return (
    <>
      <Navbar activeId={activePage} onContactClick={openContact} />

      <main>
        {isInfluencersPage ? <InfluencersHero onEnquire={openContact} /> : isCommunityPage ? <CommunityHero onOpenContact={openContact} /> : isMobile ? <MobileHero onOpenContact={openContact} /> : <DesktopHero onOpenContact={openContact} />}
        {isInfluencersPage && <WhyInfluenceWorks />}
        {isCommunityPage && <CommunityPower />}
        {isCommunityPage && <CommunityActivation />}
        {!isCommunityPage && !isInfluencersPage && <Solutions onEnquire={openContact} />}
        {isCommunityPage && <CommunityFaq onEnquire={openContact} />}
        {isInfluencersPage && <InfluenceImpact />}
        {isInfluencersPage && <InfluencerFaq onEnquire={openContact} />}
        <Footer 
          onEnquire={openContact} 
          onOpen={openContact} 
          onCtaClick={openContact}
          {...(isCommunityPage ? {
            ctaTitle: "Ready to Connect With 500,000+ Engaged Expats in Dubai & the UAE?",
            ctaDescription: "Tap into Dubai & Abu Dhabi's premier expat network. Build authentic brand trust, drive word-of-mouth growth, and activate high-converting community marketing campaigns across the UAE.",
            ctaButtonText: "Activate Your Community Campaign",
            ctaBgImage: "/community/CTA.png"
          } : isInfluencersPage ? {
            ctaTitle: "Ready to Scale Your Brand With Top UAE Creators & Influencers?",
            ctaDescription: "Partner with Dubai & Abu Dhabi's most trusted voices. From strategic creator selection and campaign management to high-impact content and measurable ROI, we turn authentic storytelling into brand growth.",
            ctaButtonText: "Launch Your Influencer Campaign",
            ctaBgImage: "/assets/influencers/creator-cafe-1536.webp"
          } : {})}
        />
      </main>

      {/* Shared Global Contact Dialog */}
      <dialog
        ref={contactDialogRef}
        className="dh-dialog"
        aria-labelledby="dialog-title"
        onClose={() => triggerRef.current?.focus()}
        onClick={e => { if (e.target === contactDialogRef.current) closeContact(); }}
      >
        <button className="dh-dialog-close" aria-label="Close dialog" onClick={closeContact}>
          <X />
        </button>
        <p>XPATZHUB</p>
        <h2 id="dialog-title">Let’s grow your brand.</h2>
        <p>Tell us what you have in mind for your brand in Dubai &amp; the UAE.</p>
        <div className="flex flex-col gap-3 mt-4">
          <a href="mailto:anulmundra@indianexpatsindubai.com" className="dh-dialog-link">
            anulmundra@indianexpatsindubai.com
          </a>
          <a href="tel:+971564800026" className="dh-dialog-phone">
            +971 56 480 0026
          </a>
        </div>
      </dialog>
    </>
  );
}

export default function HomePage() {
  return <App />;
}

