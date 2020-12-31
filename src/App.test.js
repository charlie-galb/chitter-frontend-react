import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders without crashing', () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);
  expect(root.querySelector("h1").textContent).toBe("This is the app div");
});
