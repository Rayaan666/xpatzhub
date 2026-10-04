import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/influencers');
await page.evaluate(() => document.fonts.ready);

const section = page.locator('.why-influence');
await section.scrollIntoViewIfNeeded();
await section.screenshot({ path: 'artifacts/why-influence-fixed.png' });

await browser.close();
console.log('Why Influence section screenshot saved.');
