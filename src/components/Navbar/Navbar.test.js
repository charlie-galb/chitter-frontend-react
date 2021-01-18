import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext.js';
import Navbar from './Navbar.js';

describe("Navbar", () => {

  const mockContext = {
    currentSessionKey: "",
    storeUserHandleInContext: jest.fn(),
    storeUserIdInContext: jest.fn(),
    storeCurrentSessionKeyInContext: jest.fn()
  }
  
  test('does not render the log out link if user is not signed in', () => {
    const { queryByTestId } = render(<UserContext.Provider value={mockContext}><Router><Navbar /></Router></UserContext.Provider>);
    expect(queryByTestId(/Log out/)).toBeNull();
  });

  test('resets session-related state', async () => {
    mockContext.currentSessionKey = "A_valid_session_key"
    const { getByText } = render(<UserContext.Provider value={mockContext}><Router><Navbar /></Router></UserContext.Provider>);
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    expect(mockContext.storeUserHandleInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeUserIdInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeCurrentSessionKeyInContext).toHaveBeenCalledWith('')
  });


 }) 