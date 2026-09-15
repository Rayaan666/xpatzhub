import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Phone, Mail, MapPin } from 'lucide-react';
import './styles.css';
import './navbar.css';
import Solutions from './Solutions';
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
const isCommunityPage = window.location.pathname.replace(/\/+$/, '') === '/community';
const isInfluencersPage = window.location.pathname.replace(/\/+$/, '') === '/influencers';
const activePage = isInfluencersPage ? 'influencer' : isCommunityPage ? 'community' : 'home';
if (isInfluencersPage) document.title = 'Influencer Marketing in the UAE | XPATZHUB';
if (isCommunityPage) document.title = 'Community Marketing in the UAE | XPATZHUB';

const navLinks = [
  { name: 'Home', id: 'home', href: isCommunityPage || isInfluencersPage ? '/' : '#home', subtitle: 'Growth Partner in UAE' },
  { name: 'SEO & Digital', id: 'digital', href: '/seo-digital-marketing', subtitle: 'Turn Visibility Into Results' },
  { name: 'Community', id: 'community', href: '/community', subtitle: '500K+ Expat Network' },
  { name: 'Influencers', id: 'influencer', href: '/influencers', subtitle: 'Authentic Creator Reach' },
  { name: 'Get in Touch', id: 'contact', href: '#contact', subtitle: "Let's Grow Your Brand" },
];

// Animated burger icon — morphs 3 lines → X
function BurgerIcon({ isOpen }) {
  return (
    <div className="burger-icon" aria-hidden="true">
      <span className={`burger-line burger-line-1 ${isOpen ? 'open' : ''}`} />
      <span className={`burger-line burger-line-2 ${isOpen ? 'open' : ''}`} />
      <span className={`burger-line burger-line-3 ${isOpen ? 'open' : ''}`} />
    </div>
  );
}

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

  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  // Escape key closes menu
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && menu) setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  // Scroll listener — header elevation only, stays on home
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openContact = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerRef.current = document.activeElement;
    setMenu(false);
    contactDialogRef.current?.showModal();
  };

  const closeContact = () => {
    contactDialogRef.current?.close();
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="brand-logo" aria-label="XPATZHUB home">
            <img src="/logo.png" alt="XPATZHUB" className="brand-logo-img" />
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-links-wrap">
              {navLinks.map(link => {
                const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community';
                return (
                  <a
                    key={link.id}
                    href={isFunctional ? link.href : '#'}
                    aria-current={link.id === activePage ? 'page' : undefined}
                    className={`nav-link ${link.id === activePage ? 'active' : ''}`}
                    onClick={(e) => {
                      if (!isFunctional) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            <button className="header-cta-btn" onClick={(e) => e.preventDefault()}>
              <span>Let's Grow</span>
              <ArrowRight size={15} className="cta-icon" />
            </button>

            {/* Creative animated burger button */}
            <button
              className={`menu-button ${menu ? 'menu-open' : ''}`}
              aria-label={menu ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menu}
              onClick={() => setMenu(prev => !prev)}
            >
              <BurgerIcon isOpen={menu} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menu && (
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenu(false)}
            >
              <motion.nav
                className="mobile-nav-drawer"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
              >
                {/* Drawer header */}
                <div className="mobile-nav-header">
                  <div className="mobile-nav-brand">
                    <img src="/logo.png" alt="XPATZHUB" className="mobile-nav-logo" />
                  </div>
                  <button
                    className="mobile-nav-close"
                    onClick={() => setMenu(false)}
                    aria-label="Close navigation"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <div className="mobile-nav-links">
                  {navLinks.map((link, i) => {
                    const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community';
                    return (
                      <motion.a
                        key={link.id}
                        href={isFunctional ? link.href : '#'}
                        className={`mobile-nav-link ${link.id === activePage ? 'active' : ''}`}
                        onClick={(e) => {
                          if (!isFunctional) {
                            e.preventDefault();
                          } else {
                            setMenu(false);
                          }
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.04, ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                      >
                        <div className="mobile-nav-link-content">
                          <span className="mobile-nav-link-title">{link.name}</span>
                          {link.subtitle && <span className="mobile-nav-link-sub">{link.subtitle}</span>}
                        </div>
                        <span className="mobile-nav-link-num">0{i + 1}</span>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mobile-nav-footer">
                  <button className="mobile-nav-cta" onClick={(e) => e.preventDefault()}>
                    <span>Start Growing Today</span>
                    <ArrowRight size={16} />
                  </button>
                  <div className="mobile-nav-contact-info">
                    <a href="#" onClick={(e) => e.preventDefault()} className="mobile-contact-item">
                      <Phone size={14} />
                      <span>+971 56 480 0026</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="mobile-contact-item">
                      <Mail size={14} />
                      <span>anulmundra@indianexpatsindubai.com</span>
                    </a>
                    <div className="mobile-contact-item location">
                      <MapPin size={14} />
                      <span>Dubai · Abu Dhabi · UAE</span>
                    </div>
                  </div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {isInfluencersPage ? <InfluencersHero onEnquire={(e) => e?.preventDefault && e.preventDefault()} /> : isCommunityPage ? <CommunityHero /> : isMobile ? <MobileHero /> : <DesktopHero />}
        {isInfluencersPage && <WhyInfluenceWorks />}
        {isCommunityPage && <CommunityPower />}
        {isCommunityPage && <CommunityActivation />}
        {!isCommunityPage && <Solutions onEnquire={(e) => e?.preventDefault && e.preventDefault()} />}
        {isCommunityPage && <CommunityFaq onEnquire={(e) => e?.preventDefault && e.preventDefault()} />}
        {isInfluencersPage && <InfluenceImpact />}
        <Footer 
          onEnquire={(e) => e?.preventDefault && e.preventDefault()} 
          onOpen={(e) => e?.preventDefault && e.preventDefault()} 
          onCtaClick={(e) => e?.preventDefault && e.preventDefault()}
          {...(isCommunityPage ? {
            ctaTitle: "Ready to Connect With 500,000+ Engaged Expats in Dubai & the UAE?",
            ctaDescription: "Tap into Dubai & Abu Dhabi's premier expat network. Build authentic brand trust, drive word-of-mouth growth, and activate high-converting community marketing campaigns across the UAE.",
            ctaButtonText: "Activate Your Community Campaign",
            ctaBgImage: "/community/CTA.png"
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

