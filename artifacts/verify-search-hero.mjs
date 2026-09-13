import { chromium } from '@playwright/test';
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true });
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,834,390,360]){
 await page.setViewportSize({width,height:950});
 await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);

 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);
 await page.locator('.seo-hero').screenshot({path:`artifacts/search-hero-${width}.png`});
}
await page.getByRole('button',{name:'Let’s Grow Your Visibility'}).click();
await page.getByRole('dialog').waitFor();
await page.keyboard.press('Escape');
if(!await page.getByRole('button',{name:'Let’s Grow Your Visibility'}).evaluate(e=>e===document.activeElement))throw Error('Focus not restored');
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: five viewport sizes, no overflow or runtime errors, enquiry dialog and keyboard focus.');
await browser.close();

