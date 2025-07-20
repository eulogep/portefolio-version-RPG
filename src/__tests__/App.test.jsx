import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '../i18n';

test('renders portfolio owner name', () => {
  render(<App />);
  expect(screen.getAllByText(/Euloge Mabiala/i).length).toBeGreaterThan(0);
}); 