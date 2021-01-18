import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';
import Peep from './Peep.js';

 describe("Peep", () => {

  const mockContext = {
    userId: "1",
    currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_"
  }

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

  const retrievePeeps = jest.fn()
  
  test('renders without crashing', () => {
    const peep = render(<UserContext.Provider value={mockContext}><Peep key='1' peepData={mockPeepData}/></UserContext.Provider>);
    expect(peep).toMatchSnapshot()
  });

  test('users can delete it', () => {
    let axiosSpy = jest.spyOn(axios, "delete")
    const { getByText } = render(<UserContext.Provider value={mockContext}><Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/></UserContext.Provider>);
    fireEvent.click(getByText('Delete'))
    expect(axiosSpy).toHaveBeenCalledWith(`https://chitter-backend-api-v2.herokuapp.com/peeps/${mockPeepData.id}`, 
    {headers: {
          Authorization: `Token ${mockContext.currentSessionKey}` 
        }})
  });

  test('users can like it', () => {
    let axiosSpy = jest.spyOn(axios, "put")
    const { getByText, getByTestId } = render(<UserContext.Provider value={mockContext}><Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/></UserContext.Provider>);
    fireEvent.click(getByText('Like'))
    expect(axiosSpy).toHaveBeenCalledWith(`https://chitter-backend-api-v2.herokuapp.com/peeps/${mockPeepData.id}/likes/${mockContext.userId}`, 
    {params: {}},
    {headers: {
      Authorization: `Token ${mockContext.currentSessionKey}` 
    }})
    setTimeout(() => { expect(getByTestId('like-count').textContent).toBe("Liked by 2"); }, 0)
  });

 }) 