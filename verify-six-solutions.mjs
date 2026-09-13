import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const original=fs.readFileSync('artifacts/solutions-approved-three.jsx','utf8');
const current=fs.readFileSync('src/Solutions.jsx','utf8');
const originalData=s=>s.slice(s.indexOf('const solutions ='),s.indexOf('\n];')+3);
assert.equal(originalData(current),originalData(original));
assert.ok(fs.readFileSync('src/solutions.css','utf8').startsWith(fs.readFileSync('artifacts/solutions-approved-three.css','utf8').trimEnd()));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1536,960],[1440,900],[1024,768],[834,1112],[390,844],[360,640]]){
 await page.setViewportSize({width,height});await page.goto('http://localhost:5101/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.solutions-panels').count(),1);
 assert.deepEqual(await page.locator('.solution-panel').evaluateAll(els=>els.map(el=>el.id)),['digital','community','influencer','pr','events','real-estate']);
 assert.equal(await page.locator('.solution-services li').count(),44);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 for(let i=0;i<6;i++){
  const panel=page.locator('.solution-panel').nth(i);
  await page.evaluate(()=>scrollTo(0,0));
  await panel.evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(el).top)));
  await page.waitForTimeout(120);
  await panel.locator('img').evaluate(el=>el.decode());
  assert.equal(await panel.evaluate(el=>getComputedStyle(el).position),'sticky');
  assert.ok(await panel.evaluate(el=>{const b=el.getBoundingClientRect();return [...el.querySelectorAll('.solution-body>*')].every(x=>{const r=x.getBoundingClientRect();return r.bottom<=b.bottom&&r.right<=b.right})}),`Content bounds ${width}/${i}`);
  if(i>=3)assert.equal(await panel.locator('li').count(),8);
  if(i&&width>=1200){const tops=await page.locator('.solution-panel').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().top));assert.ok(tops[i]>tops[i-1]&&tops[i]-tops[i-1]<27,`Overlap ${width}/${i}: ${tops}`);}
  if(i>=3)await page.screenshot({path:`artifacts/six-stack-${width}-${i+1}.png`});
 }
 console.log(`PASS ${width}x${height}`);
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: approved data and CSS preserved; one six-panel stack, 44 services, responsive bounds and desktop overlap.');
