import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.goto('http://localhost:5101/events-experiences-uae',{waitUntil:'domcontentloaded'});
for(const [name,widths] of [['workshop',[640,1200]],['bowl',[320,560]]])for(const width of widths){
 const data=await page.evaluate(async({name,width})=>{const img=new Image();img.src=`/assets/events/${name}-source.png`;await img.decode();const c=document.createElement('canvas');c.width=width;c.height=Math.round(width*img.naturalHeight/img.naturalWidth);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c.toDataURL('image/webp',.88).split(',')[1];},{name,width});
 fs.writeFileSync(`public/assets/events/${name}-${width}.webp`,Buffer.from(data,'base64'));
}
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,1672,1100,768,390,360]){
 await page.setViewportSize({width,height:1000});await page.reload({waitUntil:'domcontentloaded'});
 const section=page.locator('.event-experience');await section.scrollIntoViewIfNeeded();
 await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await page.evaluate(()=>document.fonts.ready);
 assert.equal(await section.locator('li').count(),5);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
 const clipped=await section.locator('h2,h3,li p,.experience-summary,.experience-statement').evaluateAll(els=>els.filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent));
 assert.deepEqual(clipped,[],`clipped text ${width}`);
 await section.screenshot({path:`artifacts/experience-${width}.png`});
 console.log(`PASS ${width}px`);
}
await page.emulateMedia({reducedMotion:'no-preference'});await page.reload({waitUntil:'domcontentloaded'});
for(const selector of ['.experience-title','.experience-circle','.experience-journey li:last-child','.experience-band']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(1100);}
assert.ok(await page.locator('.experience-band>div').evaluate(el=>getComputedStyle(el).opacity==='1'));
assert.deepEqual(errors,[]);console.log('PASS: images, text layout, stage order, reduced and normal motion, no runtime errors.');
await browser.close();
