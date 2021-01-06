import React from 'react';
import { render } from "@testing-library/react";
import App from './App';

test('renders without crashing', () => {
    const app = render(<App />);
    expect(app.getByTestId("sign-up-link").textContent).toBe("Sign up");
});
