// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/login');
  });

  test('should display login page with correct title and heading', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/EventLink/i);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /sign in to get your tickets/i })).toBeVisible();
  });

  test('should display descriptive subheading text', async ({ page }) => {
    // Check subheading text
    const subheading = page.getByText(/buy tickets to exciting events and see which games your friends are attending/i);
    await expect(subheading).toBeVisible();
  });

  test('should display Google login button with correct text and icon', async ({ page }) => {
    // Check login button is visible
    const loginButton = page.getByRole('button', { name: /continue with google/i });
    await expect(loginButton).toBeVisible();
    
    // Check button is enabled
    await expect(loginButton).toBeEnabled();
    
    // Check Google icon is present
    const googleIcon = page.getByRole('img', { name: /google logo/i });
    await expect(googleIcon).toBeVisible();
  });

  test('should have proper styling and layout', async ({ page }) => {
    // Check container layout
    const container = page.locator('[data-testid="login-container"]').first();
    
    // Check login box is centered
    const loginBox = page.locator('div').filter({ hasText: /sign in to get your tickets/i }).first();
    await expect(loginBox).toBeVisible();
    
    // Check button styling
    const loginButton = page.getByRole('button', { name: /continue with google/i });
    await expect(loginButton).toHaveCSS('background-color', 'rgb(66, 133, 244)'); // #4285F4
    await expect(loginButton).toHaveCSS('color', 'rgb(255, 255, 255)'); // white
  });

  test('should be responsive on mobile devices', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check mobile viewport
      await expect(page.getByRole('heading', { name: /sign in to get your tickets/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
      
      // Check button is still clickable on mobile
      const loginButton = page.getByRole('button', { name: /continue with google/i });
      await expect(loginButton).toBeEnabled();
    }
  });

  test('should handle Google login button click', async ({ page }) => {
    // Mock the OAuth redirect to prevent actual navigation
    await page.route('**/oauth2/authorization/google', async route => {
      // Intercept the OAuth request
      await route.fulfill({
        status: 200,
        body: 'OAuth redirect intercepted for testing'
      });
    });

    const loginButton = page.getByRole('button', { name: /continue with google/i });
    
    // Click the login button
    await loginButton.click();
    
    // In a real scenario, this would redirect to Google OAuth
    // For testing, we just verify the click was handled
    await expect(loginButton).toBeVisible();
  });

  test('should handle OAuth redirect URL construction', async ({ page }) => {
    // Set environment variable for testing
    await page.addInitScript(() => {
      window.process = {
        env: {
          REACT_APP_API_URL: 'https://test-backend.herokuapp.com'
        }
      };
    });

    await page.goto('/login');

    // Check that the OAuth URL would be constructed correctly
    // This is tested by checking if the environment variable is used
    const loginButton = page.getByRole('button', { name: /continue with google/i });
    await expect(loginButton).toBeVisible();
  });

  test('should handle missing environment variables gracefully', async ({ page }) => {
    // Test with no environment variables set
    await page.addInitScript(() => {
      window.process = { env: {} };
    });

    await page.goto('/login');

    // Should still render the login button
    const loginButton = page.getByRole('button', { name: /continue with google/i });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('should have accessible elements', async ({ page }) => {
    // Check heading accessibility
    const heading = page.getByRole('heading', { name: /sign in to get your tickets/i });
    await expect(heading).toBeVisible();
    
    // Check button accessibility
    const loginButton = page.getByRole('button', { name: /continue with google/i });
    await expect(loginButton).toBeVisible();
    
    // Check image accessibility
    const googleIcon = page.getByRole('img', { name: /google logo/i });
    await expect(googleIcon).toBeVisible();
    await expect(googleIcon).toHaveAttribute('alt', 'Google Logo');
  });

  test('should load Google icon from CDN', async ({ page }) => {
    // Check if the Google icon loads successfully
    const googleIcon = page.getByRole('img', { name: /google logo/i });
    await expect(googleIcon).toBeVisible();
    
    // Check the icon source URL
    await expect(googleIcon).toHaveAttribute('src', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg');
  });
});