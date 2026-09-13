import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';
import SeoPage from './SeoPage';

import './styles.css';
import './navbar.css';
import './solutions.css';
import './footer.css';
import './desktop-hero.css';
import './mobile-hero.css';
import './community-hero.css';
import './community-power.css';
import './community-activation.css';
import './community-faq.css';
import './seo-base.css';
import './seo-hero.css';
import './growth-journey.css';
import './digital-services.css';
import './performance-results.css';
import './faq-section.css';
import './seo-cta-section.css';

const path = typeof window !== 'undefined' ? (window.location.pathname.replace(/\/+$/, '') || '/') : '/';
const isSeoPage = path === '/seo-digital-marketing';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      {isSeoPage ? <SeoPage /> : <HomePage />}
    </React.StrictMode>
  );
}
