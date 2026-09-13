import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './navbar.css';

const navLinks = [
  { name: 'Home', id: 'home', href: '/', subtitle: 'Growth Partner in UAE' },
  { name: 'SEO & Digital', id: 'digital', href: '/seo-digital-marketing', subtitle: 'Turn Visibility Into Results' },
  { name: 'Community', id: 'community', href: '/community', subtitle: '500K+ Expat Network' },
  { name: 'Influencers', id: 'influencer', href: '/#influencer', subtitle: 'Authentic Creator Reach' },
  { name: 'Get in Touch', id: 'contact', href: '#contact', subtitle: "Let's Grow Your Brand" },
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

  const handleCta = (e) => {
    e.preventDefault();
  };

  const isFunctionalLink = (link) => {
    return link.id === 'home' || link.name.toLowerCase().includes('about');
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
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                aria-current={link.id === activeId ? 'page' : undefined}
                className={`nav-link ${link.id === activeId ? 'active' : ''}`}
                onClick={isFunctionalLink(link) ? undefined : (e) => e.preventDefault()}
              >
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Right side actions */}
        <div className="header-actions">
          <button className="header-cta-btn" onClick={handleCta}>
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
                  aria-label="Close navigation menu"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              {/* Drawer links */}
              <div className="mobile-nav-links">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    className={`mobile-nav-item ${link.id === activeId ? 'active' : ''}`}
                    onClick={(e) => {
                      setMenu(false);
                      if (!isFunctionalLink(link)) {
                        e.preventDefault();
                      }
                    }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.25 }}
                  >
                    <div className="mobile-nav-item-content">
                      <span className="mobile-nav-item-title">{link.name}</span>
                      <span className="mobile-nav-item-sub">{link.subtitle}</span>
                    </div>
                    <ArrowRight size={16} className="mobile-nav-arrow" />
                  </motion.a>
                ))}
              </div>

              {/* Drawer footer CTA */}
              <div className="mobile-nav-footer">
                <button
                  className="mobile-nav-cta-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenu(false);
                  }}
                >
                  <span>Let's Grow Your Brand</span>
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

