import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext.js';
import Navbar from './Navbar.js';

describe("Navbar", () => {

  const mockContext = {
    storeUserHandleInContext: jest.fn(),
    storeUserIdInContext: jest.fn(),
    storeCurrentSessionKeyInContext: jest.fn()
  }
  
  test('renders without crashing', () => {
    const navbar = render(<UserContext.Provider value={mockContext}><Router><Navbar /></Router></UserContext.Provider>);
    expect(navbar.getByTestId("log-out-link").textContent).toBe("Log out");
    expect(mockContext.storeUserHandleInContext).not.toHaveBeenCalled()
    expect(mockContext.storeUserIdInContext).not.toHaveBeenCalled()
    expect(mockContext.storeCurrentSessionKeyInContext).not.toHaveBeenCalled()
  });

  test('resets session-related state', async () => {
    const { getByText } = render(<UserContext.Provider value={mockContext}><Router><Navbar /></Router></UserContext.Provider>);
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    expect(mockContext.storeUserHandleInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeUserIdInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeCurrentSessionKeyInContext).toHaveBeenCalledWith('')
  });


 }) 