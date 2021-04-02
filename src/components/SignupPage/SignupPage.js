import React from 'react'
import {Link} from 'react-router-dom';

import SignupForm from '../SignupForm/SignupForm.js';
import styles from './SignupPage.module.css'

const SignupPage = () => {
    return (
        <div className={styles.background} >
            <div className={styles.container}>
                <h1 data-testid="SignupPage-h1">Sign up for Chitter</h1>
                <SignupForm />
                <Link data-testid="log-in-link" to='/'>Return to log in page</Link>
            </div>
        </div>
    )
}

export default SignupPage