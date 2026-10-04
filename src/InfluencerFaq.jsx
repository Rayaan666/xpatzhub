import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';
import { influencerFaqData, influencerFaqSchemaData } from './influencerFaqContent';
import './influencer-faq.css';

export default function InfluencerFaq({ onEnquire }) {
  const [openId, setOpenId] = useState(null);
  const reduced = useReducedMotion();

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const reveal = (delay = 0, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <section
      id="influencers-faq"
      className="inf-faq-section"
      aria-labelledby="inf-faq-heading"
    >
      {/* Schema.org FAQPage for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(influencerFaqSchemaData) }}
      />

      <div className="inf-faq-container">
        <div className="inf-faq-layout">
          {/* ============================================================
              LEFT INTRO COLUMN (Sticky Desktop)
              ============================================================ */}
          <div className="inf-faq-intro-col">
            <header className="inf-faq-header border-t border-[#363831] pt-8">
              <motion.div {...reveal(0, 10)}>
                <p className="inf-faq-eyebrow">CREATOR &amp; INFLUENCER FAQS</p>
                <h2 id="inf-faq-heading" className="inf-faq-heading">
                  <span>Common Questions.</span>
                  <span>Real Answers.</span>
                </h2>
              </motion.div>
              <motion.p className="inf-faq-lead" {...reveal(0.08, 14)}>
                Everything you need to know about working with verified creators,
                scaling authentic content, and driving real engagement across Dubai &amp; the UAE.
              </motion.p>
            </header>

            {/* CONSULTATION / STILL CURIOUS CARD */}
            <motion.div className="inf-faq-card" {...reveal(0.18, 16)}>
              <div className="inf-faq-card-header">
                <div>
                  <h4 className="inf-faq-card-title">Looking for specific creators?</h4>
                  <p className="inf-faq-card-sub">
                    Our team can curate a bespoke creator roster tailored to your brand niche.
                  </p>
                </div>
              </div>

              <div className="inf-faq-card-actions">
                <button
                  type="button"
                  className="inf-faq-primary-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onEnquire) onEnquire(e);
                  }}
                >
                  <span>Request Creator Roster</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>

              <div className="inf-faq-card-footer">
                <a href="tel:+971564800026" className="inf-faq-footer-item">
                  <Phone size={13} /> +971 56 480 0026
                </a>
                <span className="inf-faq-footer-divider">·</span>
                <a href="mailto:anulmundra@indianexpatsindubai.com?subject=Influencer%20Inquiry" className="inf-faq-footer-item">
                  <Mail size={13} /> Email Team
                </a>
              </div>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: ACCORDION LIST
              ============================================================ */}
          <div className="inf-faq-accordion-col">
            <div className="inf-faq-list" role="tablist" aria-multiselectable="false">
              {influencerFaqData.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `inf-faq-btn-${item.id}`;
                const panelId = `inf-faq-panel-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    className={`inf-faq-item ${isOpen ? 'is-open' : ''}`}
                    initial={reduced ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{
                      duration: 0.45,
                      delay: reduced ? 0 : index * 0.035,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Glowing vertical line for active state */}
                    {isOpen && (
                      <motion.div
                        className="inf-faq-indicator"
                        layoutId="activeInfluencerFaqIndicator"
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      id={buttonId}
                      type="button"
                      className="inf-faq-trigger"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="inf-faq-trigger-left">
                        <span className="inf-faq-number">{item.number}</span>
                        <h3 className="inf-faq-question">{item.question}</h3>
                      </div>

                      <div className={`inf-faq-chevron-box ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="inf-faq-answer-wrap"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="inf-faq-answer-inner">
                            <p className="inf-faq-answer">{item.answer}</p>
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
        <div className="inf-faq-bottom-divider">
          <span className="inf-faq-bottom-brand">XPATZHUB</span>
          <div className="inf-faq-bottom-line" aria-hidden="true" />
          <span className="inf-faq-bottom-text">
            CREATOR MARKETING · STORIES · CONNECTIONS
          </span>
        </div>
      </div>
    </section>
  );
}
