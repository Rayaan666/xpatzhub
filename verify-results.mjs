import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',error=>errors.push(error.message));
for(const width of [1672,1816,1440,1024,834,390,360]){
 await page.setViewportSize({width,height:1100});await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});
 const section=page.locator('#results-performance');await section.scrollIntoViewIfNeeded();await section.screenshot({path:`artifacts/results-${width}.png`});
 assert.equal(await section.locator('.pr-metric').count(),6);assert.equal(await section.locator('.pr-editorial-stack .pr-photo').count(),3);assert.equal(await section.locator('.pr-client-logos img').count(),0);assert.equal(await section.locator('.pr-client-logos span').count(),6);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${width}`);
 assert.match(await section.locator('#pr-data-note').innerText(),/not verified XPATZHUB results/);
 assert.equal(await section.locator('.pr-dashboard').getAttribute('aria-label').then(text=>text.includes('245K')),true);
 for(const selector of ['.pr-copy .pr-primary','.pr-final-cta']){const button=section.locator(selector);await button.click();assert.equal(await section.locator('.pr-dialog').evaluate(el=>el.open),true);assert.match(await section.locator('.pr-dialog .pr-primary').getAttribute('href'),/^mailto:/);await page.keyboard.press('Escape');assert.equal(await button.evaluate(el=>el===document.activeElement),true);}
 if(width>1200){const boxes=await section.locator('.pr-metric').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().top));assert.ok(boxes.every(y=>Math.abs(y-boxes[0])<2));}
 if(width<768){assert.ok(await section.locator('.pr-workspace').evaluate(el=>el.getBoundingClientRect().height)>270);assert.equal(await section.locator('.pr-mobile-heading').isVisible(),true);}
}
await page.goto('http://localhost:5101/');assert.equal(await page.locator('#results-performance').count(),0);assert.deepEqual(errors,[]);
console.log('PASS: seven viewports, six metrics, three editorial photos, editable dashboard, visible placeholder labels, neutral clients, both CTAs, Escape/focus restoration, no overflow or runtime errors, homepage isolation.');await browser.close();
