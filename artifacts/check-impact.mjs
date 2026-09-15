import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1280,1024,834,390,360]){
 await page.setViewportSize({width,height:1100});await page.goto('http://localhost:5101/influencers');const s=page.locator('.influence-impact');await s.scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await s.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
 assert.equal(await s.locator('h2').count(),1);assert.equal(await s.locator('.influence-impact__outcomes li').count(),6);assert.equal(await s.locator('img').count(),3);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const display=await s.locator('.influence-impact__display').boundingBox();assert(display.x>=0&&display.x+display.width<=width);
 const closing=await s.locator('.influence-impact__statement').boundingBox();const note=await s.locator('.influence-impact__closing-note').boundingBox();assert(closing.x+closing.width<=note.x || closing.y+closing.height<=note.y);
 if(width<641){const centre=await s.locator('.influence-impact__photo--remembered').boundingBox();const detail=await s.locator('.influence-impact__photo--seen').boundingBox();assert(centre.y<detail.y);}
 await page.addStyleTag({content:'.header{visibility:hidden!important}'});await s.screenshot({path:`artifacts/impact-${width}.png`});
 console.log(`PASS ${width}: all content, image layout, full IMPACT visible, no overflow or closing collision`);
}
await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://localhost:5101/influencers');await page.locator('.influence-impact').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);assert.equal(await page.locator('.influence-impact__display').evaluate(e=>getComputedStyle(e).opacity),'1');
for(const route of ['/','/community','/seo-digital-marketing']){await page.goto('http://localhost:5101'+route);assert.equal(await page.locator('.influence-impact').count(),0);}
assert.deepEqual(errors,[]);console.log('PASS animation completes, route isolation, no runtime errors');await browser.close();
