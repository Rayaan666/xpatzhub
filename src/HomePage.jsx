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
import CommunityPower from './CommunityPower';
import CommunityActivation from './CommunityActivation';
import CommunityFaq from './CommunityFaq';
const isCommunityPage = window.location.pathname.replace(/\/+$/, '') === '/community';
const activePage = isCommunityPage ? 'community' : 'home';
if (isCommunityPage) document.title = 'Community Marketing in the UAE | XPATZHUB';

const navLinks = [
  { name: 'Home', id: 'home', href: isCommunityPage ? '/' : '#home', subtitle: 'Growth Partner in UAE' },
  { name: 'SEO & Digital', id: 'digital', href: '/seo-digital-marketing', subtitle: 'Turn Visibility Into Results' },
  { name: 'Community', id: 'community', href: '/community', subtitle: '500K+ Expat Network' },
  { name: 'Influencers', id: 'influencer', href: '#influencer', subtitle: 'Authentic Creator Reach' },
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

  // Everything is a demo / non-functional home page
  const noop = e => e.preventDefault();

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="brand-logo" aria-label="XPATZHUB home" onClick={isCommunityPage ? undefined : noop}>
            <img src="/logo.png" alt="XPATZHUB" className="brand-logo-img" />
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-links-wrap">
              {navLinks.map(link => {
                const isFunctional = link.id === 'home' || link.id === 'digital';
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={link.id === activePage ? 'page' : undefined}
                    className={`nav-link ${link.id === activePage ? 'active' : ''}`}
                    onClick={isFunctional ? () => setMenu(false) : noop}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            <button className="header-cta-btn" onClick={noop}>
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
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      className={`mobile-nav-link ${link.id === activePage ? 'active' : ''}`}
                      onClick={e => {
                        setMenu(false);
                        if (!(link.id === 'home' || link.id === 'digital')) {
                          e.preventDefault();
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
                  ))}
                </div>

                {/* Footer */}
                <div className="mobile-nav-footer">
                  <button className="mobile-nav-cta" onClick={noop}>
                    <span>Start Growing Today</span>
                    <ArrowRight size={16} />
                  </button>
                  <div className="mobile-nav-contact-info">
                    <a href="tel:+971564800026" className="mobile-contact-item" onClick={noop}>
                      <Phone size={14} />
                      <span>+971 56 480 0026</span>
                    </a>
                    <a href="mailto:anulmundra@indianexpatsindubai.com" className="mobile-contact-item" onClick={noop}>
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
        {isCommunityPage ? <CommunityHero /> : isMobile ? <MobileHero /> : <DesktopHero />}
        {isCommunityPage && <CommunityPower />}
        {isCommunityPage && <CommunityActivation />}
        <Solutions onEnquire={noop} />
        {isCommunityPage && <CommunityFaq onEnquire={noop} />}
        <Footer onEnquire={noop} onOpen={noop} />
      </main>
    </>
  );
}

export default function HomePage() {
  return <App />;
}

