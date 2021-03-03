import React from 'react';
import axios from "axios";
import { render } from "@testing-library/react";
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import Timeline from './Timeline.js';
import {UserContext} from '../../contexts/UserContext.js';

describe("Timeline", () => {

    const mockPeepData = {
        "id": 3,
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
    }
  
    const mockContext = {
      userId: "1",
      currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_",
      userHandle: "Test Person"
    }

    const axiosSpy = jest.spyOn(axios, "get")

    test('renders without crashing', () => {
        const timeline = render(<UserContext.Provider value={mockContext}><Router><Timeline /></Router></UserContext.Provider>);
        expect(timeline.getByTestId("timeline-h2").textContent).toBe("Timeline");
        expect(timeline.queryByTestId('timeline-redirect-to-home')).toBeNull()
        expect(axiosSpy).toHaveBeenCalledWith(`${process.env.BACKEND_URL}/peeps`, {"headers": {"authorization": mockContext.currentSessionKey}})
    });
    
    test('redirects to home if no current session key', () => {
        mockContext.currentSessionKey = ""
        const timeline = render(<UserContext.Provider value={mockContext}><Router><Timeline /></Router></UserContext.Provider>);
        setTimeout(() => { expect(timeline.queryByTestId('timeline-redirect-to-home').toBe(<Redirect to="/" />)); }, 0)
    });
})