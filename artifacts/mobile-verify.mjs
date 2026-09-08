import {chromium} from '@playwright/test';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const p=await b.newPage({reducedMotion:'reduce'});
const results=[];
for(const width of [320,360,375,390,393,412,430,520,650,767,768,834,1440,1672]){
const height=width===1672?941:width===1440?900:width===834?1050:width===768?1024:844;
await p.setViewportSize({width,height});await p.goto('http://localhost:5175',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.locator('#home').screenshot({path:`artifacts/mobile-after-${width}.png`});
results.push(await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,phones:document.querySelectorAll('.mp-device').length,height:document.querySelector('#home').getBoundingClientRect().height})));
if(width>=768){if(!readFileSync(`artifacts/mobile-task-desktop-before-${width}.png`).equals(readFileSync(`artifacts/mobile-after-${width}.png`)))console.log('Desktop PNG bytes differ; compare pixels '+width);}
}
for(const [file,hash] of Object.entries(JSON.parse(readFileSync('artifacts/mobile-approved-hashes.json')))){if(createHash('sha256').update(readFileSync(file)).digest('hex')!==hash)throw Error('Protected file changed '+file);}
console.log(JSON.stringify(results));await b.close();

