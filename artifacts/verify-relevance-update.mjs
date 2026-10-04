import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page = await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1680,1280,1024,834,390,360]){
 await page.setViewportSize({width,height:1050});await page.goto('http://localhost:5101/influencers');
 const section=page.locator('.why-influence');await section.scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await section.locator('img').evaluate(i=>i.decode());
 assert.equal(await page.locator('.influencers-hero + .why-influence').count(),1);
 assert.equal(await section.locator('button[aria-pressed="true"]').innerText(),'RELEVANCE');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const before=await section.locator('img').boundingBox();
 await section.getByRole('button',{name:'Emphasize trust',exact:true}).click();
 assert.equal(await section.locator('.why-influence__callout.is-active h3').innerText(),'01 — TRUST');
 const after=await section.locator('img').boundingBox();assert.equal(before.width,after.width);assert.equal(before.height,after.height);
 await section.getByRole('button',{name:'Emphasize relevance',exact:true}).click();
 await section.screenshot({path:`artifacts/relevance-updated-${width}.png`});
 console.log('PASS responsive layout and controls:',width);
}
await page.getByRole('button',{name:'Emphasize trust',exact:true}).focus();await page.keyboard.press('Enter');
assert.equal(await page.locator('.why-influence button[aria-pressed="true"]').innerText(),'TRUST');
await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();await page.locator('.why-influence').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);
assert.equal(await page.locator('.why-influence button[aria-pressed="true"]').innerText(),'RELEVANCE');
assert.deepEqual(errors,[]);console.log('PASS keyboard, stable default state, and no runtime errors');
await browser.close();
