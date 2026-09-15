import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1280,1024,834,390,360]){
 await page.setViewportSize({width,height:1050});await page.goto('http://localhost:5101/influencers');
 const section=page.locator('.why-influence');await section.scrollIntoViewIfNeeded();await page.evaluate(()=>document.fonts.ready);await section.locator('img').evaluate(i=>i.decode());
 assert.equal(await page.locator('.influencers-hero + .why-influence').count(),1);
 assert.equal(await section.locator('h2').count(),1);assert.equal(await section.locator('.why-influence__callout').count(),4);
 assert.equal(await section.locator('.why-influence__sequence .is-active').innerText(),'RELEVANCE');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await section.screenshot({path:`artifacts/why-influence-${width}.png`});console.log(`PASS ${width}: section placement, all captions, reduced-motion state, no overflow`);
}
await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:900});await page.goto('http://localhost:5101/influencers');
const states=[];for(const progress of [.26,.43,.6,.76]){await page.evaluate(progress=>{const s=document.querySelector('.why-influence'),y=s.getBoundingClientRect().top+scrollY;scrollTo(0,y-innerHeight+progress*(innerHeight+s.offsetHeight));},progress);await page.waitForTimeout(150);states.push(await page.locator('.why-influence__sequence .is-active').innerText());}
assert.deepEqual(states,['TRUST','RELEVANCE','STORY','CONNECTION']);
for(const route of ['/','/community','/seo-digital-marketing']){await page.goto('http://localhost:5101'+route);assert.equal(await page.locator('.why-influence').count(),0);}
assert.deepEqual(errors,[]);console.log('PASS scroll sequence and unchanged other routes; no runtime errors');await browser.close();
