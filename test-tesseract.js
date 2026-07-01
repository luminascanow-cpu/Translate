import { chromium } from 'playwright';
import fs from 'fs';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  await page.goto('http://localhost:3000');
  
  // Wait for React to load
  await page.waitForSelector('text=OCR', { timeout: 5000 });
  await page.click('text=OCR');
  
  // Create a dummy image
  const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync('dummy.png', buffer);
  
  // Upload it
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('button[title="Upload Photo"]').click()
  ]);
  await fileChooser.setFiles('dummy.png');
  
  // Wait for 10 seconds to see logs
  await page.waitForTimeout(10000);
  
  await browser.close();
})();
