import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          handle: "",
          password: "",
          passwordConfirmation: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        const { name, value } = event.target; 
        this.setState({ [name]: value });
      }

    async handleSubmit(event) {
        event.preventDefault();
        const { handle, password, passwordConfirmation } = this.state;
        try {
            const response = await axios.post(
                "https://chitter-backend-api-v2.herokuapp.com/users", {user: {handle: handle, password: password }}
            );
            console.log(response)
        } catch (error) {
            console.log("Error:", error)
        }
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="sign-up-handle">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" data-testid="sign-up-handle-input" name="handle"value={this.state.handle} onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group controlId="sign-up-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" data-testid="sign-up-password-input" name="password" value={this.state.password} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="sign-up-password-confirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" data-testid="sign-up-password-confirmation-input" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Form>
        )
    }
}
