import { chromium } from '@playwright/test';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1672,941],[834,1000],[390,844]]){
await page.setViewportSize({width,height});await page.goto('http://localhost:5173');await page.waitForTimeout(700);
await page.screenshot({path:`artifacts/approved-hero-${width}.png`,fullPage:width===390});
if(await page.locator('.dh-phone').count()!==5)throw Error('Phone count');
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);
}
await page.getByRole('button',{name:"Let's Grow Your Brand",exact:true}).click();await page.getByRole('heading',{name:'Let’s grow your brand.'}).waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Watch Our Story',exact:true}).click();await page.getByRole('heading',{name:'Our Story',exact:true}).waitFor();
if(errors.length)throw Error(errors.join('\n'));await browser.close();console.log('PASS: five phones, responsive widths, CTA dialogs, no runtime errors');
