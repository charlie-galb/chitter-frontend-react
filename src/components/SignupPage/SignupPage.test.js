import React from 'react';
import {fireEvent, act} from '@testing-library/react';

import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import { UserContext } from '../../contexts/UserContext.js';
import SignupPage from './SignupPage.js'

const mockContext = {
    currentSessionKey: "",
    storeUserHandleInContext: jest.fn(),
    storeUserIdInContext: jest.fn(),
    storeCurrentSessionKeyInContext: jest.fn()
  }
  
const ui = <UserContext.Provider value={mockContext}>
              <SignupPage />
            </UserContext.Provider>

describe('SignupPage', () => {
    test('Log-in-link element links to home', async () => {
        const { getByTestId, history } = renderWithRouter(ui, '/sign_up')
          await act(async () => {
            const link = getByTestId('log-in-link')
            fireEvent.click(link)
          });
          expect(history.location.pathname).toEqual('/')
      });
})