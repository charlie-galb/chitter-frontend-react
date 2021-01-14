import React from 'react';
import { render, screen } from "@testing-library/react";
import Peep from './Peep.js';

 describe("PeepList", () => {

    const mockPeepData = {
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
  
  test('renders without crashing', () => {
    const peep = render(<Peep key='1' peepData={mockPeepData}/>);
    screen.debug()
    expect(peep).toMatchSnapshot()
  });

 }) 