import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
await page.goto('http://localhost:5174');
const data=await page.evaluate(async()=>{
 const img=new Image();img.src='/assets/mobile-digital.webp';await img.decode();
 const c=document.createElement('canvas');c.width=440;c.height=880;
 const ctx=c.getContext('2d');ctx.drawImage(img,0,110,440,770,0,0,440,880);
 return c.toDataURL('image/webp',.9).split(',')[1];
});
await writeFile('public/assets/mobile-digital.webp',Buffer.from(data,'base64'));
await browser.close();
