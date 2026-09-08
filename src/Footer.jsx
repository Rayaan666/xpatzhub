import React from 'react';
import { ArrowRight, MapPin, Instagram, Linkedin, Twitter, Youtube, Phone, Mail } from 'lucide-react';
import './footer.css';

export default function Footer({ onEnquire, onOpen }) {
  return (
    <footer className="site-footer" id="contact">
      {/* Top CTA Banner */}
      <div className="footer-cta-banner">
        <div className="footer-cta-content">
          <h2>Ready to Grow Your Brand Across the UAE?</h2>
          <p>
            Join 250+ leading brands leveraging Digital Marketing, Community Power, and Influencer Marketing to reach over 500,000 expats across Dubai, Abu Dhabi, and the UAE.
          </p>
          <div className="footer-cta-actions">
            <button className="gradient-button primary-cta" onClick={() => onEnquire('Contact')}>
              Start Growing Today <ArrowRight size={22} />
            </button>
          </div>
        </div>
        <div className="footer-cta-bg-glow" aria-hidden="true" />
      </div>

      {/* Main Grid Section */}
      <div className="footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col footer-col-brand">
          <a href="#home" className="footer-brand-logo" aria-label="XPATZHUB home">
            <img
              src="https://res.cloudinary.com/utug407p/image/upload/logo.png"
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
            <li><a href="#digital" onClick={e => { e.preventDefault(); document.getElementById('digital')?.scrollIntoView({ behavior: 'smooth' }); }}>SEO & Digital Marketing</a></li>
            <li><a href="#community" onClick={e => { e.preventDefault(); document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' }); }}>Community Marketing</a></li>
            <li><a href="#influencer" onClick={e => { e.preventDefault(); document.getElementById('influencer')?.scrollIntoView({ behavior: 'smooth' }); }}>Influencer Marketing</a></li>
            <li><a href="#pr" onClick={e => { e.preventDefault(); onOpen('PR'); }}>PR & Media Visibility</a></li>
            <li><a href="#events" onClick={e => { e.preventDefault(); onOpen('Events'); }}>Events & Experiences</a></li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about" onClick={e => { e.preventDefault(); onOpen('About'); }}>About XPATZHUB</a></li>
            <li><a href="#story" onClick={e => { e.preventDefault(); onOpen('Our Story'); }}>Watch Our Story</a></li>
            <li><a href="#community" onClick={e => { e.preventDefault(); document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' }); }}>Expat Community Network</a></li>
            <li><a href="#contact" onClick={e => { e.preventDefault(); onEnquire('Contact'); }}>Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Details & Socials Column */}
        <div className="footer-col footer-col-contact">
          <h4>Get In Touch</h4>
          <div className="footer-contact-info">
            <a href="tel:+971564800026" className="footer-contact-item">
              <span className="footer-contact-icon"><Phone size={16} /></span>
              <span>+971 56 480 0026</span>
            </a>
            <a href="mailto:anulmundra@indianexpatsindubai.com" className="footer-contact-item">
              <span className="footer-contact-icon"><Mail size={16} /></span>
              <span>anulmundra@indianexpatsindubai.com</span>
            </a>
          </div>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
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
          <a href="#privacy" onClick={e => { e.preventDefault(); onOpen('About'); }}>Privacy Policy</a>
          <span className="sep">•</span>
          <a href="#terms" onClick={e => { e.preventDefault(); onOpen('About'); }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
