import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import axios from "axios";

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

axios.post = jest.fn()

describe('SignupForm', () => {
  it('submits the correct info to the api', async () => {
    const { container, getByText, getByTestId } = render(
      <UserContext.Provider value={mockContext}>
        <SignupForm />
      </UserContext.Provider>
      );
    fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
    fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
    fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
    fireEvent.click(getByText('Submit'))
    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND_URL}/users`, {"user": {"handle":"test handle", "password":"test password"}})
 })
 it('does not call API and displays a flash notice if password and confirmation do not match', () => {
  const { container, getByText, getByTestId } = render(
    <UserContext.Provider value={mockContext}>
      <SignupForm />
    </UserContext.Provider>
    );
  fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
  fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
  fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'different password' } } )
  fireEvent.click(getByText('Submit'))
  expect(axios.post).not.toHaveBeenCalled()
  expect(container.textContent).toMatch(/Password and confirmation do not match/)
})
it('displays a flash notice if API returns server-side error', () => {
  axios.post = jest.fn().mockImplementation(() => {
    throw new Error('mock error');
  })
  const { container, getByText, getByTestId } = render(
    <UserContext.Provider value={mockContext}>
      <SignupForm />
    </UserContext.Provider>
    );
  fireEvent.change(getByTestId("sign-up-handle-input"), {target: {value: 'test handle' } } )
  fireEvent.change(getByTestId("sign-up-password-input"), {target: {value: 'test password' } } )
  fireEvent.change(getByTestId("sign-up-password-confirmation-input"), {target: {value: 'test password' } } )
  fireEvent.click(getByText('Submit'))
  expect(axios.post).toThrow("mock error")
  expect(container.textContent).toMatch(/Invalid handle or password/)
})
})
 