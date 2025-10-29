import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

test('renders Google login button', () => {
  render(<LoginPage />);
  const loginButton = screen.getByRole('button', { name: /login with google/i });
  expect(loginButton).toBeInTheDocument();
});
