import {chromium} from '@playwright/test';
import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.goto('http://localhost:5101/pr-brand-visibility/');
const source=(await readFile('design-references/pr-services-generated.png')).toString('base64');
for(const width of [900,1672]){
 const data=await page.evaluate(async({width,source})=>{const img=new Image();img.src='data:image/png;base64,'+source;await img.decode();const c=document.createElement('canvas');c.width=width;c.height=Math.round(width*img.height/img.width);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c.toDataURL('image/webp',.9).split(',')[1]},{width,source});
 await writeFile(`public/assets/pr-visibility/services-${width}.webp`,Buffer.from(data,'base64'));
}
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1100,834,390,360]){
 await page.setViewportSize({width,height:1000});await page.reload({waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.locator('#pr-services').scrollIntoViewIfNeeded();
 await page.locator('#pr-services').screenshot({path:`artifacts/pr-services-${width}.png`});
 assert.equal(await page.locator('.pvs-service').count(),4);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.equal(await page.locator('.pvs-photograph img').evaluate(e=>e.naturalWidth>0),true);
 for(const a of await page.locator('.pvs-explore').all())assert.match(await a.getAttribute('href'),/^mailto:.+\?subject=PR/);
 if(width<=600){const boxes=await page.locator('.pvs-service').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(boxes.every((v,i)=>!i||v>boxes[i-1]));}
 console.log('PASS',width);
}
assert.deepEqual(errors,[]);await browser.close();
