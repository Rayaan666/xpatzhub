import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './navbar.css';

const navLinks = [
  { name: 'Home', id: 'home', href: '/', subtitle: 'Growth Partner in UAE' },
  { name: 'SEO & Digital', id: 'digital', href: '/seo-digital-marketing', subtitle: 'Turn Visibility Into Results' },
  { name: 'Community', id: 'community', href: '/community', subtitle: '500K+ Expat Network' },
  { name: 'Influencers', id: 'influencer', href: '#', subtitle: 'Authentic Creator Reach' },
  { name: 'Get in Touch', id: 'contact', href: '#', subtitle: "Let's Grow Your Brand" },
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

export default function Navbar({ activeId = 'digital' }) {
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
              const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community';
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
          <button className="header-cta-btn" onClick={handleNonFunctional}>
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

              {/* Links */}
              <div className="mobile-nav-links">
                {navLinks.map((link, i) => {
                  const isFunctional = link.id === 'home' || link.id === 'digital' || link.id === 'community';
                  return (
                    <motion.a
                      key={link.id}
                      href={isFunctional ? link.href : '#'}
                      className={`mobile-nav-link ${link.id === activeId ? 'active' : ''}`}
                      onClick={(e) => {
                        if (!isFunctional) {
                          handleNonFunctional(e);
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
                <button
                  className="mobile-nav-cta"
                  onClick={handleNonFunctional}
                >
                  <span>Start Growing Today</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
