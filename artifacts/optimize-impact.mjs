import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage();await page.goto('http://localhost:5101/');
for(const [id,x,fraction,widths] of [['seen',0,.25,[272,544]],['remembered',.25,.5,[544,1088]],['acted',.75,.25,[272,544]]])for(const width of widths){
 const data=await page.evaluate(async({x,fraction,width})=>{const i=new Image();i.src='/assets/influencers/impact/campaign-source.png';await i.decode();const c=document.createElement('canvas');const sw=i.naturalWidth*fraction;c.width=width;c.height=Math.round(width*i.naturalHeight/sw);c.getContext('2d').drawImage(i,x*i.naturalWidth,0,sw,i.naturalHeight,0,0,c.width,c.height);return c.toDataURL('image/webp',.9).split(',')[1];},{x,fraction,width});fs.writeFileSync(`public/assets/influencers/impact/${id}-${width}.webp`,Buffer.from(data,'base64'));
}
await browser.close();
