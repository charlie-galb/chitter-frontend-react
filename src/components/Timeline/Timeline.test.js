import React from 'react';
import { render } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import Timeline from './Timeline.js';
import UserContextProvider from '../../contexts/UserContext.js';

test('renders without crashing', () => {
    const app = render(<UserContextProvider><Router><Timeline /></Router></UserContextProvider>);
    expect(app.getByTestId("timeline-h2").textContent).toBe("Timeline");
});