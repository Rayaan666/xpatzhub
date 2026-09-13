import { chromium } from '@playwright/test';
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const page = await browser.newPage({reducedMotion:'reduce'});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1024,834,767,390,320]){
  await page.setViewportSize({width,height:1000});
  await page.goto('http://localhost:5102/community',{waitUntil:'networkidle'});
  const section=page.locator('.community-power');
  await section.scrollIntoViewIfNeeded();
  // Load every lazy image, including the lower stages of the mobile journey.
  await section.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
  await page.waitForFunction(()=>[...document.querySelectorAll('.community-power img')].every(img=>img.complete&&img.naturalWidth));
  await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  for(const img of await section.locator('img').all())await img.scrollIntoViewIfNeeded();
  await page.evaluate(()=>document.fonts.ready);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`Overflow at ${width}`);
  const result=await section.evaluate(el=>{
    const bounds=el.getBoundingClientRect();
    const text=[...el.querySelectorAll('h2 span,figcaption,.community-power__quote span,.community-power__statement span')];
    return {adjacent:el.previousElementSibling?.classList.contains('community-hero'),clipped:text.some(e=>{const r=e.getBoundingClientRect();return r.left<bounds.left||r.right>bounds.right||e.scrollWidth>e.clientWidth+1;})};
  });
  if(!result.adjacent||result.clipped)throw Error(`Section position/text clipping ${width}: ${JSON.stringify(result)}`);
  if((await section.locator('figcaption').allTextContents()).join(',')!=='Discover,Connect,Experience,Share,Grow')throw Error('Stage order');
  await section.screenshot({path:`artifacts/community-power-${width}.png`,style:'.header{visibility:hidden!important}'});
}
await page.goto('http://localhost:5102/',{waitUntil:'networkidle'});
if(await page.locator('.community-power').count())throw Error('Section leaked onto homepage');
await browser.close();
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: seven viewport widths, all five photos, ordered stages, no clipped text or overflow, section directly after Community hero and absent from Home.');
