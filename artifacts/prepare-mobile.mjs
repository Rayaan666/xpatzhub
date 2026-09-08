import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
for (const width of [768, 834, 1440]) {
  await page.setViewportSize({ width, height: 1050 });
  await page.screenshot({ path: `artifacts/before-mobile-${width}.png` });
}
const phones = {
  main: [[798,140],[1080,62],[1380,740],[1055,829]],
  events: [[547,190],[800,104],[959,493],[699,580]],
  digital: [[1054,16],[1312,-65],[1528,348],[1245,435]],
  pr: [[616,611],[882,527],[1044,942],[751,1033]],
  community: [[1290,425],[1536,340],[1727,799],[1476,891]],
};
for (const [id, points] of Object.entries(phones)) {
  const data = await page.evaluate(async ({ id, points }) => {
    const img = new Image(); img.src = '/assets/reference.webp'; await img.decode();
    const source = document.createElement('canvas'); source.width = img.width; source.height = img.height;
    const ctx = source.getContext('2d'); ctx.drawImage(img, 0, 0);
    const pixels = ctx.getImageData(0,0,img.width,img.height).data;
    const out = document.createElement('canvas'); out.width = id === 'main' ? 600 : 440; out.height = id === 'main' ? 1260 : 880;
    const dest = out.getContext('2d'); const result = dest.createImageData(out.width,out.height);
    for(let y=0;y<out.height;y++) for(let x=0;x<out.width;x++) {
      const u=x/(out.width-1),v=y/(out.height-1);
      const sx=Math.round((1-v)*((1-u)*points[0][0]+u*points[1][0])+v*((1-u)*points[3][0]+u*points[2][0]));
      const sy=Math.round((1-v)*((1-u)*points[0][1]+u*points[1][1])+v*((1-u)*points[3][1]+u*points[2][1]));
      const a=(y*out.width+x)*4;
      if(sx>=0&&sx<img.width&&sy>=0&&sy<img.height){const b=(sy*img.width+sx)*4;result.data.set(pixels.subarray(b,b+4),a);}
      else {result.data.set([2,7,12,255],a);}
    }
    dest.putImageData(result,0,0); return out.toDataURL('image/webp',.88).split(',')[1];
  }, { id, points });
  await writeFile(`public/assets/mobile-${id}.webp`, Buffer.from(data,'base64'));
}
await browser.close();
