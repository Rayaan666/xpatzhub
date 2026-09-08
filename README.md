# XPATZHUB hero

React + Vite + Tailwind CSS + Framer Motion. Run `npm install`, then `npm run dev`. Production build: `npm run build`.

The supplied reference is preserved as a shared WebP artwork atlas. Five SVG clip paths retain its exact phone renders, screen photography and lettering, with independent entrance, floating and desktop parallax motion. The tree logo is displayed directly from the supplied artwork without redrawing it. Headline, navigation, supporting text, actions and statistics are live HTML. Mobile uses three overlapping phones. Reduced motion is respected.

The hero and the three-panel solutions section are implemented. Navigation opens accessible service dialogs; search filters those services. The enquiry action copies a draft, and never submits data. Supply verified contact details and the story video to connect the final destinations. Business figures are visibly identified as illustrative pending verification.

For production, a standalone high-resolution logo and original phone artwork would enable smaller, independently loaded assets and editable screen content. All five current layers share one eagerly preloaded compressed image, so there are no extra secondary image downloads.

## Core solutions

`src/Solutions.jsx` and its scoped stylesheet add exactly three campaign panels below the unchanged hero: SEO & Digital Marketing, Community Marketing, and Influencer Marketing. The supplied artwork provides photographic regions, numbering, microcopy, and handwritten details through SVG viewports. All main headings, descriptions, service lists, and CTAs are live HTML. Slanted silhouettes, borders, image fades, responsive layout, viewport entrances, and restrained hover effects are implemented in CSS and Framer Motion. CTAs open the existing enquiry dialog.

The original section reference is retained in `design-references/`; only the compressed WebP is served. Run `node verify-solutions.mjs` with the development server running to check five widths, all 20 services, three panels, CTA behavior, and layout overflow. Screenshots are saved in `artifacts/`.
