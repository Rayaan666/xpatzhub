import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './get-in-touch.css';

const serviceOptions = [
  'Digital Marketing',
  'Events & Experiences',
  'PR & Brand Visibility',
  'Community Marketing',
  'Influencer Marketing',
  'Real Estate Marketing',
  'Something Else',
];

const pillarsList = [
  'MARKETING',
  'EVENTS',
  'PR',
  'COMMUNITY',
  'INFLUENCE',
  'REAL ESTATE',
];

export default function GetInTouchPage() {
  const reduced = useReducedMotion();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: ['Digital Marketing'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Get in Touch | XPATZHUB — Dubai & UAE';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content =
        "Start a conversation with XPATZHUB. Let's turn your next idea into something people remember across Dubai, Abu Dhabi, and the UAE.";
    }
  }, []);

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      if (exists) {
        if (prev.selectedServices.length === 1) return prev; // Keep at least one selected
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== service),
        };
      }
      return {
        ...prev,
        selectedServices: [...prev.selectedServices, service],
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto fallback or submission feedback
    const subject = encodeURIComponent(
      `New Project Inquiry from ${formData.name || 'Website Visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nInterested In: ${formData.selectedServices.join(
        ', '
      )}\n\nMessage:\n${formData.message}`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:anulmundra@indianexpatsindubai.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <>
      <Navbar activeId="contact" />

      <main className="git-page">
        {/* ONE IMMERSIVE CONTACT COMPOSITION */}
        <section className="git-hero" aria-labelledby="git-hero-heading">
          <div className="git-hero-grid">
            {/* LEFT SIDE — MAIN MESSAGE & CINEMATIC DUBAI ENVIRONMENT */}
            <div className="git-left">
              <motion.div
                className="git-eyebrow"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>GET IN TOUCH</span>
                <span className="git-eyebrow-line" aria-hidden="true" />
              </motion.div>

              <motion.h1
                id="git-hero-heading"
                className="git-headline"
                initial={reduced ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>LET'S TURN</span>
                <span>YOUR NEXT IDEA</span>
                <span>INTO SOMETHING</span>
                <span className="git-highlight">PEOPLE REMEMBER.</span>
              </motion.h1>

              <motion.p
                className="git-support"
                initial={reduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Whether you're planning a campaign, creating an experience, building
                visibility or looking for new ways to connect with audiences across
                the UAE, we'd love to hear what you're working on.
              </motion.p>

              {/* HANDWRITTEN DETAIL */}
              <motion.div
                className="git-handwritten-wrap"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="git-handwritten-text">
                  “Good things start with a conversation.”
                </span>
                <svg
                  className="git-handwritten-underline"
                  viewBox="0 0 140 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6.5C38 3 85 2 137 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* REAL CINEMATIC PHOTOGRAPHIC ENVIRONMENT */}
              <motion.div
                className="git-photo-backdrop"
                initial={reduced ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/assets/contact/dubai-terrace.jpg"
                  alt="Creative professionals in conversation on a Dubai terrace overlooking the skyline at golden hour"
                  className="git-photo-img"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="git-photo-overlay" aria-hidden="true" />
              </motion.div>
            </div>

            {/* RIGHT SIDE — INTEGRATED CONTACT FORM */}
            <motion.div
              className="git-right"
              initial={reduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="git-form-container">
                <div className="git-form-top">
                  {/* AVAILABILITY STATUS DETAIL */}
                  <div className="git-status-badge">
                    <span className="git-status-dot" aria-hidden="true" />
                    <span>OPEN TO NEW PROJECTS &amp; COLLABORATIONS</span>
                  </div>

                  <h2 className="git-form-heading">
                    <span>TELL US </span>
                    <span>WHAT YOU'RE </span>
                    <span className="git-highlight">WORKING ON.</span>
                  </h2>
                  <p className="git-form-sub">
                    Share a few details and our team will get back to you.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    className="git-success-msg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you for reaching out. We have received your note and our
                    UAE strategy team will be in touch shortly.
                  </motion.div>
                ) : (
                  <form className="git-form" onSubmit={handleSubmit} noValidate>
                    {/* Name & Email Row */}
                    <div className="git-fields-row">
                      <div className="git-field-group">
                        <label htmlFor="git-name" className="git-label">
                          YOUR NAME <span className="git-req">*</span>
                        </label>
                        <input
                          id="git-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="git-input"
                        />
                      </div>

                      <div className="git-field-group">
                        <label htmlFor="git-email" className="git-label">
                          EMAIL ADDRESS <span className="git-req">*</span>
                        </label>
                        <input
                          id="git-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="git-input"
                        />
                      </div>
                    </div>

                    {/* Phone & Company Row */}
                    <div className="git-fields-row">
                      <div className="git-field-group">
                        <label htmlFor="git-phone" className="git-label">
                          PHONE NUMBER
                        </label>
                        <input
                          id="git-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+971 50 000 0000"
                          className="git-input"
                        />
                      </div>

                      <div className="git-field-group">
                        <label htmlFor="git-company" className="git-label">
                          COMPANY / BRAND
                        </label>
                        <input
                          id="git-company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Brand or business name"
                          className="git-input"
                        />
                      </div>
                    </div>

                    {/* I'm Interested In — Selectable Service Pills */}
                    <div className="git-field-group git-services-group">
                      <span className="git-label">
                        I'M INTERESTED IN <span className="git-req">*</span>
                      </span>
                      <div className="git-pills-wrap" role="group" aria-label="Services of interest">
                        {serviceOptions.map((service) => {
                          const isSelected =
                            formData.selectedServices.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              className={`git-pill ${
                                isSelected ? 'is-selected' : ''
                              }`}
                              onClick={() => toggleService(service)}
                              aria-pressed={isSelected}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="git-field-group">
                      <label htmlFor="git-message" className="git-label">
                        MESSAGE <span className="git-req">*</span>
                      </label>
                      <textarea
                        id="git-message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us a little about your idea, campaign or project..."
                        className="git-textarea"
                      />
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="git-submit-btn"
                    >
                      <span>
                        {isSubmitting
                          ? 'CONNECTING...'
                          : 'START THE CONVERSATION'}
                      </span>
                      <ArrowUpRight
                        size={19}
                        className="git-arrow-icon"
                        aria-hidden="true"
                      />
                    </button>
                  </form>
                )}

                {/* HORIZONTAL CONTACT DETAILS STRIP */}
                <div className="git-contact-strip" aria-label="Direct contact details">
                  <div className="git-strip-item">
                    <span className="git-strip-label">EMAIL</span>
                    <a
                      href="mailto:anulmundra@indianexpatsindubai.com"
                      className="git-strip-val"
                    >
                      anulmundra@indianexpatsindubai.com
                    </a>
                  </div>

                  <div className="git-strip-item">
                    <span className="git-strip-label">PHONE</span>
                    <a href="tel:+971564800026" className="git-strip-val">
                      +971 56 480 0026
                    </a>
                  </div>

                  <div className="git-strip-item">
                    <span className="git-strip-label">LOCATION</span>
                    <span className="git-strip-val">United Arab Emirates</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ONE SHORT CLOSING STRIP */}
        <section className="git-closing-section" aria-label="Closing message">
          <div className="git-closing-container">
            <h2 className="git-closing-headline">
              <span>ONE CONVERSATION</span>
              <span>COULD START</span>
              <span className="git-highlight">SOMETHING BIG.</span>
            </h2>

            <ul className="git-pillars-list" aria-label="XPATZHUB core capabilities">
              {pillarsList.map((pillar) => (
                <li key={pillar} className="git-pillar-item">
                  {pillar}
                </li>
              ))}
            </ul>

            <div className="git-closing-divider" aria-hidden="true" />
          </div>
        </section>

        {/* EXISTING FOOTER (WITHOUT DUPLICATE CTA BANNER) */}
        <Footer hideCtaBanner={true} />
      </main>
    </>
  );
}
