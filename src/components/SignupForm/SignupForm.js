import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          handle: "",
          password: "",
          password_confirmation: ""
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    render() {
        return (
            <Form>
                <Form.Group controlId="sign-up-handle">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" />
                </Form.Group>

                <Form.Group controlId="sign-up-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="sign-up-password-confirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
