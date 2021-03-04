import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import axios from "axios";
import SignupForm from './SignupForm.js';
import { UserContext } from '../../contexts/UserContext.js';

beforeAll(() => {
    jest.mock("axios")
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

afterEach(cleanup)

 it('submits the correct info to the api', () => {
    let axiosSpy = jest.spyOn(axios, "post")
    const mockContext = {
      storeUserHandleInContext: jest.fn(),
      storeUserIdInContext: jest.fn(),
      storeCurrentSessionKeyInContext: jest.fn()
    }
    const { getByText, getByTestId } = render(<UserContext.Provider value={mockContext}><SignupForm /></UserContext.Provider>);
    fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
    fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axiosSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/users`, {"user": {"handle":"test handle", "password":"test password"}})
 })