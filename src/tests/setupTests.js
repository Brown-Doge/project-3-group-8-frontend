import '@testing-library/jest-dom';
import 'whatwg-fetch';

// src/tests/setupTests.js
// Test setup for Jest + React Testing Library

// Adds custom jest matchers from @testing-library/jest-dom

// Polyfill fetch in the test environment (useful for tests that call fetch)

// Ensure consistent timezone for snapshot/Date-related tests
process.env.TZ = 'UTC';

// Optional: suppress noisy React "act" warnings when deliberately testing async flows.
// Remove this block if you want to see all console errors during tests.
const _consoleError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        const msg = typeof args[0] === 'string' ? args[0] : '';
        if (msg.includes('Warning: An update to')) {
            return;
        }
        _consoleError(...args);
    };
});
afterAll(() => {
    console.error = _consoleError;
});