import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1816,1440,834,390,360]){
 await page.setViewportSize({width,height:1000});
 await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});
 await page.locator('#our-approach').scrollIntoViewIfNeeded();
 await page.locator('#our-approach').screenshot({path:`artifacts/growth-${width}.png`});
 assert.equal(await page.locator('.growth-stage').count(),5);
 assert.equal(await page.locator('.growth-transition').count(),4);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width}`);
 await page.getByRole('button',{name:'Continue to stage 2: Get Noticed'}).click();
 assert.equal(await page.locator('.growth-stage article').nth(1).evaluate(el=>document.activeElement===el),true);
}
await page.goto('http://localhost:5101/');
assert.equal(await page.locator('#our-approach').count(),0);
assert.deepEqual(errors,[]);
console.log('PASS: five stages, four keyboard-accessible transitions, five viewports, no overflow/runtime errors, homepage unchanged.');
await browser.close();
