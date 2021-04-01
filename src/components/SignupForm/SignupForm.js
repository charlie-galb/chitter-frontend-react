import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.js';
import FlashMessage from '../FlashMessage/FlashMessage.js';
import styles from './SignupForm.module.css';

const SignupForm = () => {
 
    const { storeUserHandleInContext, storeUserIdInContext } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [flashText, setFlashText] = useState("");

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setFlashText("Password and confirmation do not match")
            return
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/users`, {user: {handle: handle, password: password }}
            );
            setRedirect('/')
            storeUserHandleInContext(handle)
            storeUserIdInContext(response.data.id)
        } catch (error) {
            setFlashText("Handle already taken")
            console.error("Error:", error)
        }
    }
    
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div className={styles.container} >
            <Form>
                <Form.Group controlId="sign-up-handle">
                    <Form.Control type="text" placeholder="Enter handle" className='textInput' data-testid="sign-up-handle-input" name="handle"value={handle} onChange={handleHandleChange} required/>
                </Form.Group>

                <Form.Group controlId="sign-up-password">
                    <Form.Control type="password" placeholder="Enter password" className='textInput' data-testid="sign-up-password-input" name="password" value={password} onChange={handlePasswordChange} required/>
                </Form.Group>
                <Form.Group controlId="sign-up-password-confirmation">
                    <Form.Control type="password" placeholder="Confirm password" className='textInput' data-testid="sign-up-password-confirmation-input" name="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required/>
                </Form.Group>
                <Button variant="primary" className='formButton' type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <FlashMessage message={flashText} />
        </div>
    )
}

export default SignupForm;