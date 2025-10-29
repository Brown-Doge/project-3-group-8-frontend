// src/tests/HomePage.test.js

import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renders homepage welcoming message', () => {
  render(<HomePage />);
  const welcomeText = screen.getByText(/discover events & buy tickets/i);
  expect(welcomeText).toBeInTheDocument();
});

test('renders friends and ticket buying features', () => {
  render(<HomePage />);
  const feature1 = screen.getByText(/buy tickets easily/i);
  const feature2 = screen.getByText(/friends & social/i);
  expect(feature1).toBeInTheDocument();
  expect(feature2).toBeInTheDocument();
});
