import React from 'react';
import {fireEvent, act} from '@testing-library/react';

import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import { UserContext } from '../../contexts/UserContext.js';
import Navbar from './Navbar.js';

const mockContext = {
  currentSessionKey: "",
  storeUserHandleInContext: jest.fn(),
  storeUserIdInContext: jest.fn(),
  storeCurrentSessionKeyInContext: jest.fn()
}

const ui = <UserContext.Provider value={mockContext}>
            <Navbar />
          </UserContext.Provider>


describe("Navbar", () => {
  test('does not render the log out link if user is not signed in', async () => {
    const { queryByText, history } = renderWithRouter(ui, '/sign_up')
    expect(queryByText(/Log out/)).toBeNull();
    expect(history.location.pathname).toEqual('/sign_up')
  });
  test('clicking logout resets session-related state and redirects to home', async () => {
    mockContext.currentSessionKey = "A_valid_session_key"
    const { getByText, history } = renderWithRouter(ui, '/sign_up')
    await act(async () => {
      const link = getByText('Log out')
      fireEvent.click(link)
    });
    expect(mockContext.storeUserHandleInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeUserIdInContext).toHaveBeenCalledWith('')
    expect(mockContext.storeCurrentSessionKeyInContext).toHaveBeenCalledWith('')
    expect(history.location.pathname).toEqual('/')
  });
  test('Logo element links to home', async () => {
    const { getByTestId, history } = renderWithRouter(ui, '/sign_up')
      await act(async () => {
        const link = getByTestId('nav-logo')
        fireEvent.click(link)
      });
      expect(history.location.pathname).toEqual('/')
  });
 }) 