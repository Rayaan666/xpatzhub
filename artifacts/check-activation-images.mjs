import {chromium} from '@playwright/test';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const p=await b.newPage();
await p.goto('http://localhost:5110/community');
console.log(await p.evaluate(async()=>Promise.all(['connect','activate','experience'].map(async name=>{const i=new Image();i.src=`/assets/community-activation/${name}.webp`;await i.decode();return [name,i.naturalWidth,i.naturalHeight];}))));
await b.close();
