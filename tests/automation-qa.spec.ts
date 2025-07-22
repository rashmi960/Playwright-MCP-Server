import { test, expect, Page } from '@playwright/test';

// Helper to maximize window (Playwright sets viewport by default, so we set it to null for full screen)
test.use({ viewport: null });

test.describe('Automation QA Scenarios', () => {
  test('1. Open Chrome, maximize, and navigate to Google', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
  });

  test('2. Launch the-internet.herokuapp.com', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('3. Dropdown: select Option2 and navigate back', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('text=Dropdown');
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
    await page.goBack();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
  });

  test('4. Inputs: enter sample number', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/inputs');
    const input = page.locator('input[type="number"]');
    await input.fill('12345');
    await expect(input).toHaveValue('12345');
  });

  test('5. Shadow DOM: get all elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/shadowdom');
    // The visible text content
    const heading = await page.locator('h1').textContent();
    const paragraphs = await page.locator('div#content > p').allTextContents();
    const listItems = await page.locator('li').allTextContents();
    expect(heading).toContain('Simple template');
    expect(paragraphs.length).toBeGreaterThan(0);
    expect(listItems.length).toBeGreaterThan(0);
  });

  test('6. Nested Frames: go to bottom frame and return', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    // Switch to frame-bottom
    const frame = page.frame({ name: 'frame-bottom' });
    expect(frame).not.toBeNull();
    const bodyText = await frame?.locator('body').textContent();
    expect(bodyText).toContain('BOTTOM');
    // No explicit return needed, next test will use main frame
  });

  test('7. Hovers: hover over user1 and click profile', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const user1 = page.locator('.figure').first();
    await user1.hover();
    await user1.locator('a').click();
    await expect(page).toHaveURL(/users\/1/);
  });

  test('8. Windows: open new window and get title', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('text=Click Here'),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('New Window');
  });
});
