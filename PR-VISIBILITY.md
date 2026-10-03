# PR & Brand Visibility

Separate URL: `/pr-brand-visibility/` (existing Vite/Vercel route fallback).
Only the new hero is rendered on this route. Existing page components are unchanged by this implementation.

Configuration: `src/PrVisibilityPage.jsx` exports `prVisibilityConfig` with the existing enquiry email and optional `storyUrl`. Until a story is supplied, the story button opens an accessible availability dialog.

Asset: `public/assets/pr-visibility/newspaper.png`, created with the built-in imagegen tool. Prompt: preserve the supplied reference's physical newspaper, printed masthead and interview photograph, loose print, black studio surface and upper-right lighting; remove all website headline, eyebrow, description, buttons, right annotations and bottom labels; naturally reconstruct the underlying photographic scene. Keep the newspaper at 45–83% of the wide composition with black negative space on the left.

Typography: locally hosted Bodoni Moda and existing Great Vibes. The heading and all website text remain live HTML. Reduced motion is respected.

Validation: production build; Playwright at 1440, 768 and 390 pixels; full headline visibility, no horizontal overflow, local font loaded, story dialog opens and closes with Escape, no browser runtime errors. Screenshots: `artifacts/pr-*.png`.

## Section 2 — Beyond Being Seen

Added below the hero at `/pr-brand-visibility/#beyond-being-seen`. Component: `src/BeyondBeingSeen.jsx`; scoped styles: `src/beyond-being-seen.css`.

Responsive generated photography: `public/assets/pr-visibility/interview-720.webp` and `interview-1440.webp`. Original retained in `design-references/pr-interview-generated.png`.

Built-in imagegen prompt: Create only the clean standalone 1.6:1 monochrome interview photograph from the reference: interviewer hand and microphone at left, naturally gesturing business professional in dark tailoring at right, faces outside the crop, softly blurred production equipment. Remove all captions, brushstrokes, annotations and website layout. Preserve natural skin, microphone and wool textures.

All copy is live HTML. The responsive SVG oval draws once; viewport reveals respect reduced motion. No new CTAs or changes to the hero. Checked at 360, 390, 768, 1024, 1440 and 1672 pixels, with four rows, loaded responsive images and no page overflow or runtime errors.

## Section 3 — PR & Brand Visibility Services

Added at `/pr-brand-visibility/#pr-services`, after Beyond Being Seen. Files: `src/PrVisibilityServices.jsx` and scoped `src/pr-visibility-services.css`. The four configurable service destinations fall back to the existing enquiry email with distinct service subjects.

Built-in imagegen asset: `design-references/pr-services-generated.png`; responsive optimized delivery: `public/assets/pr-visibility/services-900.webp` and `services-1672.webp`.

Final generation prompt: Edit the supplied PR services reference into a clean 16:9 photographic background, preserving placement of the silver microphone, black shock mount, headphones with physical lettering, folded newspaper, upright Dubai billboard print and dusty-rose cable across the tabletop. Remove all website headings, paragraphs, service groups, rules, numbers, buttons, closing text and handwriting. Reconstruct dark negative space naturally; retain only physically printed prop text. No extra objects or glow.

All website text is live HTML. Desktop services use CSS Grid; tablet uses a photograph followed by two service columns; mobile uses the photograph followed by services 01–04. Viewport motion respects reduced motion. Verification: production build and browser checks at 360, 390, 834, 1100, 1440 and 1672 pixels, checking overflow, image loading, numerical mobile order, all four enquiry destinations and runtime errors.
