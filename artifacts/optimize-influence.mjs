import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
await page.goto('http://localhost:5101/');
for(const width of [768,1536]){
 const data=await page.evaluate(async width=>{const i=new Image();i.src='/assets/influencers/creator-cafe-source.png';await i.decode();const c=document.createElement('canvas');c.width=width;c.height=Math.round(width*i.naturalHeight/i.naturalWidth);c.getContext('2d').drawImage(i,0,0,c.width,c.height);return c.toDataURL('image/webp',.88).split(',')[1];},width);
 fs.writeFileSync(`public/assets/influencers/creator-cafe-${width}.webp`,Buffer.from(data,'base64'));
}
await browser.close();
