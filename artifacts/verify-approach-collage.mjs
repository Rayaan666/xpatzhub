import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1024,834,390,360]){
await page.setViewportSize({width,height:950});await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});
const section=page.locator('#our-approach');await section.scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);
await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);
if(await section.locator('li').count()!==5)throw Error('Stages');
if(width>=1200){const tops=await section.locator('.growth-category').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));if(Math.max(...tops)-Math.min(...tops)>1)throw Error('Label alignment');}
await section.screenshot({path:`artifacts/approach-collage-${width}.png`});
}
if(!await page.locator('.growth-bottom a').getAttribute('href'))throw Error('CTA target');
if(errors.length)throw Error(errors.join('\n'));console.log('PASS: six widths, five loaded assets and stages, desktop label alignment, CTA target, no overflow or runtime errors');await browser.close();
