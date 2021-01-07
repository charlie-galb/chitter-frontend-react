import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm.js';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1 data-testid="home-h1">Welcome to Chitter!</h1>
                <h2 data-testid="home-h2">Please log in below</h2>
                <LoginForm />
                <p>Don't have an account?</p>
                <Link data-testid="sign-up-link" to='/sign_up'>Sign up here</Link>
            </div>
        )
    }
}
