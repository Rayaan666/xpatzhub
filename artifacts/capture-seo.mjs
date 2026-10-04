import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/seo-digital-marketing');
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'artifacts/seo-hero-1440.png' });

await page.setViewportSize({ width: 768, height: 900 });
await page.screenshot({ path: 'artifacts/seo-hero-768.png' });

await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'artifacts/seo-hero-390.png' });

await browser.close();
console.log('Screenshots captured successfully.');
