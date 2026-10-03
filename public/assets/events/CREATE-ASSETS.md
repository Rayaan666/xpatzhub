# What We Create

Added as Section 3 at `/events-experiences-uae` via `src/EventsCreate.jsx` and scoped `src/events-create.css`.

Three separate text-free photographs generated with imagegen on 2026-10-01 using the supplied reference:

- `create-business-source.png`: Dubai corporate networking.
- `create-brands-source.png`: sculptural green brand activation.
- `create-celebrations-source.png`: candlelit garden celebration.

Responsive 640px and 1200px WebP exports use quality 0.88. CSS supplies the angled clipping. Typography is live HTML; category titles reuse the local Bodoni Moda font.

Accessible category arrows link to the existing business email from `seoContent.email`, with category-specific enquiry subjects. No category routes were invented.

Validation: `npm.cmd run build` and `node artifacts/verify-create.mjs` with Vite on port 5101. Checks cover seven widths (360, 390, 768, 1024, 1100, 1440, 1672), text overflow, shared desktop photo baseline, decoded images, named keyboard-focusable links, reduced-motion rendering, normal scroll entrances and browser errors. Screenshots: `artifacts/create-*.png`.
