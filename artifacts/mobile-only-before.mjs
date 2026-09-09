import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
for (const width of [768,1440,1672]) {await page.setViewportSize({width,height:1000});await page.goto('http://localhost:5173');await page.screenshot({path:`artifacts/mobile-only-before-${width}.png`});}
await browser.close();
