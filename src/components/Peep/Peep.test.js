import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.js';
import Peep from './Peep.js';

afterAll(() => {
  jest.resetAllMocks()
})

 describe("Peep", () => {

  const mockContext = {
    userId: 1,
    currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_"
  }

  const mockPeepData = {
      "id": 3,
      "body": "my first peep :)",
      "created_at": "2018-01-23T13:21:23.317Z",
      "updated_at": "2018-01-23T13:21:23.317Z",
      "user": {
        "id": 1,
        "handle": "kay"
      },
      "likes": [{
        "id": 1,
        "user_id": 2
      }]
  }

  const retrievePeeps = jest.fn()
  const axiosPutSpy = jest.spyOn(axios, "put")
  const axiosDeleteSpy = jest.spyOn(axios, "delete")
  
  test('renders without crashing', () => {
    const peep = render(<UserContext.Provider value={mockContext}><Peep key='1' peepData={mockPeepData}/></UserContext.Provider>);
    expect(peep).toMatchSnapshot()
  });

  test('the current user can delete it', async () => {
    const { getByTestId } = render(<UserContext.Provider value={mockContext}><Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/></UserContext.Provider>);
    await fireEvent.click(getByTestId('delete-icon'))
    expect(axiosDeleteSpy).toHaveBeenCalled()
    expect(retrievePeeps).toHaveBeenCalledTimes(1)
  });

  test("the current user can't like their own post", () => {
    const { queryByTestId } = render(<UserContext.Provider value={mockContext}><Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/></UserContext.Provider>);
    expect(queryByTestId(/like-icon/)).toBeNull();
  })

  test("users can like someone else's post", async () => {
    mockContext.userId = 3
    const { getByTestId } = render(
    <UserContext.Provider value={mockContext}>
      <Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/>
    </UserContext.Provider>
    );

    await fireEvent.click(getByTestId('like-icon'))

    expect(axiosPutSpy).toHaveBeenCalledTimes(1)
    expect(retrievePeeps).toBeCalledTimes(1)
  });

  test('users can unlike a post', async () => {
    mockContext.userId = 2
    const { getByTestId } = render(
    <UserContext.Provider value={mockContext}>
      <Peep retrievePeeps={retrievePeeps} key='1' peepData={mockPeepData}/>
      </UserContext.Provider>
      )
    await fireEvent.click(getByTestId('unlike-icon'))
    expect(axiosDeleteSpy).toHaveBeenCalled()
    expect(retrievePeeps).toHaveBeenCalledTimes(1)
  });
}) 