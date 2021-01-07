import React from 'react';
import { render} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar.js';

describe("PeepList", () => {
  
  test('renders without crashing', () => {
    const navbar = render(<Router><Navbar /></Router>);
    expect(navbar.getByTestId("log-out-link").textContent).toBe("Log out");
  });

 }) 