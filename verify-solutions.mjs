import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1536, height: 1024 }, reducedMotion: 'reduce' });
if (process.argv.includes('--convert')) {
  const source = await readFile('design-references/solutions-reference.png');
  const data = await page.evaluate(async source => {
    const img = new Image(); img.src = `data:image/png;base64,${source}`; await img.decode();
    const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    return canvas.toDataURL('image/webp', .94).split(',')[1];
  }, source.toString('base64'));
  await writeFile('public/assets/solutions-reference.webp', Buffer.from(data, 'base64'));
}
await mkdir('artifacts', { recursive: true });
const errors = []; page.on('pageerror', error => errors.push(error.message));
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
if (await page.locator('.solution-panel').count() !== 3) throw new Error('Expected exactly three panels');
if (await page.locator('.solution-services li').count() !== 20) throw new Error('Expected all 20 services');
if (await page.locator('h1').count() !== 1) throw new Error('Hero H1 changed');
for (const width of [1536, 1280, 834, 390, 360]) {
  await page.setViewportSize({ width, height: 1024 });
  await page.locator('#solutions').scrollIntoViewIfNeeded();
  await page.locator('#solutions').screenshot({ path: `artifacts/solutions-${width}.png` });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Overflow at ${width}`);
  for (const panel of await page.locator('.solution-panel').all()) {
    const body = await panel.locator('.solution-body').boundingBox();
    const button = await panel.locator('.solution-cta').boundingBox();
    if (body.y + body.height > button.y) throw new Error(`Body overlaps CTA at ${width}`);
  }
}
for (const button of await page.locator('.solution-cta').all()) {
  await button.click(); await page.getByRole('heading', { name: 'Let’s grow your brand.' }).waitFor(); await page.keyboard.press('Escape');
}
if (errors.length) throw new Error(errors.join('\n'));
console.log('PASS: three panels, all 20 services, five responsive widths, no body/CTA overlap, working CTAs, no runtime errors, original H1 retained.');
await browser.close();
