import React from 'react';
import { ArrowRight, MapPin, Instagram, Linkedin, Twitter, Youtube, Phone, Mail } from 'lucide-react';
import './footer.css';

export default function Footer({ 
  hideCtaBanner = false,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaBgImage,
  onCtaClick
}) {
  const handleNonFunctional = (e) => {
    if (e && e.preventDefault) e.preventDefault();
  };

  const title = ctaTitle || "Ready to Grow Your Brand Across the UAE?";
  const description = ctaDescription || "Join 700+ leading brands leveraging Digital Marketing, Community Power, and Influencer Marketing to reach over 500,000 expats across Dubai, Abu Dhabi, and the UAE.";
  const buttonText = ctaButtonText || "Start Growing Today";
  const bgImage = ctaBgImage || 'https://res.cloudinary.com/utug407p/image/upload/ChatGPT_Image_Sep_8_2026_01_34_54_PM.png';

  return (
    <footer className="site-footer" id="contact">
      {/* Top CTA Banner */}
      {!hideCtaBanner && (
        <div 
          className="footer-cta-banner"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(3, 10, 24, 0.84) 0%, rgba(6, 18, 38, 0.92) 100%), url('${bgImage}')` }}
        >
          <div className="footer-cta-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="footer-cta-actions">
              <button className="gradient-button primary-cta" onClick={onCtaClick || handleNonFunctional}>
                {buttonText} <ArrowRight size={22} />
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
          <a href="/" className="footer-brand-logo" aria-label="XPATZHUB home">
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
            <li><a href="/seo-digital-marketing">SEO & Digital Marketing</a></li>
            <li><a href="/community">Community Marketing</a></li>
            <li><a href="#" onClick={handleNonFunctional}>Influencer Marketing</a></li>
            <li><a href="#" onClick={handleNonFunctional}>PR & Media Visibility</a></li>
            <li><a href="#" onClick={handleNonFunctional}>Events & Experiences</a></li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#" onClick={handleNonFunctional}>About XPATZHUB</a></li>
            <li><a href="/community">Expat Community Network</a></li>
            <li><a href="#" onClick={handleNonFunctional}>Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Details & Socials Column */}
        <div className="footer-col footer-col-contact">
          <h4>Get In Touch</h4>
          <div className="footer-contact-info">
            <a href="#" onClick={handleNonFunctional} className="footer-contact-item">
              <span className="footer-contact-icon"><Phone size={16} /></span>
              <span>+971 56 480 0026</span>
            </a>
            <a href="#" onClick={handleNonFunctional} className="footer-contact-item">
              <span className="footer-contact-icon"><Mail size={16} /></span>
              <span>anulmundra@indianexpatsindubai.com</span>
            </a>
          </div>
          <div className="footer-socials">
            <a href="#" onClick={handleNonFunctional} aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" onClick={handleNonFunctional} aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" onClick={handleNonFunctional} aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" onClick={handleNonFunctional} aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          © {new Date().getFullYear()} XPATZHUB. All rights reserved. Dubai &amp; Abu Dhabi, United Arab Emirates.
        </p>
        <div className="footer-legal-links">
          <a href="#" onClick={handleNonFunctional}>Privacy Policy</a>
          <span>·</span>
          <a href="#" onClick={handleNonFunctional}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
