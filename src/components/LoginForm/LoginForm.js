import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import FlashMessage from '../FlashMessage/FlashMessage.js';
import { UserContext } from '../../contexts/UserContext.js';

const LoginForm = () => {
 
    const { storeUserHandleInContext, storeUserIdInContext, storeCurrentSessionKeyInContext } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const [flashText, setFlashText] = useState("");

    const handleHandleChange = (event) => {
        const { value } = event.target; 
        setHandle(value);
      }

    const handlePasswordChange = (event) => {
        const { value } = event.target; 
        setPassword(value);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/sessions`, {session: {handle: handle, password: password }}
            );
            if (response.data) {
                storeUserHandleInContext(handle)
                storeUserIdInContext(response.data.user_id)
                storeCurrentSessionKeyInContext(response.data.token)
                setRedirect("/timeline")
            }
        } catch (error) {
            setFlashText("Invalid handle or password")
            console.error("Error:", error)
        }
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div>
            <Form>
                <Form.Group controlId="log-in-handle">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" data-testid="log-in-handle-input" name="handle"value={handle} onChange={handleHandleChange} required/>
                </Form.Group>

                <Form.Group controlId="log-in-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" data-testid="log-in-password-input" name="password" value={password} onChange={handlePasswordChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <FlashMessage message={flashText} />
        </div>
    )
}

export default LoginForm;