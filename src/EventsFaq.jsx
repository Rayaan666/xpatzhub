import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, Mail } from 'lucide-react';
import { eventsFaqData, eventsFaqSchemaData } from './eventsFaqContent';
import './events-faq.css';

export default function EventsFaq({ onEnquire }) {
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

  const mailtoHref = `mailto:anulmundra@indianexpatsindubai.com?subject=${encodeURIComponent('Events & Experiences Consultation')}`;

  return (
    <section id="events-faq" className="events-faq-section" aria-labelledby="events-faq-heading">
      {/* Schema.org FAQPage for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsFaqSchemaData) }}
      />

      <div className="events-faq-container">
        <div className="events-faq-layout">
          {/* LEFT INTRO COLUMN (Sticky Desktop) */}
          <div className="events-faq-intro-col">
            <header className="events-faq-header border-t border-[#1e293b] pt-8">
              <motion.div {...reveal(0, 10)}>
                <p className="events-faq-eyebrow">EVENTS &amp; EXPERIENCES FAQS</p>
                <h2 id="events-faq-heading" className="events-faq-heading">
                  <span>Got Questions?</span>
                  <span>Clear Answers.</span>
                </h2>
              </motion.div>
              <motion.p className="events-faq-lead" {...reveal(0.08, 14)}>
                Everything you need to know about concept design, guest curation, audiovisual production, and bringing unforgettable brand moments to life in Dubai &amp; the UAE.
              </motion.p>
            </header>

            {/* CONSULTATION CARD */}
            <motion.div className="events-faq-card" {...reveal(0.18, 16)}>
              <div className="events-faq-card-header">
                <div>
                  <h3 className="events-faq-card-title">Planning an upcoming event?</h3>
                  <p className="events-faq-card-sub">
                    Our team will map out bespoke event concepts built around your brand goals.
                  </p>
                </div>
              </div>

              <div className="events-faq-card-actions">
                <a
                  href={mailtoHref}
                  className="events-faq-primary-btn"
                  onClick={(e) => {
                    if (onEnquire) {
                      e.preventDefault();
                      onEnquire(e);
                    }
                  }}
                >
                  <span>Request Event Consultation</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="events-faq-card-footer">
                <a href="tel:+971564800026" className="events-faq-footer-item">
                  <Phone size={13} /> +971 56 480 0026
                </a>
                <span className="events-faq-footer-divider">·</span>
                <a href={mailtoHref} className="events-faq-footer-item">
                  <Mail size={13} /> Email Event Team
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ACCORDION LIST */}
          <div className="events-faq-accordion-col">
            <div className="events-faq-list" role="tablist" aria-multiselectable="false">
              {eventsFaqData.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `events-faq-btn-${item.id}`;
                const panelId = `events-faq-panel-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    className={`events-faq-item ${isOpen ? 'is-open' : ''}`}
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
                        className="events-faq-indicator"
                        layoutId="activeEventsFaqIndicator"
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      id={buttonId}
                      type="button"
                      className="events-faq-trigger"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="events-faq-trigger-left">
                        <span className="events-faq-number">{item.number}</span>
                        <h3 className="events-faq-question">{item.question}</h3>
                      </div>

                      <div className={`events-faq-chevron-box ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="events-faq-answer-wrap"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="events-faq-answer-inner">
                            <p className="events-faq-answer">{item.answer}</p>
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
        <div className="events-faq-bottom-divider">
          <span className="events-faq-bottom-brand">XPATZHUB</span>
          <div className="events-faq-bottom-line" aria-hidden="true" />
          <span className="events-faq-bottom-text">
            EVENTS &amp; EXPERIENCES · CORPORATE SUMMITS · BRAND ACTIVATIONS · DUBAI &amp; UAE
          </span>
        </div>
      </div>
    </section>
  );
}
