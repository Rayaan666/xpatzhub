import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './Navbar';
import SeoHero from './SeoHero';
import GrowthJourney from './GrowthJourney';
import DigitalServices from './DigitalServices';
import PerformanceResults from './PerformanceResults';
import FaqSection from './FaqSection';
import SeoCtaSection from './SeoCtaSection';
import Footer from './Footer';
import './seo-base.css';
document.title = 'SEO & Digital Marketing Agency Dubai & UAE | XPATZHUB';
document.querySelector('meta[name="description"]').content = 'Leading SEO & digital marketing agency in Dubai & UAE. Data-driven SEO, Google & Meta Ads, content strategies and performance marketing to rank higher and get real growth.';
createRoot(document.getElementById('root')).render(<React.StrictMode><main><Navbar activeId="digital" /><SeoHero /><GrowthJourney /><DigitalServices /><PerformanceResults /><FaqSection /><SeoCtaSection /><Footer hideCtaBanner /></main></React.StrictMode>);




