import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './Navbar';
import SeoHero from './SeoHero';
import GrowthJourney from './GrowthJourney';
import DigitalServices from './DigitalServices';
import PerformanceResults from './PerformanceResults';
import FaqSection from './FaqSection';
import Footer from './Footer';
import './seo-base.css';
export default function SeoPage() {
  React.useEffect(() => {
    document.title = 'SEO & Digital Marketing Agency Dubai & UAE | XPATZHUB';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Leading SEO & digital marketing agency in Dubai & UAE. Data-driven SEO, Google & Meta Ads, content strategies and performance marketing to rank higher and get real growth.';
  }, []);

  return (
    <>
      <Navbar activeId="digital" />
      <main>
        <SeoHero />
        <GrowthJourney />
        <DigitalServices />
        <PerformanceResults />
        <FaqSection />
      </main>
      <Footer 
        ctaTitle="Ready to Dominate Search Rankings & Drive Growth in Dubai & the UAE?"
        ctaDescription="Partner with Dubai's premier SEO & digital marketing agency. Turn high-intent search traffic into qualified leads and revenue with data-driven search engine optimization, technical audits, and performance marketing."
        ctaButtonText="Get Your Free SEO Audit"
        ctaBgImage="/about/cta.png"
      />
    </>
  );
}




