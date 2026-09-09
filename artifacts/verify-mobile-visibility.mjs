import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
// Reproduce a webview that never reports SVG/element intersection entries.
await page.addInitScript(()=>{window.IntersectionObserver=class{observe(){} unobserve(){} disconnect(){} takeRecords(){return []}}});
await page.goto('http://localhost:5173');await page.waitForTimeout(1500);
const phones=await page.locator('.pm-phone').evaluateAll(els=>els.map(el=>({opacity:getComputedStyle(el).opacity,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})));
if(phones.length!==5||phones.some(p=>Number(p.opacity)<.99||p.width===0||p.height===0))throw Error(JSON.stringify(phones));
await page.screenshot({path:'artifacts/mobile-visibility-fixed.png'});
await browser.close();console.log('PASS: all five phones visible without any intersection callbacks.');
