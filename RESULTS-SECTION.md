# Results / performance section

Added after services at `/seo-digital-marketing#results-performance`. The component uses React, scoped CSS in the existing Tailwind/Vite app, Lucide outline icons, Framer Motion entrances, and reduced-motion support.

`src/performanceContent.js` owns all six performance metrics, all three laptop dashboard metrics, verification status, and the reusable client logo array. Values are explicitly labeled as illustrative in the rendered section until verified. No third-party client logos from the reference are used; the default is six neutral client placeholders. Populate `clientLogos` only with approved client assets.

The approved user image supplies CSS-framed photography. A live SVG dashboard replaces the light laptop screen, including its original values, so all displayed dashboard metrics can be edited in React data. Photographed editorial lettering and the white workspace annotation remain embedded in the supplied image. The top-left blue annotation, headline, metrics, brand placeholders, and CTAs are live text.

Desktop preserves the three-part top composition, six horizontal metrics and statement panel. Tablet places the heading above the large photo and image stack, with three metric columns. Mobile uses the required alternate heading breaks, a horizontal photo gallery, two metric columns and stacked bottom content.

Both CTAs open a native modal with the existing business email/phone; a configured booking URL takes precedence. Escape and backdrop dismiss it, and focus returns to the trigger.

Validation: `npm.cmd run build` and `node verify-results.mjs` (Vite on port 5101). Seven widths: 1672, 1816, 1440, 1024, 834, 390 and 360. The checks cover layout, data labeling, client placeholders, CTA destinations, dialog dismissal/focus, runtime errors and homepage isolation. Screenshots and the side-by-side comparison are in `artifacts/results-*`.
