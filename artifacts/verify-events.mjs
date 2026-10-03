import { chromium } from '@playwright/test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page = await browser.newPage({reducedMotion:'reduce'});
await page.goto('http://localhost:5101/');
for (const [name,widths] of [['venue',[1000,1672]],['portrait',[600,1024]]]) {
  for (const width of widths) {
    const data = await page.evaluate(async ({name,width}) => {
      const img = new Image(); img.src=`/assets/events/${name}-source.png`; await img.decode();
      const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(width*img.naturalHeight/img.naturalWidth);
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      return canvas.toDataURL('image/webp',.88).split(',')[1];
    },{name,width});
    fs.writeFileSync(`public/assets/events/${name}-${width}.webp`,Buffer.from(data,'base64'));
  }
}
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,1672,1024,768,390,360]){
  await page.setViewportSize({width,height:950});
  await page.goto('http://localhost:5101/events-experiences-uae');
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('.events-photo img').evaluate(img=>img.decode());
  assert.equal(await page.locator('h1').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  await page.screenshot({path:`artifacts/events-${width}.png`,fullPage:true});
}
for(const label of ['Explore Our Events','Watch Our Story']){
  const button=page.getByRole('button',{name:label});await button.click();
  assert.ok(await page.getByRole('dialog').isVisible());await page.keyboard.press('Escape');
  assert.ok(await button.evaluate(el=>el===document.activeElement));
}
assert.deepEqual(errors,[]);
console.log('PASS: six responsive widths, images, no overflow, dialog controls and focus restoration, no events runtime errors.');
for(const route of ['/','/community','/influencers','/seo-digital-marketing','/pr-brand-visibility']){
  errors.length=0;
  await page.goto(`http://localhost:5101${route}`,{waitUntil:'domcontentloaded'});
  try{await page.locator('main').first().waitFor({timeout:5000});console.log(`Existing route rendered: ${route}`);}
  catch{console.log(`Existing route issue ${route}: ${errors.join('; ')}`);}
}
await browser.close();
