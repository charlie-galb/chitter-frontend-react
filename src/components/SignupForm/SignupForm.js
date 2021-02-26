import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

const SignupForm = () => {
 
    const { storeUserHandleInContext, storeUserIdInContext, storeCurrentSessionKeyInContext } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleHandleChange = (event) => {
        const { value } = event.target; 
        setHandle(value);
      }

    const handlePasswordChange = (event) => {
        const { value } = event.target; 
        setPassword(value);
      }

    const handlePasswordConfirmationChange = (event) => {
        const { value } = event.target; 
        setPasswordConfirmation(value);
      }

    const sendLoginData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL_DEV}/sessions`, {session: {handle: handle, password: password }}
            );
            if (response.data) {
                setRedirect('/timeline')
                storeCurrentSessionKeyInContext(response.data.session_key)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(process.env.REACT_APP_BACKEND_URL_DEV)
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL_DEV}/users`, {user: {handle: handle, password: password }}
            );
            if (response.data.handle === handle) {
                sendLoginData()
                storeUserHandleInContext(handle)
                storeUserIdInContext(response.data.id)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <Form>
            <Form.Group controlId="sign-up-handle">
                <Form.Label>Handle</Form.Label>
                <Form.Control type="text" placeholder="Enter handle" data-testid="sign-up-handle-input" name="handle"value={handle} onChange={handleHandleChange} required/>
            </Form.Group>

            <Form.Group controlId="sign-up-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" data-testid="sign-up-password-input" name="password" value={password} onChange={handlePasswordChange} required/>
            </Form.Group>
            <Form.Group controlId="sign-up-password-confirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" data-testid="sign-up-password-confirmation-input" name="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
}

export default SignupForm;