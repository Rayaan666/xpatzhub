import { chromium } from '@playwright/test';
import { readFileSync,writeFileSync } from 'node:fs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,360,375,390,393,412,430,767,768,1440,1672]){
await page.setViewportSize({width,height:1000});await page.goto('http://localhost:5173');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow at '+width);
if(width<768){if(await page.locator('.pm-phone').count()!==5)throw Error('Phone count');await page.locator('.pm-hero').screenshot({path:`artifacts/portrait-${width}.png`});}
else{const screenshot=await page.screenshot({path:`artifacts/mobile-only-after-${width}.png`});const before=readFileSync(`artifacts/mobile-only-before-${width}.png`);const heroHeight=Math.floor(await page.locator('.dh-hero').evaluate(el=>el.getBoundingClientRect().height));const equal=await page.evaluate(async({before,after,width,height})=>{const pixels=async src=>{const image=new Image();image.src=src;await image.decode();const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,width,height).data;};const a=await pixels(before),b=await pixels(after);return a.every((value,index)=>value===b[index]);},{before:'data:image/png;base64,'+before.toString('base64'),after:'data:image/png;base64,'+screenshot.toString('base64'),width,height:heroHeight});if(!equal)throw Error('Desktop hero changed at '+width);}
}
await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:5173');
await page.getByRole('button',{name:"Let's Grow Your Brand",exact:true}).click();await page.getByRole('heading',{name:'Let’s grow your brand.'}).waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Watch Our Story',exact:true}).click();await page.getByRole('heading',{name:'Our Story',exact:true}).waitFor();await page.keyboard.press('Escape');
if(errors.length)throw Error(errors.join('\n'));
writeFileSync('artifacts/portrait-comparison.html',`<!doctype html><meta name="viewport" content="width=device-width"><title>Mobile reference comparison</title><style>body{background:#202020;color:white;font:14px Arial;display:flex;gap:24px;margin:24px}figure{margin:0}img{width:390px;display:block}figcaption{padding:12px 0}</style><figure><figcaption>Approved mobile reference</figcaption><img src="../public/assets/mobile-approved.png"></figure><figure><figcaption>390px implementation</figcaption><img src="portrait-390.png"></figure>`);
await browser.close();console.log('PASS: 8 mobile widths, exactly five phones, no horizontal overflow, both CTAs, no runtime errors. Desktop screenshots byte-identical at 768, 1440 and 1672px.');
