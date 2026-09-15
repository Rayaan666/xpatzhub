import React, { useRef } from 'react';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { seoContent } from './seoContent';
import './seo-hero.css';

export default function SeoHero() {
  const dialog = useRef(null);
  const howItWorksDialog = useRef(null);
  const trigger = useRef(null);
  function openEnquiry() {
    trigger.current = document.activeElement;
    dialog.current?.showModal();
  }
  function openHowItWorks() {
    trigger.current = document.activeElement;
    howItWorksDialog.current?.showModal();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO & Digital Marketing Services Dubai',
    provider: {
      '@type': 'Organization',
      name: 'XPATZHUB',
      url: 'https://xpatzhub.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE'
      }
    },
    serviceType: 'Digital Marketing & Search Engine Optimization',
    areaServed: ['Dubai', 'United Arab Emirates'],
    description: 'Data-driven SEO, Google Ads, social media marketing, and content strategies designed to increase online visibility and drive customer growth in the UAE.'
  };

  return (
    <section className="seo-hero" aria-labelledby="seo-title" itemScope itemType="https://schema.org/Service">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="seo-studio" role="img" aria-label="Interactive SEO search bar sculpture featuring 'Your next big discovery' illuminated in a studio setting." />
      <div className="seo-headline">
        <p className="seo-eyebrow">SEO &amp; DIGITAL MARKETING AGENCY · DUBAI &amp; UAE</p>
        <h1 id="seo-title" itemProp="name">
          <span>Good brands deserve</span>
          <span className="seo-blue">to be found.</span>
        </h1>
      </div>

      <div className="seo-support">
        <p className="seo-description" itemProp="description">
          Data-driven SEO, PPC campaigns &amp; performance content engineered to connect your brand with real customers across Dubai &amp; the UAE.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button className="seo-primary" onClick={(e) => e.preventDefault()} aria-label="Get Your Free Strategy Call">Get Your Free Strategy Call <ArrowUpRight aria-hidden="true" /></button>
          <button className="seo-secondary" onClick={(e) => e.preventDefault()} aria-label="See How It Works">See How It Works</button>
        </div>
      </div>
      <dialog ref={dialog} className="seo-dialog" aria-labelledby="seo-dialog-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
        <button className="seo-close" aria-label="Close dialog" onClick={() => dialog.current.close()}><X /></button>
        <p className="seo-dialog-eyebrow">XPATZHUB · DUBAI</p>
        <h2 id="seo-dialog-title">Let’s plan your next stage of growth.</h2>
        <p>Contact our team for your free strategy call. Tell us about your brand, your website, and what you want to achieve.</p>
        <a className="seo-dialog-link" href="mailto:anulmundra@indianexpatsindubai.com?subject=Strategy%20Call">Email the team <ArrowRight size={18} /></a>
        <a href="tel:+971564800026">+971 56 480 0026</a>
      </dialog>

      <dialog ref={howItWorksDialog} className="seo-dialog" aria-labelledby="seo-how-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === howItWorksDialog.current) howItWorksDialog.current.close(); }}>
        <button className="seo-close" aria-label="Close dialog" onClick={() => howItWorksDialog.current.close()}><X /></button>
        <p className="seo-dialog-eyebrow">HOW IT WORKS</p>
        <h2 id="seo-how-title">Understand your brand.</h2>
        <p>We analyze your business goals, target audience, and current digital footprint to create a custom ROI-focused growth plan.</p>
      </dialog>
    </section>
  );
}


