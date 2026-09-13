import fs from 'node:fs';
import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
const sources=['exec-7476930e-8629-4a28-8535-34382b42617c.png','exec-de5a220d-73e2-4dcb-a034-23bb1cbc1537.png','exec-2ace8b4e-c28b-421c-a321-42b4719da54e.png'];
for(const [i,id] of ['pr','events','real-estate'].entries()){
 const data='data:image/png;base64,'+fs.readFileSync('C:/Users/rayaa/.codex/generated_images/01a094b3-1f61-7df2-a329-e067d31a884f/'+sources[i]).toString('base64');
 for(const width of [960,1680]){
  const result=await page.evaluate(async({data,width})=>{const img=new Image();img.src=data;await img.decode();const c=document.createElement('canvas');c.width=Math.min(width,img.width);c.height=Math.round(c.width*img.height/img.width);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c.toDataURL('image/webp',.88).split(',')[1];},{data,width});
  fs.writeFileSync(`public/assets/campaigns/${id}${width===960?'-960':''}.webp`,Buffer.from(result,'base64'));
 }
}
await browser.close();
