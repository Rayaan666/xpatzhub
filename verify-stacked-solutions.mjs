import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const original=fs.readFileSync('artifacts/solutions-original.jsx','utf8');
const current=fs.readFileSync('src/Solutions.jsx','utf8');
assert.equal(current.slice(current.indexOf('const solutions ='),current.indexOf('const categories')).trim(),original.slice(original.indexOf('const solutions ='),original.indexOf('function ReferenceDetail')).trim(),'Original service data must be byte-for-byte unchanged');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1536,960],[1440,900],[1024,768],[834,1112],[390,844],[360,640]]){
 await page.setViewportSize({width,height});await page.goto('http://localhost:5101/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.solution-panel').count(),3);
 assert.equal(await page.locator('.solution-services li').count(),20);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow at ${width}`);
 for(let i=0;i<3;i++){
  const panel=page.locator('.solution-panel').nth(i);
  await panel.evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(el).top)));
  await page.waitForTimeout(100);
  assert.equal(await panel.evaluate(el=>getComputedStyle(el).position),'sticky');
  assert.ok(await panel.evaluate(el=>{const b=el.getBoundingClientRect();return [...el.querySelectorAll('.solution-body>*')].every(x=>{const r=x.getBoundingClientRect();return r.bottom<=b.bottom&&r.right<=b.right})}),`Content bounds ${width}/${i}`);
  assert.ok(await panel.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0));
  if(i&&height>=900){const tops=await page.locator('.solution-panel').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().top));assert.ok(tops[i]>tops[i-1]&&tops[i]-tops[i-1]<30,`Stack peek ${tops}`);}
  await page.screenshot({path:`artifacts/stack-${width}-${i+1}.png`});
 }
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: original service data unchanged; 3 panels; 20 services; 6 viewports; sticky overlap; content bounds; images; no overflow or runtime errors.');
