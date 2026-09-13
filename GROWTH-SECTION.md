# From Visibility to Growth

Mounted immediately after `SeoHero` in `src/SeoPage.jsx`, only on `/seo-digital-marketing`. The homepage and hero components were not changed for this section.

Content and the unverified `3X` design placeholder are editable in `src/growthContent.js`. The bottom CTA uses the existing business email, or the approved booking URL when configured in `seoContent.js`.

The four transition buttons focus the next stage and bring it into view. Tablet uses horizontal scrolling; mobile uses five vertically stacked photographic panels and a blue progression line. Reduced-motion preferences disable entrances and smooth scrolling.

## Reference imagery

Built-in imagegen edit mode was used to clean overlays from the supplied reference, preserving the approved five photographic scenes. Source: `public/assets/growth-approved-reference.png`. Cleaned image: `public/assets/growth-clean-reference.png`. Each panel uses a cropped SVG image viewport; all stage copy and the animated trajectory are live HTML/SVG. The handwritten annotation uses the supplied reference artwork.

Final image-edit prompt:

Use case: precise-object-edit. Edit target: supplied approved XPATZHUB reference. Produce the SAME full reference image at same composition and aspect ratio, changing ONLY the following overlaid graphics in the five photographic panels: remove blue growth trajectory and arrowhead, remove the four circular transition arrow buttons, remove all panel numbers/category labels/headings/descriptions in lower portions. Inpaint these areas with naturally continuous photography/dark shadows. Keep all five photos, hands, objects, laptop and smartphone geometry, skyline, typography physically on objects/screens EXACTLY as supplied. Keep top white editorial heading/introduction/3X/handwriting and bottom white strip unchanged. Preserve photo boundaries at x31-373,384-726,737-1080,1091-1433,1444-1786 and y261-771 in 1816x866 original. Do not redesign, do not change lighting, no new objects. This is cleanup for a website implementation where live HTML typography and SVG line will be added on top. Return edited image and local saved file path.

## Validation

`node verify-growth.mjs` checks five viewports (1816, 1440, 834, 390, 360), stage and transition counts, focus behavior, horizontal overflow, runtime errors, and isolation from the homepage. Screenshots and side-by-side comparison are saved under `artifacts/growth-*`.
