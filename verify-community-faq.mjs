import { chromium } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = 5104;
const vite = spawn('npm.cmd', ['run', 'preview', '--', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  shell: true,
});

// Wait for server to start
await new Promise((resolve) => {
  vite.stdout.on('data', (d) => {
    const s = d.toString();
    if (s.includes('http://') || s.includes('Local:')) resolve();
  });
  setTimeout(resolve, 3500);
});

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

try {
  const widths = [1672, 1440, 1024, 834, 767, 390, 320];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:${PORT}/community`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const section = page.locator('#community-faq');
    await section.waitFor({ state: 'visible' });
    await section.scrollIntoViewIfNeeded();

    // Ensure image is loaded
    const photo = section.locator('.community-faq-photo-frame img');
    await photo.evaluate(async (img) => {
      img.loading = 'eager';
      if (!img.complete) await new Promise((res) => { img.onload = res; img.onerror = res; });
      if (img.decode) await img.decode().catch(() => {});
    });

    // Check horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) throw new Error(`Horizontal overflow detected at viewport ${width}px`);

    // Verify 10 FAQ questions
    const questionButtons = section.locator('.community-faq-trigger');
    const count = await questionButtons.count();
    if (count !== 10) throw new Error(`Expected 10 FAQ questions, got ${count} at ${width}px`);

    // Verify image loading
    const imgOk = await photo.evaluate((img) => img.complete && img.naturalWidth > 0);
    if (!imgOk) throw new Error(`Noticeboard photograph failed to load at ${width}px`);

    // Screenshot section
    await section.screenshot({
      path: `artifacts/community-faq-${width}.png`,
      style: '.header { visibility: hidden !important; }',
    });
  }

  // Interactive tests at 1440px
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${PORT}/community`, { waitUntil: 'networkidle' });

  const firstBtn = page.locator('#comm-faq-btn-comm-faq-01');
  const firstPanel = page.locator('#comm-faq-panel-comm-faq-01');

  // Verify initial closed state
  if ((await firstBtn.getAttribute('aria-expanded')) !== 'false') {
    throw new Error('FAQ 01 should be closed initially');
  }

  // Click to open
  await firstBtn.click();
  await firstPanel.waitFor({ state: 'visible' });
  if ((await firstBtn.getAttribute('aria-expanded')) !== 'true') {
    throw new Error('FAQ 01 should have aria-expanded="true" after click');
  }

  // Check answer content
  const answerText = await firstPanel.locator('.community-faq-answer-p').textContent();
  if (!answerText.includes('XPATZHUB helps brands connect with relevant audiences')) {
    throw new Error(`FAQ 01 answer content mismatch: ${answerText}`);
  }

  // Take screenshot with FAQ 01 open
  await page.locator('#community-faq').screenshot({
    path: 'artifacts/community-faq-open-1440.png',
    style: '.header { visibility: hidden !important; }',
  });

  // Click again to close
  await firstBtn.click();
  await firstPanel.waitFor({ state: 'hidden' });
  if ((await firstBtn.getAttribute('aria-expanded')) !== 'false') {
    throw new Error('FAQ 01 should be closed after second click');
  }

  // Verify Still Curious card
  const stillCurious = page.locator('.community-faq-still-curious');
  if ((await stillCurious.count()) !== 1) throw new Error('Missing Still Curious card');

  // Verify isolation: homepage does not have community-faq
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  if ((await page.locator('#community-faq').count()) !== 0) {
    throw new Error('Community FAQ leaked onto Homepage!');
  }

  // Verify SEO page intact
  await page.goto(`http://127.0.0.1:${PORT}/seo-digital-marketing`, { waitUntil: 'networkidle' });
  if ((await page.locator('.seo-hero').count()) === 0) {
    throw new Error('SEO page corrupted');
  }

  console.log('ALL VERIFICATION CHECKS PASSED!');
} catch (err) {
  errors.push(err.message);
} finally {
  await browser.close();
  vite.kill();
  if (errors.length) {
    console.error('VERIFICATION ERRORS:\n' + errors.join('\n'));
    process.exit(1);
  }
}
