import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import PeepList from './PeepList.js';

 describe("PeepList", () => {

  const mockPeepData = [
    {
      "id": 3,
      "body": "my first peep :)",
      "created_at": "2018-06-23T13:21:23.317Z",
      "updated_at": "2018-06-23T13:21:23.317Z",
      "user": {
        "id": 1,
        "handle": "kay"
      },
      "likes": [{
        "user": {
          "id": 1,
          "handle": "kay"
        }
      }]
    }
  ]
  

  test('renders without crashing', () => {
    const peepListContainer = document.createElement("div");
    ReactDOM.render(<PeepList peeps={mockPeepData}/>, peepListContainer);
    expect(peepListContainer.querySelector("p").textContent).toBe("my first peep :)");
  });

 }) 