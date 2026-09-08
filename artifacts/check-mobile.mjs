import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5174',{waitUntil:'networkidle'});
for(const width of [320,360,390,430,600,767,768,834,1440]) {
  await page.setViewportSize({width,height:1050});
  await page.waitForTimeout(400);
  if(await page.locator('h1').count()!==1) throw Error(`Heading count at ${width}`);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(`Overflow at ${width}`);
  if(width<768){
    if(await page.locator('.mobile-phone').count()!==5) throw Error('Missing phones');
    await page.locator('.mobile-hero-stats').scrollIntoViewIfNeeded();
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.locator('#home').screenshot({path:`artifacts/mobile-hero-${width}.png`});
  } else {
    await page.screenshot({path:`artifacts/after-mobile-${width}.png`});
    const before=await readFile(`artifacts/before-mobile-${width}.png`);
    const after=await readFile(`artifacts/after-mobile-${width}.png`);
    console.log(`Desktop/tablet ${width}: ${before.equals(after)?'pixel-identical':'requires pixel inspection'}`);
  }
}
await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'Watch Our Story',exact:true}).click();
await page.getByText('Our story film is coming soon.').waitFor();
await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Let’s Grow Your Brand',exact:true}).click();
await page.getByRole('checkbox',{name:'Digital Marketing',exact:true}).check();
await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Open navigation'}).click();
await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Contact'}).click();
await page.locator('dialog[open]').waitFor();
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: responsive widths, five phones, single H1, no overflow/runtime errors, CTA, story and mobile menu.');
await browser.close();
