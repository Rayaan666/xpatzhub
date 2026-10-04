import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Phone, Mail } from 'lucide-react';
import { prFaqData, prFaqSchemaData } from './prFaqContent';
import './pr-faq.css';

export default function PrFaq({ onEnquire }) {
  const [openId, setOpenId] = useState(null);
  const reduced = useReducedMotion();

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const reveal = (delay = 0, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const mailtoHref = `mailto:anulmundra@indianexpatsindubai.com?subject=${encodeURIComponent('PR & Brand Visibility Consultation')}`;

  return (
    <section id="pr-faq" className="pr-faq-section" aria-labelledby="pr-faq-heading">
      {/* Schema.org FAQPage for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prFaqSchemaData) }}
      />

      <div className="pr-faq-container">
        <div className="pr-faq-layout">
          {/* LEFT INTRO COLUMN (Sticky Desktop) */}
          <div className="pr-faq-intro-col">
            <header className="pr-faq-header border-t border-[#363831] pt-8">
              <motion.div {...reveal(0, 10)}>
                <p className="pr-faq-eyebrow">PR &amp; VISIBILITY FAQS</p>
                <h2 id="pr-faq-heading" className="pr-faq-heading">
                  <span>Got Questions?</span>
                  <span>Clear Answers.</span>
                </h2>
              </motion.div>
              <motion.p className="pr-faq-lead" {...reveal(0.08, 14)}>
                Everything you need to know about media positioning, press features, outdoor visibility, and building commanding brand authority in Dubai &amp; the UAE.
              </motion.p>
            </header>

            {/* CONSULTATION CARD */}
            <motion.div className="pr-faq-card" {...reveal(0.18, 16)}>
              <div className="pr-faq-card-header">
                <div className="pr-faq-card-icon" aria-hidden="true">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="pr-faq-card-title">Need a tailored PR strategy?</h3>
                  <p className="pr-faq-card-sub">
                    Our team will map out bespoke media opportunities built around your brand goals.
                  </p>
                </div>
              </div>

              <div className="pr-faq-card-actions">
                <a
                  href={mailtoHref}
                  className="pr-faq-primary-btn"
                  onClick={(e) => {
                    if (onEnquire) {
                      e.preventDefault();
                      onEnquire(e);
                    }
                  }}
                >
                  <span>Request PR Consultation</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="pr-faq-card-footer">
                <a href="tel:+971564800026" className="pr-faq-footer-item">
                  <Phone size={13} /> +971 56 480 0026
                </a>
                <span className="pr-faq-footer-divider">·</span>
                <a href={mailtoHref} className="pr-faq-footer-item">
                  <Mail size={13} /> Email PR Team
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ACCORDION LIST */}
          <div className="pr-faq-accordion-col">
            <div className="pr-faq-list" role="tablist" aria-multiselectable="false">
              {prFaqData.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `pr-faq-btn-${item.id}`;
                const panelId = `pr-faq-panel-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    className={`pr-faq-item ${isOpen ? 'is-open' : ''}`}
                    initial={reduced ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{
                      duration: 0.45,
                      delay: reduced ? 0 : index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {isOpen && (
                      <motion.div
                        className="pr-faq-indicator"
                        layoutId="activePrFaqIndicator"
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      id={buttonId}
                      type="button"
                      className="pr-faq-trigger"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="pr-faq-trigger-left">
                        <span className="pr-faq-number">{item.number}</span>
                        <h3 className="pr-faq-question">{item.question}</h3>
                      </div>

                      <div className={`pr-faq-chevron-box ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="pr-faq-answer-wrap"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="pr-faq-answer-inner">
                            <p className="pr-faq-answer">{item.answer}</p>
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

        {/* BOTTOM BRAND DIVIDER */}
        <div className="pr-faq-bottom-divider">
          <span className="pr-faq-bottom-brand">XPATZHUB</span>
          <div className="pr-faq-bottom-line" aria-hidden="true" />
          <span className="pr-faq-bottom-text">
            PR &amp; BRAND VISIBILITY · MEDIA RELATIONS · EXECUTIVE REPUTATION
          </span>
        </div>
      </div>
    </section>
  );
}
