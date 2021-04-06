import React from 'react';
import {render} from '@testing-library/react';

import { UserContext } from '../../contexts/UserContext.js';
import PeepList from './PeepList.js';

 describe("Peeplist", () => {

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