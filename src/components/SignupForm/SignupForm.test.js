import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import axios from "axios";
import SignupForm from './SignupForm.js';
import UserContextProvider from '../../contexts/UserContext.js';

beforeAll(() => {
    jest.mock("axios")
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

afterEach(cleanup)

 it('submits the correct info to the api', async () => {
    let axiosSpy = jest.spyOn(axios, "post")
    const { getByText, getByTestId } = render(<UserContextProvider><SignupForm /></UserContextProvider>);
    fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
    fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axiosSpy).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/users", {"user": {"handle":"test handle", "password":"test password"}})
 })