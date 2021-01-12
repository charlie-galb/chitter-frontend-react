import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import axios from "axios";
import LoginForm from './LoginForm.js';
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
    const { getByText, getByTestId } = render(<UserContextProvider><LoginForm /></UserContextProvider>);
    fireEvent.change(getByTestId("log-in-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("log-in-password-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axiosSpy).toHaveBeenCalledWith("https://chitter-backend-api-v2.herokuapp.com/sessions", {"session": {"handle":"test handle", "password":"test password"}})
 })