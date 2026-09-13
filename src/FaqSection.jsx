import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Sparkles, Clock } from 'lucide-react';
import { faqData, faqSchemaData } from './faqContent';
import './faq-section.css';

export default function FaqSection() {
  const [openId, setOpenId] = useState(null);
  const reduced = useReducedMotion();

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const reveal = (delay = 0, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <section
      id="faq"
      className="faq-section"
      aria-labelledby="faq-main-heading"
    >
      {/* FAQ Schema for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="faq-container">
        <div className="faq-layout">
          {/* LEFT SIDE (Approx 35-38%) */}
          <div className="faq-left-col">
            <motion.div className="faq-eyebrow-wrapper" {...reveal(0, 0)}>
              <p className="faq-eyebrow">QUESTIONS? WE’VE GOT ANSWERS.</p>
              <div className="faq-eyebrow-line" aria-hidden="true" />
            </motion.div>

            <motion.h2
              id="faq-main-heading"
              className="faq-heading"
              {...reveal(0.06, 25)}
            >
              Everything You<br />
              Need to Know<br />
              Before We<br />
              <span className="faq-blue-text">Get Started.</span>
            </motion.h2>

            <motion.p className="faq-supporting" {...reveal(0.12, 15)}>
              Have questions about SEO, digital marketing or working with XPATZHUB?
              Here are some of the things brands ask us most.
            </motion.p>

            {/* Small Contact CTA */}
            <motion.div className="faq-contact-cta" {...reveal(0.22, 0)}>
              <div className="faq-contact-prompt">Still have a question?</div>
              <a href="#contact" className="faq-contact-link" onClick={e => e.preventDefault()}>
                Let's Talk{' '}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div className="faq-support-card" {...reveal(0.26, 15)}>
              <h4 className="faq-support-title">Need custom answers for your brand?</h4>
              <p className="faq-support-desc">
                Book a free 15-minute consultation with our Dubai growth strategists.
              </p>
              <div className="faq-support-actions">
                <a href="tel:+971564800026" className="faq-support-btn faq-btn-phone" onClick={e => e.preventDefault()}>
                  <Phone size={15} /> +971 56 480 0026
                </a>
                <a href="mailto:hello@xpatzhub.com" className="faq-support-btn faq-btn-email" onClick={e => e.preventDefault()}>
                  <Mail size={15} /> Email Strategy Team
                </a>
              </div>
              <div className="faq-support-footer">
                <Clock size={13} />
                <span>Response time: &lt; 2 hours during UAE business hours</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE (Approx 62-65%) - Accordion */}
          <div className="faq-right-col">
            <div className="faq-accordion" role="tablist" aria-multiselectable="false">
              {faqData.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `faq-btn-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    className={`faq-item ${isOpen ? 'faq-item-active' : ''}`}
                    initial={reduced ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: reduced ? 0 : 0.04 * index,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Subtle active blue vertical indicator */}
                    {isOpen && (
                      <motion.div
                        className="faq-active-bar"
                        layoutId="activeFaqIndicator"
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      id={buttonId}
                      type="button"
                      className="faq-trigger"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="faq-trigger-content">
                        <span className="faq-number">{item.number}</span>
                        <h3 className="faq-question-text">{item.question}</h3>
                      </div>

                      <div
                        className={`faq-toggle-btn ${isOpen ? 'is-open' : ''}`}
                        aria-hidden="true"
                      >
                        <div className="faq-toggle-icon">
                          <span className="faq-toggle-h-line" />
                          <span className="faq-toggle-v-line" />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="faq-answer-wrapper"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.25, 1, 0.35, 1] }}
                        >
                          <div className="faq-answer-content">
                            <p className="faq-answer-text">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM EDITORIAL TRANSITION DIVIDER */}
        <div className="faq-bottom-divider">
          <span className="faq-bottom-brand">XPATZHUB</span>
          <div className="faq-bottom-rule" aria-hidden="true" />
          <span className="faq-bottom-tagline">
            MARKETING · VISIBILITY · GROWTH
          </span>
        </div>
      </div>
    </section>
  );
}
