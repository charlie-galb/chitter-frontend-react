import React from 'react';
import axios from "axios";

import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import Timeline from './Timeline.js';
import { UserContext } from '../../contexts/UserContext.js';

const mockContext = {
  userId: "1",
  currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_",
  userHandle: "Test Person"
}

axios.get = jest.fn()

const ui = <UserContext.Provider value={mockContext}>
            <Timeline />
          </UserContext.Provider>

describe("Timeline", () => {
    test('renders without crashing', () => {
      const { history, getByTestId, queryByTestId } = renderWithRouter(ui, '/timeline')
      expect(getByTestId("timeline-h2").textContent).toBe("Timeline");
      expect(queryByTestId('timeline-redirect-to-home')).toBeNull()
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BACKEND_URL}/peeps`, 
        {"headers": {"authorization": mockContext.currentSessionKey}}
        );
      expect(history.location.pathname).toEqual('/timeline')
    });
    test('redirects to home if no current session key', () => {
      mockContext.currentSessionKey = ""
      const { history } = renderWithRouter(ui, '/timeline')
      expect(history.location.pathname).toEqual('/')
    });
})