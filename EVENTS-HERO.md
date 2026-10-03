# Events & Experiences hero

Route: `/events-experiences-uae` (also accepts a trailing slash).

This standalone hero uses scoped CSS, React, Tailwind utilities, and Framer Motion. Existing page content and navigation are preserved. Text and controls are live HTML; the supplied screenshot is not used as a background.

`src/EventsPage.jsx` exports `eventsConfig`. Set `eventsUrl` to the approved listing or events section, and `storyUrl` to the approved video. Until then, buttons open accessible dialogs with the existing business email. Escape/backdrop/close dismiss the dialogs and restore trigger focus.

Photographic desktop and portrait assets were generated with imagegen from the supplied reference on 2026-09-30. Source PNGs and responsive WebP exports are in `public/assets/events/`. Mobile uses a dedicated portrait composition. The handwritten font reuses the project's local Great Vibes asset.

Validation: `npm.cmd run build`; with Vite on port 5101, `node artifacts/verify-events.mjs` exports the WebP images and checks six viewport sizes, overflow, dialog behavior, focus restoration, existing routes and browser errors. Screenshots are saved under `artifacts/events-*.png`.
