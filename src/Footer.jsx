import React from 'react';
import { ArrowRight, MapPin, Instagram, Linkedin, Twitter, Youtube, Phone, Mail } from 'lucide-react';
import './footer.css';

export default function Footer({ onEnquire, onOpen, hideCtaBanner = false }) {
  return (
    <footer className="site-footer" id="contact">
      {/* Top CTA Banner */}
      {!hideCtaBanner && (
        <div className="footer-cta-banner">
        <div className="footer-cta-content">
          <h2>Ready to Grow Your Brand Across the UAE?</h2>
          <p>
            Join 700+ leading brands leveraging Digital Marketing, Community Power, and Influencer Marketing to reach over 500,000 expats across Dubai, Abu Dhabi, and the UAE.
          </p>
          <div className="footer-cta-actions">
            <button className="gradient-button primary-cta" onClick={e => e.preventDefault()}>
              Start Growing Today <ArrowRight size={22} />
            </button>
          </div>
        </div>
        <div className="footer-cta-bg-glow" aria-hidden="true" />
      </div>
      )}

      {/* Main Grid Section */}
      <div className="footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col footer-col-brand">
          <a href="#home" className="footer-brand-logo" aria-label="XPATZHUB home" onClick={e => e.preventDefault()}>
            <img
              src="/logo.png"
              alt="XPATZHUB"
              className="footer-logo-img"
            />
          </a>
          <p className="footer-brand-desc">
            Marketing. Events. PR. Powered by Community. Connecting brands, products and services with the UAE’s vibrant expat network.
          </p>
          <div className="footer-location-badge">
            <MapPin size={14} />
            <span>Dubai · Abu Dhabi · UAE</span>
          </div>
        </div>

        {/* Core Solutions Column */}
        <div className="footer-col">
          <h4>Core Solutions</h4>
          <ul>
            <li><a href="#digital" onClick={e => e.preventDefault()}>SEO & Digital Marketing</a></li>
            <li><a href="#community" onClick={e => e.preventDefault()}>Community Marketing</a></li>
            <li><a href="#influencer" onClick={e => e.preventDefault()}>Influencer Marketing</a></li>
            <li><a href="#pr" onClick={e => e.preventDefault()}>PR & Media Visibility</a></li>
            <li><a href="#events" onClick={e => e.preventDefault()}>Events & Experiences</a></li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about" onClick={e => e.preventDefault()}>About XPATZHUB</a></li>
            <li><a href="#community" onClick={e => e.preventDefault()}>Expat Community Network</a></li>
            <li><a href="#contact" onClick={e => e.preventDefault()}>Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Details & Socials Column */}
        <div className="footer-col footer-col-contact">
          <h4>Get In Touch</h4>
          <div className="footer-contact-info">
            <a href="tel:+971564800026" className="footer-contact-item" onClick={e => e.preventDefault()}>
              <span className="footer-contact-icon"><Phone size={16} /></span>
              <span>+971 56 480 0026</span>
            </a>
            <a href="mailto:anulmundra@indianexpatsindubai.com" className="footer-contact-item" onClick={e => e.preventDefault()}>
              <span className="footer-contact-icon"><Mail size={16} /></span>
              <span>anulmundra@indianexpatsindubai.com</span>
            </a>
          </div>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" onClick={e => e.preventDefault()}><Instagram size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={e => e.preventDefault()}><Linkedin size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" onClick={e => e.preventDefault()}><Twitter size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" onClick={e => e.preventDefault()}><Youtube size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">© {new Date().getFullYear()} XPATZHUB. All rights reserved.</p>
        <div className="footer-bottom-indicator">
          <span className="live-dot" />
          <span>Powered by UAE Expat Community</span>
        </div>
        <div className="footer-bottom-links">
          <a href="#privacy" onClick={e => e.preventDefault()}>Privacy Policy</a>
          <span className="sep">•</span>
          <a href="#terms" onClick={e => e.preventDefault()}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
