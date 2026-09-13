import { chromium } from '@playwright/test';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
for (const width of [1672, 1440, 1024, 834, 767, 390, 320]) {
  await page.setViewportSize({width, height:1000});
  await page.goto('http://localhost:5102/community', {waitUntil:'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`Overflow at ${width}`);
  if (await page.locator('h1').count() !== 1) throw Error('Expected one H1');
  if (!await page.locator('.community-print img').evaluateAll(imgs => imgs.length === 3 && imgs.every(i => i.complete && i.naturalWidth))) throw Error('Missing photos');
  if(width >= 768) {
    const overlaps = await page.evaluate(() => {
      const content=document.querySelector('.community-hero__copy').getBoundingClientRect();
      return [...document.querySelectorAll('.community-print:not(.community-print--gathering) .community-print__frame')].some(el => {const r=el.getBoundingClientRect();return r.left<content.right && r.right>content.left && r.top<content.bottom && r.bottom>content.top;});
    });
    if(overlaps) throw Error(`Photo overlaps copy at ${width}`);
  }
  await page.locator('.community-hero').screenshot({path:`artifacts/community-hero-${width}.png`,style:'.header { visibility: hidden !important; }'});
}
await page.getByRole('link',{name:'Explore What We Do', exact:true}).click();
if(!page.url().endsWith('#solutions')) throw Error('Explore link failed');
if(!await page.getByRole('link',{name:'Connect With Our Community',exact:true}).getAttribute('href').then(h=>h.startsWith('mailto:')))throw Error('Enquiry link failed');
await page.goto('http://localhost:5102/', {waitUntil:'networkidle'});
if(await page.locator('.community-hero').count())throw Error('Home hero replaced');
await page.goto('http://localhost:5102/seo-digital-marketing', {waitUntil:'networkidle'});
if(!await page.locator('.seo-hero').count())throw Error('SEO hero missing');
await browser.close();
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: seven responsive widths, loaded photos, no overflow or copy overlap, CTAs and existing routes.');
