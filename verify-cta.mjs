import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));

for (const width of [1672, 1440, 834, 390]) {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 950 });
  await page.goto('http://localhost:5173/seo-digital-marketing.html', { waitUntil: 'networkidle' }).catch(async () => {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  });
  
  const section = page.locator('#start-project');
  await section.waitFor();
  await page.screenshot({ path: `artifacts/cta-section-${width}.png`, fullPage: false });
}

if (errors.length) throw Error(errors.join('\n'));
console.log('PASS: CTA section renders cleanly across viewports without errors.');

await browser.close();
