import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import axios from "axios";
import LoginForm from './LoginForm.js';
import { UserContext } from '../../contexts/UserContext.js';

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

 it('submits the correct info to the api', () => {
    const mockContext = {
      storeUserHandleInContext: jest.fn(),
      storeUserIdInContext: jest.fn(),
      storeCurrentSessionKeyInContext: jest.fn()
    }
    const axiosSpy = jest.spyOn(axios, "post")
    const { getByText, getByTestId } = render(<UserContext.Provider value={mockContext}><LoginForm /></UserContext.Provider>);
    fireEvent.change(getByTestId("log-in-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("log-in-password-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axiosSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {"session": {"handle":"test handle", "password":"test password"}})
 })