import React from 'react';
import { render } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './Home.js';
import UserContextProvider from '../../contexts/UserContext.js';

test('renders without crashing', () => {
    const app = render(<UserContextProvider><Router><Home /></Router></UserContextProvider>);
    expect(app.getByTestId("home-h1").textContent).toBe("Welcome to Chitter!");
    expect(app.getByTestId("home-h2").textContent).toBe("Please log in below");
});
