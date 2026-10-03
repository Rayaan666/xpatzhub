import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.goto('http://localhost:5101/pr-brand-visibility/');

const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1024,768,390,360]){
 await page.setViewportSize({width,height:1000});await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.locator('#beyond-being-seen').scrollIntoViewIfNeeded();
 await page.locator('#beyond-being-seen').screenshot({path:`artifacts/beyond-${width}.png`});
 console.log(width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,rows:document.querySelectorAll('.bbs-stages li').length,photo:document.querySelector('.bbs-photo img').naturalWidth,words:[...document.querySelectorAll('.bbs-word')].map(e=>{const r=document.createRange();r.selectNodeContents(e.firstChild);return {right:r.getBoundingClientRect().right,viewport:innerWidth}})})));
}
console.log('Errors',errors);await browser.close();

