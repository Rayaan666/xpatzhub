import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { communityFaqData, communityFaqSchemaData } from './communityFaqContent';
import './community-faq.css';

export default function CommunityFaq({ onEnquire }) {
  const [openId, setOpenId] = useState(null);
  const reduced = useReducedMotion();

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="community-faq"
      className="community-faq-section"
      aria-labelledby="comm-faq-main-heading"
    >
      {/* Schema.org FAQPage for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(communityFaqSchemaData) }}
      />

      <div className="community-faq-container">
        <div className="community-faq-layout">
          {/* ============================================================
              LEFT INTRO COLUMN (Sticky Desktop)
              ============================================================ */}
          <div className="community-faq-intro-col">
            <motion.div
              className="community-faq-eyebrow-wrap"
              initial={reduced ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <p className="community-faq-eyebrow">COMMUNITY QUESTIONS</p>
              <div className="community-faq-eyebrow-line" aria-hidden="true" />
            </motion.div>

            <motion.h2
              id="comm-faq-main-heading"
              className="community-faq-heading"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              <span className="community-faq-heading-line community-faq-heading-white">
                CURIOUS
              </span>
              <span className="community-faq-heading-line community-faq-heading-white">
                ABOUT THE
              </span>
              <span className="community-faq-heading-line community-faq-heading-blue">
                COMMUNITY?
              </span>
            </motion.h2>

            <motion.p
              className="community-faq-lead"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.14 }}
            >
              Everything you need to know about connecting your brand with XPATZHUB's
              community across the UAE.
            </motion.p>

            {/* SPECIAL "STILL CURIOUS?" ELEMENT */}
            <motion.div
              className="community-faq-still-curious"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <div className="community-faq-curious-inner">
                <div className="community-faq-curious-text-group">
                  <h4 className="community-faq-curious-eyebrow">STILL CURIOUS?</h4>
                  <p className="community-faq-curious-body">
                    Some questions are better answered over a conversation.
                  </p>
                </div>

                <a
                  href="#"
                  className="community-faq-curious-cta"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: CLEAN ACCORDION LIST
              ============================================================ */}
          <div className="community-faq-board-col">
            <div className="community-faq-slips-list" role="tablist">
              {communityFaqData.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `comm-faq-btn-${item.id}`;
                const panelId = `comm-faq-panel-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    className={`community-faq-slip ${isOpen ? 'is-open' : ''}`}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: reduced ? 0 : index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Accessible Button Trigger */}
                    <button
                      id={buttonId}
                      type="button"
                      className="community-faq-trigger"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="community-faq-trigger-left">
                        <span className="community-faq-trigger-num">
                          {item.number}
                        </span>
                        <h3 className="community-faq-trigger-text">
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className="community-faq-arrow-circle"
                        aria-hidden="true"
                      >
                        <ChevronDown size={18} className="community-faq-chevron" />
                      </div>
                    </button>

                    {/* Open State: Smooth Panel Expansion */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="community-faq-answer-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <p className="community-faq-answer-p">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
