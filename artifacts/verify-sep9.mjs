import { chromium } from '@playwright/test';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1672,941],[1920,1080],[1440,900],[1366,768],[834,1050],[390,844]]){
 await page.setViewportSize({width,height});await page.goto('http://localhost:5175',{waitUntil:'networkidle'});
 await page.locator('#home').screenshot({path:`artifacts/sep9-hero-${width}.png`});
 const count=await page.locator(width<768?'.mobile-phone':'.dh-device').count();
 if(count!==5)throw Error(`Expected 5 phones at ${width}, got ${count}`);
 if(await page.locator('h1').count()!==1)throw Error('Expected one H1');
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow at '+width);
 console.log({width,hero:await page.locator('#home').boundingBox()});
}
for(const file of ['src/MobileHero.jsx','src/mobile-hero.css','src/styles.css','src/Solutions.jsx','src/solutions.css','src/Footer.jsx','src/footer.css']){if(!readFileSync(file,'utf8').replace(/\r\n/g,'\n').includes(execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'}).replace(/\r\n/g,'\n')))throw Error('Unexpected change: '+file);}console.log('PASS: mobile and lower-section source files unchanged.');
await page.setViewportSize({width:1672,height:941});
await page.getByRole('button',{name:'Watch Our Story',exact:true}).click();await page.getByText('Our story film is coming soon.',{exact:true}).last().waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Let’s Grow Your Brand',exact:true}).click();await page.locator('.dh-dialog').getByRole('link',{name:'+971 56 480 0026'}).waitFor();await page.getByRole('button',{name:'Close dialog',exact:true}).click();
await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.locator('#dh-menu').getByRole('button',{name:'Events',exact:true}).click();await page.getByRole('heading',{name:'Events',exact:true}).waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Explore PR',exact:true}).click();await page.getByRole('heading',{name:'PR',exact:true}).waitFor();
if(errors.length)throw Error(errors.join('\n'));console.log('PASS: responsive layout, 5 independent phones, dialogs, navigation, no JS errors.');await browser.close();

