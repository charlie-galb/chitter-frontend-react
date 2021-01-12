import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext.js';

const LoginForm = () => {
 
    const { storeUserHandleInContext, storeUserPasswordInContext, storeUserIdInContext, storeCurrentSessionKeyInContext } = useContext(UserContext)
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");

    const handleHandleChange = (event) => {
        const { value } = event.target; 
        setHandle(value);
      }

    const handlePasswordChange = (event) => {
        const { value } = event.target; 
        setPassword(value);
      }

    const handleSubmit = async (event) => {
        console.log("inside handleSubmit")
        console.log(handle)
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://chitter-backend-api-v2.herokuapp.com/sessions", {session: {handle: handle, password: password }}
            );
            if (response.data) {
                console.log("Success!")
                storeUserHandleInContext(handle)
                storeUserPasswordInContext(password)
                storeUserIdInContext(response.data.id)
                storeCurrentSessionKeyInContext(response.data.session_key)
                console.log(response.data)
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }
    return (
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
    )
}

export default LoginForm;