import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5101/influencers');
await page.evaluate(() => document.fonts.ready);

await page.evaluate(() => {
  const bgImg = document.querySelector('.influencers-hero__scene > img:first-child');
  const fgImg = document.querySelector('.influencers-hero__foreground');
  const prodImg = document.querySelector('.influencers-hero__product');
  
  if (bgImg) bgImg.style.filter = 'hue-rotate(135deg) saturate(1.3) brightness(0.98)';
  if (fgImg) {
    fgImg.style.filter = 'none';
    fgImg.style.clipPath = 'polygon(0 100%,6% 74%,12% 57%,16% 39%,25% 35%,26% 23%,29% 15%,37% 9%,43% 11%,47% 17%,49% 27%,53% 27%,55% 30%,55% 39%,57% 55%,58% 60%,58% 100%)';
  }
  if (prodImg) prodImg.style.filter = 'hue-rotate(135deg) saturate(1.3)';
});

await page.locator('.influencers-hero').screenshot({ path: 'artifacts/blue-scene-full-plinth.png' });

await browser.close();
console.log('Full blue plinth test screenshot saved.');
