import { describe, it, expect, test } from 'vitest';
import { render, screen } from "@testing-library/react";
import App from "./../App";
describe('App', () => {
  test('titre existe', () => {
    render(<App />)
    // screen.getByRole('')
    // const ti = screen.getByText('titre')
    // expect(ti).toBeInTheDocument()
  });
});