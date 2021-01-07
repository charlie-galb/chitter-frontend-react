import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup} from '@testing-library/react';
import SignupForm from './SignupForm.js';

afterEach(cleanup)

//testing a controlled component form.
it('Inputing text updates the state', () => {
    const { getByText, getByLabelText } = render(<SignupForm />);

    expect(getByLabelText("Handle").value).toBe("")

    fireEvent.change(getByLabelText("Handle"), {target: {value: 'Testing' } } )

    expect(getByLabelText("Handle").value).toBe("Testing")
 })