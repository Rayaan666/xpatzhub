import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:850,height:770}});
await page.goto('http://localhost:5173/artifacts/portrait-comparison.html');
await page.screenshot({path:'artifacts/portrait-side-by-side.png'});
await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:5173');await page.waitForTimeout(1600);
if(await page.locator('.pm-phone').evaluateAll(els=>els.some(el=>Number(getComputedStyle(el).opacity)<.99)))throw Error('Phone entrance did not settle');
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForTimeout(100);if(await page.locator('.pm-headline').evaluate(el=>getComputedStyle(el).opacity)!=='1')throw Error('Reduced motion');
await browser.close();console.log('PASS: animation entrance and reduced motion');
