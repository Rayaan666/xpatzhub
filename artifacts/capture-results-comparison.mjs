import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:2000,height:700}});
await page.goto('http://localhost:5101/artifacts/results-comparison.html');await page.screenshot({path:'artifacts/results-side-by-side.png',fullPage:true});
await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:5101/seo-digital-marketing');await page.locator('#results-performance').scrollIntoViewIfNeeded();await page.waitForTimeout(1300);assert.equal(await page.locator('#pr-heading').evaluate(el=>getComputedStyle(el).opacity),'1');
await page.setViewportSize({width:390,height:900});const gallery=page.locator('.pr-editorial-stack');await gallery.scrollIntoViewIfNeeded();await gallery.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(250);assert.ok(await gallery.evaluate(el=>el.scrollLeft)>0);await page.screenshot({path:'artifacts/results-mobile-gallery.png'});
console.log('PASS: normal-motion reveal and keyboard-scrollable mobile gallery; comparison captured.');await browser.close();
