// Keep each page's styles and content isolated. Normal links support browser history.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
if (path === '/seo-digital-marketing') {
  import('./SeoPage.jsx');
} else {
  import('./HomePage.jsx');
}
