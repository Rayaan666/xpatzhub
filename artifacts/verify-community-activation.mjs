import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,1366,1024,834,767,390,320]){
  await page.setViewportSize({width,height:950});
  await page.goto('http://localhost:5110/community',{waitUntil:'networkidle'});
  const section=page.locator('.community-activation');
  await section.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode();})));
  await page.evaluate(()=>document.fonts.ready);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error(`Overflow ${width}`);
  if(await section.locator('h3').count()!==6)throw Error('Missing services');
  const layout=await section.evaluate(el=>({adjacent:el.previousElementSibling.classList.contains('community-power'),bands:[...el.querySelectorAll('article')].map(b=>{const r=b.getBoundingClientRect();return {height:r.height,width:r.width,clipped:[...b.querySelectorAll('h3,.community-activation__service p')].some(t=>{const v=t.getBoundingClientRect();return v.bottom>r.bottom||v.left<r.left||v.right>r.right;})};})}));
  if(!layout.adjacent||layout.bands.some(b=>b.clipped))throw Error(`Clipped or misplaced ${width}`);
  if([1366,1440].includes(width)&&layout.bands.some(b=>b.height<500||b.height>580))throw Error(`Laptop band height ${width}: ${JSON.stringify(layout)}`);
  for(const band of await section.locator('article').all())await band.scrollIntoViewIfNeeded();
  await section.screenshot({path:`artifacts/community-activation-${width}.png`,style:'.header{visibility:hidden!important}'});
}
await page.emulateMedia({reducedMotion:'no-preference'});
await page.goto('http://localhost:5110/community',{waitUntil:'networkidle'});
for(const band of await page.locator('.community-activation__band').all()){
  await band.scrollIntoViewIfNeeded();
  await page.waitForFunction(el=>getComputedStyle(el).opacity==='1',await band.locator('.community-activation__services').elementHandle());
}
await page.goto('http://localhost:5110/',{waitUntil:'networkidle'});
if(await page.locator('.community-activation').count())throw Error('Homepage altered');
await browser.close();
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: eight widths, 1366/1440 landscape heights, six services, image decoding, reduced motion and scroll reveal, no overflow, Community-only placement.');
