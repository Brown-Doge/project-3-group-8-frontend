// src/tests/Simple.test.js

import { render, screen } from '@testing-library/react';
import React from 'react';

// A very simple test component
function TestComponent() {
  return <div>Hello, world!</div>;
}

test('renders hello world text', () => {
  render(<TestComponent />);
  const el = screen.getByText(/hello, world!/i);
  expect(el).toBeInTheDocument();
});
