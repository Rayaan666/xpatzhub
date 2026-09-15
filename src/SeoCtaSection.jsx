import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import './seo-cta-section.css';

export default function SeoCtaSection({ onOpenStrategyModal }) {
  const reduced = useReducedMotion();

  const reveal = (delay = 0, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <section className="seo-cta-section" id="start-project">
      {/* Dynamic Background Atmosphere */}
      <div className="seo-cta-bg">
        <div className="seo-cta-glow-1" />
        <div className="seo-cta-glow-2" />
        <div className="seo-cta-grid-pattern" />
      </div>

      <div className="seo-cta-container">
        <motion.div className="seo-cta-card" {...reveal(0, 30)}>
          <div className="seo-cta-content">
            <motion.div className="seo-cta-eyebrow" {...reveal(0.05, 0)}>
              <span className="seo-cta-eyebrow-dot" />
              <span>DOMINATE SEARCH & DIGITAL GROWTH IN DUBAI</span>
            </motion.div>

            <motion.h2 className="seo-cta-heading" {...reveal(0.1, 20)}>
              Ready to Rank Higher & Drive Qualified Customers in <span className="blue-highlight">Dubai & the UAE?</span>
            </motion.h2>

            <motion.p className="seo-cta-description" {...reveal(0.15, 15)}>
              Scale your online visibility, capture high-intent search traffic, and outperform competitors with data-driven SEO, Google Ads, and performance marketing strategies engineered specifically for UAE market growth.
            </motion.p>

            <motion.div className="seo-cta-actions" {...reveal(0.2, 10)}>
              <button
                type="button"
                className="seo-cta-button-primary"
                onClick={(e) => e.preventDefault()}
              >
                Get Your Free SEO Audit & Strategy Call <ArrowRight size={20} aria-hidden="true" />
              </button>

              <a href="#" onClick={(e) => e.preventDefault()} className="seo-cta-button-secondary">
                Speak With an SEO Specialist
              </a>
            </motion.div>
          </div>

          {/* Key Metrics / Social Proof Sidebar */}
          <motion.div className="seo-cta-proof" {...reveal(0.25, 15)}>
            <div className="seo-cta-stat-item">
              <span className="seo-cta-stat-value">+120%</span>
              <span className="seo-cta-stat-label">Organic Traffic</span>
            </div>
            <div className="seo-cta-stat-item">
              <span className="seo-cta-stat-value">3.4X</span>
              <span className="seo-cta-stat-label">Average Ad ROAS</span>
            </div>
            <div className="seo-cta-stat-item">
              <span className="seo-cta-stat-value">#1</span>
              <span className="seo-cta-stat-label">Rankings Growth</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
