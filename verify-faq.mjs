import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));

// Build dist preview server URL check
await page.goto('http://localhost:5173/seo-digital-marketing.html', { waitUntil: 'networkidle' }).catch(async () => {
  // If Vite dev server is on port 5173
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
});

// Check responsive layouts
for (const width of [1672, 1440, 834, 390]) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 950 });
  const section = page.locator('#faq');
  await section.waitFor();
  await page.screenshot({ path: `artifacts/faq-section-${width}.png`, fullPage: false });
}

// Test accordion interactions
await page.setViewportSize({ width: 1440, height: 950 });
const firstQuestionBtn = page.locator('#faq-btn-faq-01');
await firstQuestionBtn.click();
await page.locator('#faq-panel-faq-01').waitFor({ state: 'visible' });

// Verify aria attributes
const isExpanded = await firstQuestionBtn.getAttribute('aria-expanded');
if (isExpanded !== 'true') throw new Error('Accordion aria-expanded failed');

// Close first question
await firstQuestionBtn.click();
await page.locator('#faq-panel-faq-01').waitFor({ state: 'hidden' });

if (errors.length) throw Error(errors.join('\n'));
console.log('PASS: FAQ section renders responsively, handles toggle interaction & maintains accessibility attributes.');

await browser.close();
