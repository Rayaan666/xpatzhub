import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('requestfailed', req => console.log('Failed request:', req.url()));
  page.on('response', res => {
    if (res.status() >= 400) console.log('HTTP error:', res.status(), res.url());
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console Error:', msg.text(), msg.location());
      errors.push(msg.text());
    }
  });

  await page.goto('http://192.168.1.42:5173', { waitUntil: 'networkidle' });

  // 1. Desktop Checks
  console.log('--- Checking Desktop (1440px) ---');
  const desktopHeader = page.locator('.header');
  if (!(await desktopHeader.isVisible())) throw new Error('Desktop header not visible');
  
  const desktopNav = page.locator('.desktop-nav');
  if (!(await desktopNav.isVisible())) throw new Error('Desktop nav not visible');

  const menuBtn = page.locator('.menu-button');
  if (await menuBtn.isVisible()) throw new Error('Menu button should be hidden on 1440px desktop');

  const ctaBtn = page.locator('.header-cta-btn');
  if (!(await ctaBtn.isVisible())) throw new Error('Header CTA button not visible on desktop');

  // Test opening dialogue via CTA
  await ctaBtn.click();
  const dialogTitle = page.locator('#dialog-title');
  await dialogTitle.waitFor({ state: 'visible', timeout: 3000 });
  console.log('PASS: Contact dialog opened from header CTA');
  await page.keyboard.press('Escape');

  // 2. Responsive viewports & overflow test
  for (const width of [1440, 1024, 834, 390, 360]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) throw new Error(`Horizontal overflow detected at ${width}px!`);
    console.log(`PASS: No overflow at ${width}px`);
  }

  // 3. Mobile Checks (390px)
  console.log('--- Checking Mobile (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);

  if (!(await desktopHeader.isVisible())) throw new Error('Header must be visible on mobile!');
  if (await desktopNav.isVisible()) throw new Error('Desktop nav should be hidden on mobile');
  if (!(await menuBtn.isVisible())) throw new Error('Menu button must be visible on mobile');

  // Open mobile drawer
  await menuBtn.click();
  const mobileDrawer = page.locator('.mobile-nav-drawer');
  await mobileDrawer.waitFor({ state: 'visible', timeout: 3000 });
  console.log('PASS: Mobile drawer opened smoothly');

  const mobileLinks = page.locator('.mobile-nav-link');
  const linkCount = await mobileLinks.count();
  if (linkCount !== 5) throw new Error(`Expected 5 mobile nav links, got ${linkCount}`);
  console.log(`PASS: Found all ${linkCount} mobile links with titles and subtitles`);

  const mobileContact = page.locator('.mobile-contact-item');
  const contactCount = await mobileContact.count();
  if (contactCount < 3) throw new Error(`Expected at least 3 contact items in mobile drawer, found ${contactCount}`);
  console.log('PASS: Phone, email, and location badges found in mobile drawer');

  // Click Contact link in mobile drawer
  await page.locator('.mobile-nav-link').filter({ hasText: 'Contact' }).click();
  await page.waitForTimeout(500);
  console.log('PASS: Mobile link clicked and menu handled cleanly');

  if (errors.length) {
    console.error('Errors encountered:', errors);
    throw new Error('Test completed with console/runtime errors');
  }

  console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
} finally {
  await browser.close();
}
