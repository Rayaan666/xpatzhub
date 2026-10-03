# Experiences That Stay With People

Workshop and ceramic-bowl photographs generated with the imagegen tool on 2026-10-01 using the supplied section reference. Both assets contain photography only; circular masking, the partial arc, and all typography are rendered by the application.

- `workshop-source.png`: candid workshop scene, participants viewed from behind.
- `bowl-source.png`: hands holding a sage ceramic bowl over kraft packaging.
- Responsive WebP variants are exported by `artifacts/verify-experience.mjs` using browser canvas at quality 0.88.

Section implementation: `src/EventsExperience.jsx` and scoped `src/events-experience.css`. Added directly beneath the existing Events hero; its markup and styles were preserved.

Validation: production build; six widths (360, 390, 768, 1100, 1440, 1672); image decoding; text overflow; five journey stages; reduced-motion rendering and normal scroll reveals; browser runtime errors. Section screenshots are in `artifacts/experience-*.png`.
