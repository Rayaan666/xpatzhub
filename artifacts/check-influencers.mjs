import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1280,834,390,360]){
 await page.setViewportSize({width,height:1100});
 await page.goto('http://localhost:5101/influencers');await page.evaluate(()=>document.fonts.ready);
 await page.locator('.influencers-hero__scene img').first().evaluate(i=>i.decode());
 assert.equal(await page.locator('h1').count(),1);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.getByRole('button',{name:/Find Your Brand/}).click();
 assert(await page.locator('dialog').evaluate(d=>d.open));
 await page.keyboard.press('Escape');
 await page.getByRole('link',{name:'Explore Collaborations',exact:true}).click();
 assert.equal(new URL(page.url()).hash,'#influencer');
 await page.goto('http://localhost:5101/influencers');
 await page.locator(".influencers-hero").screenshot({path:`artifacts/influencers-${width}.png`});
 console.log(`PASS ${width}: route, no overflow, semantic H1, enquiry dialog, collaboration anchor`);
}
for(const [path,selector] of [['/','.dh-hero'],['/community','.community-hero'],['/seo-digital-marketing','.seo-hero']]){
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:5101'+path);assert.equal(await page.locator(selector).count(),1);
 assert.equal(await page.locator('.influencers-hero').count(),0);
}
assert.deepEqual(errors,[]);console.log('PASS existing routes and no runtime errors');await browser.close();

