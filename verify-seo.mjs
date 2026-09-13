import { chromium } from '@playwright/test';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
for(const width of [1672,1440,834,390,360]) {
 await page.setViewportSize({width,height:width<768?844:950});
 await page.goto('http://localhost:5101/seo-digital-marketing',{waitUntil:'networkidle'});
 await page.screenshot({path:`artifacts/seo-${width}.png`,fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(`Overflow ${width}`);
 if(await page.locator('h1').count()!==1) throw Error('Heading count');
}
await page.getByRole('button',{name:'Get Your Free Strategy Call'}).click();
await page.getByRole('dialog').waitFor();
await page.keyboard.press('Escape');
if(!await page.getByRole('button',{name:'Get Your Free Strategy Call'}).evaluate(el=>el===document.activeElement)) throw Error('Focus restore');
await page.getByRole('button',{name:'See How It Works'}).click();
await page.getByText('Understand your brand.',{exact:true}).waitFor();
await page.getByRole('button',{name:'Close dialog'}).click();
if(errors.length) throw Error(errors.join('\n'));
console.log('PASS: five responsive sizes, no horizontal overflow or runtime errors, CTA dialogs, Escape, focus restoration.');
await browser.close();
