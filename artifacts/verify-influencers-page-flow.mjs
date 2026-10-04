import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/influencers');
await page.evaluate(() => document.fonts.ready);

const sections = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('main > *')).map(el => ({
    tagName: el.tagName,
    className: el.className,
    id: el.id
  }));
});

console.log('Influencers Page Sections:', JSON.stringify(sections, null, 2));

await browser.close();
