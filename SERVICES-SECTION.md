# Digital marketing services

Added `DigitalServices` after `GrowthJourney` on `/seo-digital-marketing#digital-services`.

The section uses React, the existing Tailwind/Vite setup, scoped CSS, Lucide icons, and Framer Motion. Desktop has a large SEO panel and a 3 / 3 / 2 supporting grid; tablet has a full-width SEO feature followed by two columns; mobile stacks all nine panels.

All nine service cards use separate, locally stored 1920px-wide photographs from `public/assets/digital-services/`. Aspect-preserving image frames replace the former tiny reference-screenshot crops. Gradients keep live service labels readable; desktop, tablet and mobile retain the existing card layout. Source URLs are recorded in `public/assets/digital-services/CREDITS.md`.

Service arrows open accessible native dialogs. The strategy CTA uses the existing business contact in `seoContent.js`; a configured booking URL takes precedence over email. Escape dismisses dialogs and restores trigger focus. Reduced motion disables entrances and hover transitions.

Validation: `npm.cmd run build`; `node verify-services.mjs` against the Vite server on port 5101. Checks include six viewport widths, all nine dialogs, the strategy CTA, focus restoration, overflow, runtime errors and homepage isolation. Screenshots and a reference comparison are in `artifacts/services-*`.
