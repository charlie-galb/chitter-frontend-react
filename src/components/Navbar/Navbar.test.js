import React from 'react';
import ReactDOM from 'react-dom';
import { render} from "@testing-library/react"
import { getByTestId } from "@testing-library/dom"
import Navbar from './Navbar.js';

describe("PeepList", () => {
  
  test('renders without crashing', () => {
    const navbar = render(<Navbar />);
    expect(navbar.getByTestId("sign-up-link").textContent).toBe("Sign up");
  });

 }) 