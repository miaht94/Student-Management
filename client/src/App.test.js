import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const input = screen.getByTestId('Home')
  expect(input).toBeInTheDocument();
});
test('renders abbc react link', () => {
  render(<App />);
  const button = screen.getByTestId('showSideBar');
  fireEvent.click(button);
  const navBar = screen.getByTestId('navmenu');
  expect(navBar.offsetLeft).toBeGreaterThanOrEqual(0);
});


