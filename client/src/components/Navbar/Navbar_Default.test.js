import { render, screen, fireEvent } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Navbar from './Navbar';
test('renders learn react link', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    let result = screen.getByTestId('navmenu');
    expect(result.tagName).toBe('NAV');
  });