import React from 'react';
import ReactDOM from 'react-dom';
import PeepList from './PeepList.js';

test('renders without crashing', () => {
  const peepListContainer = document.createElement("div");
  ReactDOM.render(<PeepList />, peepListContainer);
  expect(peepListContainer.querySelector("p").textContent).toBe("OneTwoThree");
});