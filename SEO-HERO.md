# SEO & Digital Marketing hero

Run `npm.cmd run dev` on Windows (or `npm run dev` elsewhere). The original homepage, navigation, solutions, and footer remain at `/`. The new hero is mounted only at `/seo-digital-marketing`, linked from the desktop and mobile SEO & Digital navigation items. Page styles load separately.

- `src/SeoHero.jsx`: live semantic copy, Framer Motion entrances, accessible native dialogs.
- `src/seo-hero.css`: desktop, tablet, and dedicated mobile layouts.
- `src/seoContent.js`: editable, **unverified** statistic placeholders; contact details; optional approved booking and video URLs.
- `public/assets/seo-workspace-reference.png`: supplied approved artwork, displayed with CSS clipping and soft masks to retain its workspace and editorial annotations. Dashboard figures are demonstration data embedded in the image, not verified results. Replace the artwork to change those figures.

The strategy CTA opens business contact options. The secondary CTA shows a process overview until an approved video URL is configured. No booking or video asset was supplied.

Run `node verify-seo.mjs` with the development server at port 5101 to check five viewport sizes, horizontal overflow, runtime errors, dialog actions, Escape, and focus restoration. Browser captures and a side-by-side reference comparison are in `artifacts/seo-*`.
