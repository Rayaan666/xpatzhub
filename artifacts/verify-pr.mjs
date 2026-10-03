import { chromium } from '@playwright/test';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page = await browser.newPage({reducedMotion:'reduce'});
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,390,768]) {
 await page.setViewportSize({width,height:950});
 await page.goto('http://localhost:5101/pr-brand-visibility/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`artifacts/pr-${width}.png`,fullPage:true});
 console.log(width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,font:document.fonts.check('600 100px PrBodoni'),title:document.querySelector('h1').innerText,lines:[...document.querySelectorAll('.pr-title span')].map(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().right})})));
}
await page.getByRole('button',{name:'Watch Our Story'}).click();
console.log('dialog',await page.getByRole('dialog').isVisible());
await page.keyboard.press('Escape');
console.log('closed',!(await page.getByRole('dialog').isVisible()),'errors',errors);
await browser.close();
