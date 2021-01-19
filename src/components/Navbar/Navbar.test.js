import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
    const { queryByTestId } = render(<UserContext.Provider value={mockContext}><MemoryRouter><Navbar /></MemoryRouter></UserContext.Provider>);
    expect(queryByTestId(/Log out/)).toBeNull();
  });

  test('clicking logout resets session-related state', async () => {
    mockContext.currentSessionKey = "A_valid_session_key"
    const { getByText } = render(<UserContext.Provider value={mockContext}><MemoryRouter><Navbar /></MemoryRouter></UserContext.Provider>);
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    fireEvent.click(getByText('Log out'))
    expect(mockContext.storeUserHandleInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeUserIdInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeCurrentSessionKeyInContext).toHaveBeenCalledWith('')
  });

  test('Logo element links to home', () => {
    const { getByTestId } = render(<UserContext.Provider value={mockContext}><MemoryRouter><Navbar /></MemoryRouter></UserContext.Provider>);
    fireEvent.click(getByTestId('navbar-logo-link'));
    expect(global.window.location.pathname).toEqual('/')
  });


 }) 