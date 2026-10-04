import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push(err.message));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/influencers');
await page.evaluate(() => document.fonts.ready);

const faqSection = page.locator('#influencers-faq');
await faqSection.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

// Screenshot initial closed state
await faqSection.screenshot({ path: 'artifacts/influencers-faq-1440-closed.png' });

// Open first FAQ item
const firstTrigger = page.locator('#inf-faq-btn-inf-faq-01');
await firstTrigger.click();
await page.waitForTimeout(400);

// Screenshot open state
await faqSection.screenshot({ path: 'artifacts/influencers-faq-1440-open.png' });

// Mobile test
await page.setViewportSize({ width: 390, height: 844 });
await faqSection.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await faqSection.screenshot({ path: 'artifacts/influencers-faq-390.png' });

await browser.close();

console.log('Errors encountered:', errors.length);
if (errors.length > 0) {
  console.error(errors);
} else {
  console.log('PASS: Influencer FAQ rendered cleanly with zero errors on desktop and mobile.');
}
