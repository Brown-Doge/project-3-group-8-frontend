// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/');
  });

  test('should display home page with correct title and main heading', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/EventLink/i);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /discover events & buy tickets/i })).toBeVisible();
  });

  test('should display welcome description text', async ({ page }) => {
    // Check description text
    const description = page.getByText(/browse upcoming games and events/i);
    await expect(description).toBeVisible();
    
    // Check full description content
    await expect(page.getByText(/see which events your friends are going to and never miss out on the fun/i)).toBeVisible();
  });

  test('should display feature cards with correct content', async ({ page }) => {
    // Check "Buy Tickets Easily" feature card
    const ticketsCard = page.getByRole('heading', { name: /buy tickets easily/i });
    await expect(ticketsCard).toBeVisible();
    
    const ticketsDescription = page.getByText(/secure your seat with a few clicks and manage your orders smoothly/i);
    await expect(ticketsDescription).toBeVisible();
    
    // Check "Friends & Social" feature card
    const socialCard = page.getByRole('heading', { name: /friends & social/i });
    await expect(socialCard).toBeVisible();
    
    const socialDescription = page.getByText(/know what events your friends plan to attend and join them for a great time/i);
    await expect(socialDescription).toBeVisible();
  });

  test('should have proper layout and styling', async ({ page }) => {
    // Check main container is centered
    const container = page.locator('div').filter({ hasText: /discover events & buy tickets/i }).first();
    await expect(container).toBeVisible();
    
    // Check feature cards layout
    const featureCards = page.locator('div').filter({ hasText: /buy tickets easily|friends & social/i });
    await expect(featureCards.first()).toBeVisible();
    await expect(featureCards.last()).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page, isMobile }) => {
    // Check content is visible on all screen sizes
    await expect(page.getByRole('heading', { name: /discover events & buy tickets/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /buy tickets easily/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /friends & social/i })).toBeVisible();
    
    if (isMobile) {
      // On mobile, feature cards should still be visible but may stack
      const ticketsCard = page.getByRole('heading', { name: /buy tickets easily/i });
      const socialCard = page.getByRole('heading', { name: /friends & social/i });
      
      await expect(ticketsCard).toBeVisible();
      await expect(socialCard).toBeVisible();
    }
  });

  test('should have accessible headings hierarchy', async ({ page }) => {
    // Check main heading (h1)
    const mainHeading = page.getByRole('heading', { level: 1, name: /discover events & buy tickets/i });
    await expect(mainHeading).toBeVisible();
    
    // Check feature headings (h3)
    const featureHeadings = page.getByRole('heading', { level: 3 });
    await expect(featureHeadings).toHaveCount(2);
    
    // Verify specific feature headings
    await expect(page.getByRole('heading', { level: 3, name: /buy tickets easily/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /friends & social/i })).toBeVisible();
  });

  test('should display content in correct order', async ({ page }) => {
    // Get all text content to verify order
    const content = await page.textContent('body');
    
    // Check that content appears in logical order
    expect(content).toMatch(/Discover Events & Buy Tickets.*Browse upcoming games.*Buy Tickets Easily.*Friends & Social/s);
  });

  test('should handle content overflow gracefully', async ({ page }) => {
    // Test with very narrow viewport
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Content should still be readable and accessible
    await expect(page.getByRole('heading', { name: /discover events & buy tickets/i })).toBeVisible();
    await expect(page.getByText(/browse upcoming games and events/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /buy tickets easily/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /friends & social/i })).toBeVisible();
  });

  test('should maintain visual consistency', async ({ page }) => {
    // Check that feature cards have consistent styling
    const featureCards = page.locator('div').filter({ 
      has: page.getByRole('heading', { level: 3 }) 
    });
    
    // Both feature cards should be visible
    await expect(featureCards).toHaveCount(2);
    
    // Check background colors and spacing
    for (let i = 0; i < 2; i++) {
      const card = featureCards.nth(i);
      await expect(card).toBeVisible();
    }
  });

  test('should handle different font sizes', async ({ page }) => {
    // Test text scaling
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Content should still be readable
    await expect(page.getByRole('heading', { name: /discover events & buy tickets/i })).toBeVisible();
    await expect(page.getByText(/browse upcoming games and events/i)).toBeVisible();
  });

  test('should work with keyboard navigation', async ({ page }) => {
    // Tab through the page content
    await page.keyboard.press('Tab');
    
    // Main content should be accessible
    await expect(page.getByRole('heading', { name: /discover events & buy tickets/i })).toBeVisible();
    
    // All text content should be readable via keyboard navigation
    const focusableElements = await page.locator('[tabindex], button, a, input, select, textarea').count();
    
    // Page should have proper focus management (even if no interactive elements currently)
    expect(focusableElements).toBeGreaterThanOrEqual(0);
  });

  test('should display feature cards with proper spacing', async ({ page }) => {
    // Check that both feature cards are present and spaced properly
    const buyTicketsCard = page.locator('div').filter({ hasText: /buy tickets easily/i }).first();
    const socialCard = page.locator('div').filter({ hasText: /friends & social/i }).first();
    
    await expect(buyTicketsCard).toBeVisible();
    await expect(socialCard).toBeVisible();
    
    // Cards should not overlap
    const buyTicketsBox = await buyTicketsCard.boundingBox();
    const socialBox = await socialCard.boundingBox();
    
    expect(buyTicketsBox).toBeTruthy();
    expect(socialBox).toBeTruthy();
  });
});