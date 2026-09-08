import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
const requests=[];page.on('request',r=>requests.push(r.url()));
await page.goto('http://localhost:5174',{waitUntil:'networkidle'});
await page.locator('.mobile-phone-main').scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
const opacity=await page.locator('.mobile-phone-main>div').evaluate(e=>getComputedStyle(e).opacity);
if(opacity!=='1')throw Error('Phone entrance did not complete');
if(requests.some(u=>u.endsWith('/assets/reference.webp')||u.endsWith('/upload/reference')))throw Error('Desktop artwork loaded on mobile');
console.log('PASS: normal-motion entrance completes; desktop hero artwork is not requested on mobile.');
const before=(await readFile('artifacts/before-mobile-834.png')).toString('base64');
const after=(await readFile('artifacts/after-mobile-834.png')).toString('base64');
console.log(await page.evaluate(async({before,after})=>{
 const images=await Promise.all([before,after].map(async data=>{const img=new Image();img.src='data:image/png;base64,'+data;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,c.width,c.height).data;}));
 let count=0,max=0;for(let i=0;i<images[0].length;i+=4){let diff=0;for(let k=0;k<3;k++)diff=Math.max(diff,Math.abs(images[0][i+k]-images[1][i+k]));if(diff)count++;max=Math.max(max,diff);}
 return {tablet834DifferentPixels:count,maxChannelDifference:max};
},{before,after}));
await browser.close();
