import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.goto('http://localhost:5101/events-experiences-uae',{waitUntil:'domcontentloaded'});
for(const name of ['business','brands','celebrations'])for(const width of [640,1200]){
 const data=await page.evaluate(async({name,width})=>{const img=new Image();img.src=`/assets/events/create-${name}-source.png`;await img.decode();const c=document.createElement('canvas');c.width=width;c.height=Math.round(width*img.naturalHeight/img.naturalWidth);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c.toDataURL('image/webp',.88).split(',')[1];},{name,width});
 fs.writeFileSync(`public/assets/events/create-${name}-${width}.webp`,Buffer.from(data,'base64'));
}
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1100,1024,768,390,360]){
 await page.setViewportSize({width,height:1000});await page.reload({waitUntil:'domcontentloaded'});
 const section=page.locator('.events-create');await section.scrollIntoViewIfNeeded();
 await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await page.evaluate(()=>document.fonts.ready);
 assert.equal(await section.locator('article').count(),3);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
 const clipped=await section.locator('h2,h3,.create-copy,.create-summary').evaluateAll(els=>els.filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent));
 await section.screenshot({path:`artifacts/create-${width}.png`});
 assert.deepEqual(clipped,[],`clipped text ${width}`);
 if(width>1000){const bottoms=await section.locator('.create-photo').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().bottom));assert.ok(Math.max(...bottoms)-Math.min(...bottoms)<2,'photo baseline');}
 for(const label of ['Explore corporate events','Explore brand activations','Explore private events']){const a=section.getByRole('link',{name:label});assert.ok((await a.getAttribute('href')).startsWith('mailto:'));await a.focus();assert.ok(await a.evaluate(el=>el===document.activeElement));}
 console.log(`PASS ${width}px`);
}
await page.emulateMedia({reducedMotion:'no-preference'});await page.reload({waitUntil:'domcontentloaded'});
for(const selector of ['.create-intro','.create-business','.create-brands','.create-celebrations','.create-footer']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(1200);assert.equal(await page.locator(selector).evaluate(el=>getComputedStyle(el).opacity),'1');}
assert.deepEqual(errors,[]);console.log('PASS: images, text, photo baselines, accessible enquiry links, responsive layout and scroll reveals.');
await browser.close();
