import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import axios from "axios";
import LoginForm from './LoginForm.js';
import { UserContext } from '../../contexts/UserContext.js';

afterAll(() => {
  jest.resetAllMocks()
})

const mockContext = {
  storeUserHandleInContext: jest.fn(),
  storeUserIdInContext: jest.fn(),
  storeCurrentSessionKeyInContext: jest.fn()
}

describe('LoginForm', () => {
  it('submits the correct info to the api', () => {
    const axiosSpy = jest.spyOn(axios, "post")
    const { getByText, getByTestId } = render(<UserContext.Provider value={mockContext}><LoginForm /></UserContext.Provider>);
    fireEvent.change(getByTestId("log-in-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("log-in-password-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axiosSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/sessions`, {"session": {"handle":"test handle", "password":"test password"}})
 })
 it('displays flash notice if server-side error is received', () => {
  axios.post = jest.fn().mockImplementation(() => {
    throw new Error('mock error');
  })
  const { container, getByText, getByTestId } = render(<UserContext.Provider value={mockContext}><LoginForm /></UserContext.Provider>);
  fireEvent.change(getByTestId("log-in-handle-input"), {target: {value: 'test handle' } } )
  fireEvent.change(getByTestId("log-in-password-input"), {target: {value: 'test password' } } )
  fireEvent.click(getByText('Submit'))
  expect(axios.post).toThrow("mock error")
  expect(container.textContent).toMatch(/Invalid handle or password/)
})
})
 