import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/influencers');
await page.evaluate(() => document.fonts.ready);

const solutions = page.locator('#solutions');
await solutions.scrollIntoViewIfNeeded();
await page.screenshot({ path: 'artifacts/influencers-solutions-header-removed.png' });

await browser.close();
console.log('Influencers solutions header verification screenshot saved.');
