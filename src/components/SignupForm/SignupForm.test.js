import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import axios from "axios";

import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import SignupForm from './SignupForm.js';
import { UserContext } from '../../contexts/UserContext.js';

afterAll(() => {
  jest.resetAllMocks()
})

const mockContext = {
  storeUserHandleInContext: jest.fn(),
  storeUserIdInContext: jest.fn(),
  storeCurrentSessionKeyInContext: jest.fn()
}

const ui = <UserContext.Provider value={mockContext}>
            <SignupForm />
          </UserContext.Provider>

axios.post = jest.fn().mockReturnValue({data: {id: 1}})

describe('SignupForm', () => {
  it('submits the correct info to the api and redirects to home', async () => {
    const { getByTestId, getByText, history } = renderWithRouter(ui, '/sign_up')
    fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
    fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
    await act(async () => {
      const button = getByText('Submit')
      fireEvent.click(button)
    });
    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/users`, {"user": {"handle":"test handle", "password":"test password"}})
    expect(history.location.pathname).toEqual('/')
    
 })
 it('does not call API and displays a flash notice if password and confirmation do not match', () => {
  const { getByTestId, getByText, container, history } = renderWithRouter(ui, '/sign_up')
  fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
  fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
  fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'different password' } } )
  fireEvent.click(getByText('Submit'))
  expect(axios.post).not.toHaveBeenCalled()
  expect(container.textContent).toMatch(/Password and confirmation do not match/)
  expect(history.location.pathname).toEqual('/sign_up')
})
it('displays a flash notice if API returns server-side error', () => {
  axios.post = jest.fn().mockImplementation(() => {
    throw new Error('mock error');
  })
  const { getByTestId, getByText, container, history } = renderWithRouter(ui, '/sign_up')
  fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
  fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
  fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
  fireEvent.click(getByText('Submit'))
  expect(axios.post).toThrow("mock error")
  expect(container.textContent).toMatch(/Handle already taken/)
  expect(history.location.pathname).toEqual('/sign_up')
})
})
 