import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';

test('renders App without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
});

test('App matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
});