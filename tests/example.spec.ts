import { test, expect } from '@playwright/test';
import { drawCustomGrid } from '../utils/imageUtils';

const screenshotPath = 'screenshot.png';
const outputPath = 'screenshot_with_grid.png';

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');

  await page.screenshot({ path: screenshotPath });


 const imageWithGrid = await drawCustomGrid(screenshotPath, outputPath);

    // // Optionally, save the image to a file
    // const fs = require('fs');
    // fs.writeFileSync(outputPath, imageWithGrid);

    console.log(`Image with grid saved to ${outputPath}`);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
