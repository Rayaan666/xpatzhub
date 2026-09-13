import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1536,1816,1024,834,390,360]){
await page.setViewportSize({width,height:1100});await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});await page.locator('#digital-services').scrollIntoViewIfNeeded();await page.locator('.ds-photo img').evaluateAll(images=>Promise.all(images.map(async image=>{image.loading='eager';await image.decode();if(image.naturalWidth<1920)throw new Error('Service image is below 1920px: '+image.src);})));await page.locator('#digital-services').screenshot({path:`artifacts/services-${width}.png`});assert.equal(await page.locator('.ds-card').count(),9);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width}`);
for(const button of await page.locator('.ds-card button').all()){await button.click();await page.locator('.ds-dialog').waitFor({state:'visible'});await page.keyboard.press('Escape');assert.equal(await button.evaluate(el=>el===document.activeElement),true);}
await page.locator('.ds-intro button').click();assert.match(await page.locator('.ds-dialog .ds-cta').getAttribute('href'),/^mailto:/);await page.keyboard.press('Escape');
}
assert.deepEqual(errors,[]);await page.goto('http://localhost:5101/');assert.equal(await page.locator('#digital-services').count(),0);console.log('PASS: six responsive widths, nine service dialogs, CTA, Escape and focus restoration, no overflow or runtime errors, home unchanged.');await browser.close();
