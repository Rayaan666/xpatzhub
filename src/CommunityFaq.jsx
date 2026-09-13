import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
              LEFT INTRO COLUMN (~35-38%, Sticky Desktop)
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
              <span className="community-faq-heading-line community-faq-heading-orange">
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

            {/* Handwritten annotation: "Ask us anything." */}
            <motion.div
              className="community-faq-handwritten"
              initial={reduced ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              aria-hidden="true"
            >
              <span className="community-faq-handwritten-text">
                Ask us<br />anything.
              </span>
              <svg
                className="community-faq-underline-svg"
                viewBox="0 0 110 12"
                fill="none"
              >
                <path
                  d="M2 8C32 2 76 2 108 9"
                  stroke="#ff7a2b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="community-faq-handwritten-arrow"
                viewBox="0 0 54 38"
                fill="none"
              >
                <path
                  d="M4 6C18 2 38 8 46 25M46 25L37 23M46 25L44 16"
                  stroke="#ff7a2b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Small editorial details rewarding closer inspection */}
            <div className="community-faq-meta-labels" aria-hidden="true">
              <div className="community-faq-label-pill">
                <span>COMMUNITY NOTES · VOL. 01</span>
              </div>
              <div className="community-faq-manifesto">
                PEOPLE · CONNECTIONS · EXPERIENCES · OPPORTUNITIES
              </div>
              <div className="community-faq-coordinates">
                XPATZHUB / COMMUNITY / UAE · 25°12'19"N 55°16'56"E
              </div>
            </div>
          </div>

          {/* ============================================================
              CREATIVE CENTER DETAIL: VERTICAL THREAD
              ============================================================ */}
          <div className="community-faq-vertical-thread" aria-hidden="true">
            <div className="community-faq-thread-line" />
            <div className="community-faq-thread-step">
              <span className="community-faq-thread-text">ASK</span>
              <span className="community-faq-thread-arrow">↓</span>
            </div>
            <div className="community-faq-thread-step">
              <span className="community-faq-thread-text">CONNECT</span>
              <span className="community-faq-thread-arrow">↓</span>
            </div>
            <div className="community-faq-thread-step">
              <span className="community-faq-thread-text">CREATE</span>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: THE COMMUNITY NOTICEBOARD
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
                    className={`community-faq-slip community-faq-slip--${item.paperType} ${
                      isOpen ? 'is-open' : ''
                    }`}
                    initial={reduced ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    animate={{
                      rotate: reduced ? 0 : isOpen ? 0 : item.rotation,
                    }}
                    whileHover={reduced ? {} : { x: 6 }}
                    transition={{
                      duration: 0.45,
                      delay: reduced ? 0 : index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Small physical tape piece on alternating slips */}
                    {item.hasTape && (
                      <span
                        className={`community-faq-tape community-faq-tape--${item.tapeSide}`}
                        aria-hidden="true"
                      />
                    )}

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
                        <ArrowUpRight size={17} />
                      </div>
                    </button>

                    {/* Open State: Unfolds on the SAME physical paper surface */}
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
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {/* Hand-drawn thin divider */}
                          <svg
                            className="community-faq-divider-svg"
                            viewBox="0 0 480 8"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 4C120 1.5 280 6 478 3.5"
                              stroke="#ff7a2b"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeDasharray="4 2"
                            />
                          </svg>

                          <p className="community-faq-answer-p">{item.answer}</p>

                          {/* Occasional handwritten phrase on bottom right */}
                          {item.handwrittenSignoff && (
                            <div
                              className="community-faq-signoff"
                              aria-hidden="true"
                            >
                              <span className="community-faq-signoff-text">
                                {item.handwrittenSignoff}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* ============================================================
                ONE FEATURED PHOTOGRAPH (Tilted print near lower right)
                ============================================================ */}
            <motion.aside
              className="community-faq-photo-card"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              aria-label="Community documentary photograph"
            >
              <div className="community-faq-photo-frame">
                <span className="community-faq-photo-tape" aria-hidden="true" />
                <img
                  src="/assets/community/noticeboard-gathering.jpg"
                  alt="A relaxed UAE evening community gathering under warm outdoor terrace festoon lighting in Dubai."
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <span className="community-faq-photo-film" aria-hidden="true">
                  UAE EXPATS · CONVERSATIONS
                </span>
              </div>
              <div className="community-faq-photo-caption" aria-hidden="true">
                <span className="community-faq-photo-handwritten">
                  Real conversations start here.
                </span>
                <svg
                  className="community-faq-photo-underline"
                  viewBox="0 0 90 8"
                  fill="none"
                >
                  <path
                    d="M2 5C26 2 64 2 88 6"
                    stroke="#ff7a2b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.aside>

            {/* ============================================================
                SPECIAL "STILL CURIOUS?" ELEMENT
                ============================================================ */}
            <motion.div
              className="community-faq-still-curious"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <span
                className="community-faq-still-curious-tape"
                aria-hidden="true"
              />
              <div className="community-faq-curious-inner">
                <div className="community-faq-curious-text-group">
                  <h4 className="community-faq-curious-eyebrow">STILL CURIOUS?</h4>
                  <p className="community-faq-curious-body">
                    Some questions are better answered over a conversation.
                  </p>
                </div>

                <a
                  href="mailto:anulmundra@indianexpatsindubai.com?subject=Community%20Inquiry%20from%20FAQ"
                  className="community-faq-curious-cta"
                  onClick={onEnquire || undefined}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
