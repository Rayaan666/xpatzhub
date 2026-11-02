import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './navbar.css';

const navLinks = [
  { name: 'Home', id: 'home', href: '/', subtitle: 'Growth Partner in UAE' },
  { name: 'SEO & Digital', id: 'digital', href: '/seo-digital-marketing', subtitle: 'Turn Visibility Into Results' },
  { name: 'Community', id: 'community', href: '/community', subtitle: '500K+ Expat Network' },
  { name: 'Influencers', id: 'influencer', href: '/influencers', subtitle: 'Authentic Creator Reach' },
  { name: 'PR & Visibility', id: 'pr', href: '/pr-brand-visibility', subtitle: 'Be Seen & Remembered' },
  { name: 'Events', id: 'events', href: '/events-experiences-uae', subtitle: 'Moments That Connect' },
  { name: 'Get in Touch', id: 'contact', href: '/get-in-touch', subtitle: "Let's Grow Your Brand" },
];

function BurgerIcon({ isOpen }) {
  return (
    <div className="burger-icon" aria-hidden="true">
      <span className={`burger-line burger-line-1 ${isOpen ? 'open' : ''}`} />
      <span className={`burger-line burger-line-2 ${isOpen ? 'open' : ''}`} />
      <span className={`burger-line burger-line-3 ${isOpen ? 'open' : ''}`} />
    </div>
  );
}

export default function Navbar({ activeId = 'digital', onContactClick }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && menu) setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNonFunctional = (e) => {
    if (e && e.preventDefault) e.preventDefault();
  };

  return (
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
              const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community' || link.id === 'influencer' || link.id === 'pr' || link.id === 'events' || link.id === 'contact';
              return (
                <a
                  key={link.id}
                  href={isFunctional ? link.href : '#'}
                  aria-current={link.id === activeId ? 'page' : undefined}
                  className={`nav-link ${link.id === activeId ? 'active' : ''}`}
                  onClick={(e) => {
                    if (!isFunctional) {
                      handleNonFunctional(e);
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
          <button
            className="header-cta-btn"
            onClick={(e) => {
              if (onContactClick) {
                onContactClick(e);
              } else {
                window.location.href = '/get-in-touch';
              }
            }}
          >
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
                  <span aria-hidden="true">✕</span>
                </button>
              </div>

              {/* Minimal Section Label */}
              <div className="mobile-nav-eyebrow">
                <span>NAVIGATION</span>
                <span className="mobile-nav-dot" />
                <span>UAE GROWTH</span>
              </div>

              {/* Links */}
              <div className="mobile-nav-links">
                {navLinks.map((link, i) => {
                  const isContact = link.id === 'contact';
                  const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community' || link.id === 'influencer' || link.id === 'pr' || link.id === 'events' || isContact;
                  const isActive = link.id === activeId;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        setMenu(false);
                        if (isContact && onContactClick) {
                          e.preventDefault();
                          onContactClick(e);
                        } else if (!isFunctional) {
                          handleNonFunctional(e);
                        }
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 + i * 0.035, ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
                    >
                      <div className="mobile-nav-link-left">
                        <span className="mobile-nav-index">0{i + 1}</span>
                        <div className="mobile-nav-link-content">
                          <span className="mobile-nav-link-title">{link.name}</span>
                          {link.subtitle && <span className="mobile-nav-link-sub">{link.subtitle}</span>}
                        </div>
                      </div>
                      <div className="mobile-nav-link-arrow" aria-hidden="true">
                        <ArrowRight size={15} />
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mobile-nav-footer">
                <button
                  className="mobile-nav-cta"
                  onClick={(e) => {
                    setMenu(false);
                    if (onContactClick) {
                      onContactClick(e);
                    } else {
                      window.location.href = '/get-in-touch';
                    }
                  }}
                >
                  <span>Let's Grow Your Brand</span>
                  <ArrowRight size={16} />
                </button>
                <div className="mobile-nav-meta">
                  <span>Dubai & Abu Dhabi</span>
                  <span>•</span>
                  <span>Authentic UAE Reach</span>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
