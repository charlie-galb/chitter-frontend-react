import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import axios from "axios";

import NewPeepForm from './NewPeepForm.js';
import { UserContext } from '../../contexts/UserContext.js';

const mockContext = {
  userHandle: "Test Person",
  userId: "1",
  currentSessionKey: "_2a_12_A9rsHFpqa9xB0k_lIdNlH_"
};

const retrievePeeps = jest.fn();

const ui = <UserContext.Provider value={mockContext}>
            <NewPeepForm retrievePeeps={retrievePeeps}/>
          </UserContext.Provider>

axios.post = jest.fn();

describe('NewPeepForm', () => {
  it('submits the correct info to the api', async () => {
    const { getByText, getByTestId } = render(ui);
    fireEvent.change(getByTestId("peep-body-text-input"), {target: {value: 'This peep is for test purposes' }});
    await act(async () => {
      fireEvent.click(getByText('Post peep'))
    });
    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/peeps`, {"peep": {"user_id":"1", "body":"This peep is for test purposes"}}, 
      {"headers": { 'Authorization': `${mockContext.currentSessionKey}`}});
 });
});
 

