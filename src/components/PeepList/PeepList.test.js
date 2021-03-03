import React from 'react';
import {render} from '@testing-library/react';
import { UserContext } from '../../contexts/UserContext.js';
import PeepList from './PeepList.js';

 describe("Peeplist", () => {

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
        
        "id": 1,
        "user_id": 2
      }]
  }

  const mockContext = {
    userId: "1",
    currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_"
  }

  const retrievePeeps = jest.fn()
  
  test('renders without crashing', () => {
    const peepList = render(<UserContext.Provider value={mockContext} ><PeepList retrievePeeps={retrievePeeps}/></UserContext.Provider>);
    expect(peepList).toMatchSnapshot()
  });
}) 