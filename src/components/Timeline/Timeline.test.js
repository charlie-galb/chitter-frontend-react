import React from 'react';
import axios from "axios";
import { render } from "@testing-library/react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Timeline from './Timeline.js';
import { UserContext } from '../../contexts/UserContext.js';

describe("Timeline", () => {

    const mockResponse = { data: [{"id": 3,
        "body": "my first peep :)",
        "created_at": "2018-01-23T13:21:23.317Z",
        "updated_at": "2018-01-23T13:21:23.317Z",
        "user": {
          "id": 1,
          "handle": "kay"
        },
        "likes": [{
          "id": 1,
          "user_id": 2
        }]
    }]
    }
  
    const mockContext = {
      userId: "1",
      currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_",
      userHandle: "Test Person"
    }

    axios.get = jest.fn()

    test('renders without crashing', () => {
        const timeline = render(<UserContext.Provider value={mockContext}><Router><Timeline /></Router></UserContext.Provider>);
        expect(timeline.getByTestId("timeline-h2").textContent).toBe("Timeline");
        expect(timeline.queryByTestId('timeline-redirect-to-home')).toBeNull()
        expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/peeps`, {"headers": {"authorization": mockContext.currentSessionKey}})
    });
    
    test('redirects to home if no current session key', () => {
        mockContext.currentSessionKey = ""
        const { 
          container, 
        } = render(<UserContext.Provider value={mockContext}>
            <Router>
              <Timeline />
              <Route path='/'>home</Route>
            </Router>
          </UserContext.Provider>);
        expect(container).toHaveTextContent(/home/)
    });
})